'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './AbstractUploadForm.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  institution: string;
  position: string;
  location: string;
  labSupervisor: string;
  authors: string; // comma-separated
  affiliations: string; // comma-separated
  description: string;
  presentation: 'digital' | 'oral';
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
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    institution: '',
    position: '',
    location: '',
    labSupervisor: '',
    authors: '',
    affiliations: '',
    description: '',
    presentation: 'digital',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackgroundFile, setSelectedBackgroundFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
    error: null,
    success: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.title) {
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
        let errorMessage = 'Failed to upload file';
        const contentType = uploadResponse.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await uploadResponse.json();
          errorMessage = errorData?.error || JSON.stringify(errorData) || errorMessage;
        } else {
          const text = await uploadResponse.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
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
          let errorMessage = 'Failed to upload background image';
          const contentType = bgUploadResponse.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errorData = await bgUploadResponse.json();
            errorMessage = errorData?.error || JSON.stringify(errorData) || errorMessage;
          } else {
            const text = await bgUploadResponse.text();
            errorMessage = text || errorMessage;
          }
          throw new Error(errorMessage);
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
              firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          institution: formData.institution,
          position: formData.position,
          location: formData.location,
          title: formData.title,
          labSupervisor: formData.labSupervisor,
          authors: formData.authors.split(',').map((a) => a.trim()),
          affiliations: formData.affiliations.split(',').map((a) => a.trim()),
          description: formData.description,
          presentation: formData.presentation,
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
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        institution: '',
        position: '',
        location: '',
        labSupervisor: '',
        authors: '',
        affiliations: '',
        description: '',
        presentation: 'digital',
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
          {/* First Name */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your first name"
              required
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your last name"
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

          {/* Institution */}
          <div className={styles.formGroup}>
            <label htmlFor="institution" className={styles.label}>
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your institution"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Position */}
          <div className={styles.formGroup}>
            <label htmlFor="position" className={styles.label}>
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your position/title"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Location */}
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your location"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Lab Supervisor */}
          <div className={styles.formGroup}>
            <label htmlFor="labSupervisor" className={styles.label}>
              Lab Supervisor
            </label>
            <input
              type="text"
              id="labSupervisor"
              name="labSupervisor"
              value={formData.labSupervisor}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Name of lab supervisor"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Authors */}
          <div className={styles.formGroup}>
            <label htmlFor="authors" className={styles.label}>
              Authors (comma-separated)
            </label>
            <input
              type="text"
              id="authors"
              name="authors"
              value={formData.authors}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="e.g. Jane Doe, John Smith"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Affiliations */}
          <div className={styles.formGroup}>
            <label htmlFor="affiliations" className={styles.label}>
              Affiliations (comma-separated)
            </label>
            <input
              type="text"
              id="affiliations"
              name="affiliations"
              value={formData.affiliations}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="e.g. University A, Institute B"
              disabled={uploadState.isUploading}
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleTextAreaChange}
              className={styles.input}
              placeholder="A brief description of your work"
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
              Digital slide deck/poster (PDF)<span className={styles.required}>*</span>
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
