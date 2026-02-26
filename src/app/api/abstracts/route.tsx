import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      studentName,
      email,
      title,
      backgroundBlobUrl,
      abstractBlobUrl,
      department,
      university,
      phone,
    } = body;

    // Validate required fields
    if (!studentName || !email || !title || !abstractBlobUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: studentName, email, title, or abstractBlobUrl' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('conference');
    const collection = db.collection('abstracts');

    // Create abstract document
    const abstractDocument = {
      studentName,
      email,
      title,
      abstractBlobUrl,
      // optional background image url
      backgroundBlobUrl: backgroundBlobUrl || null,
      department: department || 'Not specified',
      university: university || 'Not specified',
      phone: phone || 'Not provided',
      submittedAt: new Date(),
      status: 'pending', // Can be pending, approved, rejected
      _id: new ObjectId(),
    };

    // Insert into database
    const result = await collection.insertOne(abstractDocument);

    return NextResponse.json(
      {
        success: true,
        message: 'Abstract submitted successfully',
        abstractId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving abstract:', error);
    return NextResponse.json(
      { error: 'Failed to save abstract metadata' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('conference');
    const collection = db.collection('abstracts');

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    const abstracts = await collection.find(query).toArray();

    return NextResponse.json(
      {
        success: true,
        count: abstracts.length,
        abstracts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching abstracts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch abstracts' },
      { status: 500 }
    );
  }
}
