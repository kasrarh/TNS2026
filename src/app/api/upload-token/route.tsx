import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // token request is small
    },
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

function sanitizeKey(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fileName = body?.fileName;
    const contentType = body?.contentType;

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName and contentType are required' },
        { status: 400 }
      );
    }

    const safeName = sanitizeKey(fileName);
    const key = `abstracts/${Date.now()}-${safeName}`;

    const presignedPost = await createPresignedPost(s3, {
      Bucket: process.env.AWS_BUCKET_NAME ?? '',
      Key: key,
      Conditions: [
        ['content-length-range', 0, 50 * 1024 * 1024],
        ['starts-with', '$Content-Type', ''],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 3600,
    });

    const objectUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      success: true,
      presignedUrl: presignedPost.url,
      fields: presignedPost.fields,
      objectUrl,
      key,
    });
  } catch (error: unknown) {
    console.error('Error creating S3 presigned post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create upload token', details: errorMessage },
      { status: 500 }
    );
  }
}
