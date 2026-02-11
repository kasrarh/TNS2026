# Abstract Upload Feature - Setup Guide

This document outlines how to set up the abstract upload feature for your conference application.

## Overview

The abstract upload feature allows students to:
1. Upload PDF abstracts directly from their browser
2. Store files in Vercel Blob (bypassing Next.js 4.5MB request limit)
3. Save their metadata in MongoDB

The flow is:
- Client uploads PDF to Vercel Blob → Gets permanent URL
- Client sends metadata + blob URL to API
- API saves metadata to MongoDB
- Confirmation sent to student

## Prerequisites

- Vercel account (for Blob storage)
- MongoDB instance (local or cloud)
- Node.js and npm installed

## Setup Steps

### 1. **MongoDB Setup**

Ensure you have MongoDB running and have the connection URI ready.

Add to `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/conference?retryWrites=true&w=majority
```

Or for local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/conference
```

### 2. **Vercel Blob Setup**

Vercel Blob is the recommended storage for this feature. It automatically scales and provides permanent URLs.

#### Option A: Using Vercel (Recommended)
If your project is deployed on Vercel:

1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Navigate to **Settings** → **Storage**
4. Click **Create** and select **Vercel Blob**
5. Accept the setup and Vercel will automatically add `BLOB_READ_WRITE_TOKEN` to your environment

#### Option B: Manual Setup
If you're not on Vercel or need manual setup:

1. Create a `.env.local` file in your project root
2. Add your Vercel Blob token:
```
BLOB_READ_WRITE_TOKEN=your_token_here
```

To generate a token:
1. Visit https://blob.vercel.sh
2. Or use Vercel CLI: `vercel env pull` (pulls all environment variables)

### 3. **Install Dependencies**

The necessary dependencies have already been installed:
- `@vercel/blob` - For file storage
- `mongodb` - For database operations

If needed, reinstall:
```bash
npm install @vercel/blob mongodb
```

### 4. **Database Schema**

The abstracts are stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId,
  studentName: string,      // Required
  email: string,              // Required
  title: string,              // Required
  abstractBlobUrl: string,    // Required - URL from Vercel Blob
  department: string,         // Optional
  university: string,         // Optional
  phone: string,              // Optional
  submittedAt: Date,          // Auto-generated
  status: string,             // 'pending', 'approved', or 'rejected'
}
```

### 5. **API Routes**

#### Upload Token Endpoint
- **Path**: `/api/upload-token`
- **Method**: POST
- **Purpose**: Generates a client token for Vercel Blob upload
- **Request**:
  ```json
  {
    "filename": "my-abstract.pdf",
    "contentType": "application/pdf"
  }
  ```
- **Response**:
  ```json
  {
    "clientToken": "token_string"
  }
  ```

#### Abstracts Endpoint
- **Path**: `/api/abstracts`
- **Methods**:
  - **POST**: Save abstract metadata
    - **Request**:
      ```json
      {
        "studentName": "John Doe",
        "email": "john@example.com",
        "title": "My Research Title",
        "abstractBlobUrl": "https://blob.vercel.sh/...",
        "department": "Computer Science",
        "university": "MIT",
        "phone": "+1 (555) 123-4567"
      }
      ```
    - **Response**:
      ```json
      {
        "success": true,
        "message": "Abstract submitted successfully",
        "abstractId": "507f1f77bcf86cd799439011"
      }
      ```
  
  - **GET**: Retrieve abstracts (optional filtering)
    - **Query Parameters**:
      - `status` - Filter by status (pending, approved, rejected)
    - **Response**:
      ```json
      {
        "success": true,
        "count": 5,
        "abstracts": [...]
      }
      ```

### 6. **Component Usage**

The `AbstractUploadForm` component is ready to use:

```tsx
import AbstractUploadForm from '@/components/AbstractUploadForm';

export default function SubmitPage() {
  return <AbstractUploadForm />;
}
```

Or use the dedicated page at `/submit-abstract`.

### 7. **Testing the Feature**

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/submit-abstract`

3. Fill in the form and upload a test PDF

4. Check MongoDB to verify the metadata was saved

### 8. **File Size Limits**

- **Frontend validation**: Max 50MB
- **Backend validation**: Enforced by Vercel Blob
- **Database**: No limit for URLs (stored as strings)

### 9. **Security Considerations**

1. **File Type Validation**: Only PDFs are accepted
2. **CORS**: Vercel Blob handles CORS automatically
3. **Authentication**: Current setup is open. To restrict uploads:
   - Add authentication middleware to API routes
   - Example with NextAuth.js (optional):
     ```tsx
     import { auth } from '@/auth';
     
     export async function POST(request) {
       const session = await auth();
       if (!session) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       // ... rest of code
     }
     ```

4. **Content Validation**: Validate file headers to prevent malicious uploads
   ```tsx
   // Add to `/api/upload-token`
   const isPDF = (file) => {
     return file.type === 'application/pdf' && 
            file.name.endsWith('.pdf');
   };
   ```

### 10. **Error Handling**

The form handles these error cases:
- Missing required fields
- Invalid file type (non-PDF)
- File too large
- Network errors during upload
- Database save failures

All errors are displayed to the user with clear messages.

### 11. **Troubleshooting**

**Issue**: "Failed to get upload token"
- Check that `BLOB_READ_WRITE_TOKEN` is set in `.env.local`
- Verify Vercel Blob is configured in your project

**Issue**: "Failed to save abstract metadata"
- Check that `MONGODB_URI` is valid
- Verify MongoDB is running and accessible
- Check network connectivity

**Issue**: CORS errors on upload
- Vercel Blob automatically handles CORS
- If using custom storage, ensure CORS headers are set

**Issue**: Files disappear after upload
- Verify the blob URL is saved correctly in MongoDB
- Check Vercel Blob storage quota

### 12. **Future Enhancements**

Consider adding:
- Email notifications on submission
- Admin dashboard to review abstracts
- Payment integration for ticket purchases
- Automated status notifications
- Abstract revision uploads
- Bulk export to CSV

## Files Created

- `/src/app/api/abstracts/route.tsx` - API for saving/fetching abstracts
- `/src/app/api/upload-token/route.tsx` - API for generating upload tokens
- `/src/components/AbstractUploadForm.tsx` - React form component
- `/src/components/AbstractUploadForm.module.css` - Component styling
- `/src/app/submit-abstract/page.tsx` - Dedicated page for submissions

## Need Help?

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
