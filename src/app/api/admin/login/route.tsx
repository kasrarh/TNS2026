import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { verifyPassword } from '@/lib/auth/password';
import { COLLECTIONS, DB_NAME } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const envMatch = username === adminUsername && password === adminPassword;

  let dbMatch = false;
  if (!envMatch) {
    const client = await clientPromise;
    const users = client.db(DB_NAME).collection(COLLECTIONS.users);
    const login = username.trim().toLowerCase();
    const user = await users.findOne({
      email: login,
      role: 'admin',
      status: 'active',
    });

    if (user?.passwordHash && verifyPassword(password, String(user.passwordHash))) {
      dbMatch = true;
      const now = new Date();
      await users.updateOne(
        { _id: user._id },
        { $set: { lastLoginAt: now, updatedAt: now } },
      );
    }
  }

  if (envMatch || dbMatch) {
    const cookieStore = await cookies();
    cookieStore.set('admin-session', 'true', {
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}