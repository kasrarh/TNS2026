import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    // Set a simple session cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}