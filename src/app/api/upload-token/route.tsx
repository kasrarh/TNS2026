import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Determine file type and apply appropriate validation
    const isPDF = file.type.includes('pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPDF && !isImage) {
      return NextResponse.json(
        { error: 'Only PDF and image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size based on type
    const maxSizePDF = 50 * 1024 * 1024; // 50MB for PDFs
    const maxSizeImage = 10 * 1024 * 1024; // 10MB for images
    const maxSize = isPDF ? maxSizePDF : maxSizeImage;

    if (file.size > maxSize) {
      const sizeLimit = isPDF ? '50MB' : '10MB';
      return NextResponse.json(
        { error: `File size must be less than ${sizeLimit}` },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob

    const blob = await put(file.name, file, {
      access: 'public',
       allowOverwrite: true,
       multipart: true,
    });

    return NextResponse.json(
      {
        success: true,
        url: blob.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
