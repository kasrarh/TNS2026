'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './AbstractUploadForm.module.css';

interface FormData {
  studentName: string;
  email: string;
  title: string;
  department: string;
  university: string;
  phone: string;
}

interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  success: string | null;
}

export default function AbstractUploadForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    email: '',
    title: '',
    department: '',
    university: '',
    phone: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackgroundFile, setSelectedBackgroundFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
    error: null,
    success: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (uploadState.error) {
      setUploadState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.includes('pdf')) {
        setUploadState((prev) => ({
          ...prev,
          error: 'Only PDF files are allowed',
        }));
        setSelectedFile(null);
        return;
      }
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setUploadState((prev) => ({
          ...prev,
          error: 'File size must be less than 50MB',
        }));
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setUploadState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleBackgroundFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image type
      if (!file.type.startsWith('image/')) {
        setUploadState((prev) => ({
          ...prev,
          error: 'Only image files are allowed for background',
        }));
        setSelectedBackgroundFile(null);
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadState((prev) => ({
          ...prev,
          error: 'Background image must be less than 10MB',
        }));
        setSelectedBackgroundFile(null);
        return;
      }
      setSelectedBackgroundFile(file);
      setUploadState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.studentName || !formData.email || !formData.title) {
      setUploadState((prev) => ({
        ...prev,
        error: 'Please fill in all required fields',
      }));
      return;
    }

    if (!selectedFile) {
      setUploadState((prev) => ({
        ...prev,
        error: 'Please select a PDF file to upload',
      }));
      return;
    }

    try {
      setUploadState((prev) => ({
        ...prev,
        isUploading: true,
        uploadProgress: 0,
        error: null,
        success: null,
      }));

      // Step 1: Upload file to Vercel Blob via our API
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedFile);

      const uploadResponse = await fetch('/api/upload-token', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      const { url: abstractBlobUrl } = await uploadResponse.json();

      setUploadState((prev) => ({ ...prev, uploadProgress: 50 }));

      // If a background image was selected, upload it the same way
      let backgroundBlobUrl: string | null = null;
      if (selectedBackgroundFile) {
        const bgFormData = new FormData();
        bgFormData.append('file', selectedBackgroundFile);

        const bgUploadResponse = await fetch('/api/upload-token', {
          method: 'POST',
          body: bgFormData,
        });

        if (!bgUploadResponse.ok) {
          const errorData = await bgUploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload background image');
        }

        const bgJson = await bgUploadResponse.json();
        backgroundBlobUrl = bgJson.url;
      }

      setUploadState((prev) => ({ ...prev, uploadProgress: 100 }));

      // Step 2: Save metadata to database
      const saveResponse = await fetch('/api/abstracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          abstractBlobUrl,
          backgroundBlobUrl,
        }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || 'Failed to save abstract metadata');
      }

      // Success!
      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        uploadProgress: 0,
        success: 'Abstract uploaded successfully! We will review it and get back to you soon.',
      }));

      // Reset form
      setFormData({
        studentName: '',
        email: '',
        title: '',
        department: '',
        university: '',
        phone: '',
      });
      setSelectedFile(null);
      setSelectedBackgroundFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (bgFileInputRef.current) {
        bgFileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        error:
          error instanceof Error ? error.message : 'An error occurred during upload',
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Submit Your Abstract</h2>
        <p className={styles.subtitle}>
          Upload your abstract to our conference. We accept PDF files up to 50MB.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Student Name */}
          <div className={styles.formGroup}>
            <label htmlFor="studentName" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your full name"
              required
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="your.email@example.com"
              required
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Abstract Title */}
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Abstract Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your abstract title"
              required
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Department */}
          <div className={styles.formGroup}>
            <label htmlFor="department" className={styles.label}>
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your department"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* University */}
          <div className={styles.formGroup}>
            <label htmlFor="university" className={styles.label}>
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your university"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="+1 (555) 123-4567"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* File Upload */}
          {/* Background Image Upload */}
          <div className={styles.formGroup}>
            <label htmlFor="backgroundImage" className={styles.label}>
              Background Image (optional)
            </label>
            <div
              className={styles.fileInputWrapper}
              onClick={() => !uploadState.isUploading && bgFileInputRef.current?.click()}
            >
              <input
                type="file"
                id="backgroundImage"
                ref={bgFileInputRef}
                onChange={handleBackgroundFileChange}
                accept="image/*"
                className={styles.fileInput}
                disabled={uploadState.isUploading}
              />
              <span className={styles.fileName}>
                {selectedBackgroundFile ? selectedBackgroundFile.name : 'Click to select background image (optional)'}
              </span>
            </div>
            <p className={styles.fileHint}>
              Recommended max size: 10MB. Common formats: JPG, PNG.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="abstractFile" className={styles.label}>
              Abstract PDF <span className={styles.required}>*</span>
            </label>
            <div
              className={styles.fileInputWrapper}
              onClick={() => !uploadState.isUploading && fileInputRef.current?.click()}
            >
              <input
                type="file"
                id="abstractFile"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className={styles.fileInput}
                disabled={uploadState.isUploading}
                required
              />
              <span className={styles.fileName}>
                {selectedFile ? selectedFile.name : 'Click to select PDF file...'}
              </span>
            </div>
            <p className={styles.fileHint}>
              Maximum file size: 50MB. Only PDF files are accepted.
            </p>
          </div>

          {/* Error Message */}
          {uploadState.error && (
            <div className={styles.alert + ' ' + styles.alertError}>
              {uploadState.error}
            </div>
          )}

          {/* Success Message */}
          {uploadState.success && (
            <div className={styles.alert + ' ' + styles.alertSuccess}>
              {uploadState.success}
            </div>
          )}

          {/* Upload Progress */}
          {uploadState.isUploading && uploadState.uploadProgress > 0 && (
            <div className={styles.progressContainer}>
              <div className={styles.progressLabel}>
                Uploading... {uploadState.uploadProgress}%
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${uploadState.uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={uploadState.isUploading}
          >
            {uploadState.isUploading ? 'Uploading...' : 'Submit Abstract'}
          </button>
        </form>
      </div>
    </div>
  );
}
