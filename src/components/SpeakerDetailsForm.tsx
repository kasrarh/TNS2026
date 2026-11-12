"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import {
  countWords,
  getSpeakerFormCompletion,
  isAllowedSpeakerPhoto,
  type YesNo,
} from "@/lib/speakerForm";
import styles from "./SpeakerDetailsForm.module.css";

const LUMA_URL = "https://luma.com/tns2027?coupon=INVITED-SPEAKER";

interface FormState {
  fullName: string;
  position: string;
  affiliation: string;
  email: string;
  mobile: string;
  pronunciation: string;
  bio: string;
  accessibilityNeeds: string;
  socialLinks: string;
  otherNotes: string;
  dietaryRequirements: string;
  attendVertexDinner: YesNo;
  guestSharingRoom: YesNo;
  additionalNightApril29: YesNo;
}

const initialForm: FormState = {
  fullName: "",
  position: "",
  affiliation: "",
  email: "",
  mobile: "",
  pronunciation: "",
  bio: "",
  accessibilityNeeds: "",
  socialLinks: "",
  otherNotes: "",
  dietaryRequirements: "",
  attendVertexDinner: "",
  guestSharingRoom: "",
  additionalNightApril29: "",
};

export default function SpeakerDetailsForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const wordCount = useMemo(() => countWords(form.bio), [form.bio]);

  const completion = useMemo(
    () => getSpeakerFormCompletion(form, Boolean(photoFile)),
    [form, photoFile]
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value as never);
  }

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const photoCheck = isAllowedSpeakerPhoto(file);
    if (!photoCheck.ok) {
      setError(photoCheck.error);
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }

    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError(null);
  }

  async function uploadPhoto(file: File) {
    const tokenResponse = await fetch("/api/upload-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        folder: "speakers",
      }),
    });

    if (!tokenResponse.ok) {
      const data = await tokenResponse.json().catch(() => null);
      throw new Error(data?.error || "Failed to get photo upload token.");
    }

    const tokenPayload = await tokenResponse.json();
    const { presignedUrl, fields, objectUrl, key } = tokenPayload;
    if (!presignedUrl || !fields || !objectUrl) {
      throw new Error("Invalid photo upload token response.");
    }

    const s3Data = new FormData();
    Object.entries(fields).forEach(([fieldKey, value]) => {
      s3Data.append(fieldKey, value as string);
    });
    s3Data.append("file", file);

    const s3UploadResponse = await fetch(presignedUrl, {
      method: "POST",
      body: s3Data,
    });

    if (!s3UploadResponse.ok) {
      throw new Error("Failed to upload photo to S3.");
    }

    return { objectUrl: objectUrl as string, key: (key as string) || null };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!completion.allComplete) {
      setError("Please complete every required section before submitting.");
      return;
    }

    if (!photoFile) {
      setError("Please upload your professional headshot.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploaded = await uploadPhoto(photoFile);

      const response = await fetch("/api/speakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoUrl: uploaded.objectUrl,
          photoKey: uploaded.key,
          attendVertexDinner: form.attendVertexDinner === "yes",
          guestSharingRoom: form.guestSharingRoom === "yes",
          additionalNightApril29: form.additionalNightApril29 === "yes",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit speaker details.");
      }

      setSuccess(
        "Thank you. Your speaker details and photo were submitted successfully."
      );
      setForm(initialForm);
      setPhotoFile(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusItems = [
    {
      key: "detailsComplete",
      label: "Speaker details are complete",
      done: completion.detailsComplete,
    },
    {
      key: "bioChecked",
      label: "Bio has been entered",
      done: completion.bioChecked,
    },
    {
      key: "photoAttached",
      label: "Photo uploaded",
      done: completion.photoAttached,
    },
    {
      key: "dietaryAndDinner",
      label: "Dietary needs and dinner RSVP answered",
      done: completion.dietaryAndDinner,
    },
    {
      key: "hotelAnswered",
      label: "Hotel questions answered (room sharing / additional night)",
      done: completion.hotelAnswered,
    },
  ] as const;

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <p className={styles.kicker}>TNS2027 Speakers</p>
          <h1>Speaker Details & Logistics Form</h1>
          <p>
            Please complete the five sections below so we can build your speaker
            profile for True North Spatial 2027 (TNS2027), taking place April 27
            to 29, 2027 at the MaRS Discovery District in Toronto.
          </p>
        </div>

        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>1. Speaker details</h2>
                <p>
                  These details appear on the program and the website, so please
                  write them as you want them shown.
                </p>
              </div>

              <div className={styles.grid2}>
                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>
                    Full name and title (for example, Dr.)
                    <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Position<span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    name="position"
                    value={form.position}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Affiliation (institution or company)
                    <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    name="affiliation"
                    value={form.affiliation}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Email address<span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Mobile number (for contact during the summit)
                    <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    name="mobile"
                    value={form.mobile}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>

                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>
                    Name pronunciation (phonetic, for your introduction on stage)
                    <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    name="pronunciation"
                    value={form.pronunciation}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>2. Luma registration</h2>
                <p>
                  Every speaker registers on Luma so the team has an accurate
                  attendee list. Registration and accommodation are covered by
                  Panoramics.
                </p>
              </div>

              <div className={styles.lumaBox}>
                <p>
                  Use the invited-speaker registration link to complete your Luma
                  registration.
                </p>
                <a
                  className={styles.lumaButton}
                  href={LUMA_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Register on Luma
                </a>
              </div>
              <p className={styles.travelNote}>
                Please disregard the ticket price and the non-refundable notice
                when reviewing the Terms and Conditions.
              </p>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>3. Speaker bio</h2>
                <p>
                  Write your bio in the third person, in a single paragraph.
                  Cover your current role, your research focus, and one or two
                  highlights that matter to this audience. Aim for about 100 to
                  150 words.
                </p>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>
                  Bio<span className={styles.required}>*</span>
                </span>
                <textarea
                  className={styles.textarea}
                  name="bio"
                  value={form.bio}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
                <span className={styles.wordCount}>Word count: {wordCount}</span>
              </label>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>4. Photo</h2>
                <p>
                  Upload one professional headshot. A clear, recent photo helps
                  the audience recognize you.
                </p>
              </div>

              <div className={styles.photoBox}>
                <ul className={styles.photoRules}>
                  <li>Format: JPG or PNG</li>
                  <li>
                    Recommended size: at least 1000 × 1000 pixels; square crop
                    works best
                  </li>
                  <li>
                    Framing: head and shoulders, plain or uncluttered background
                  </li>
                  <li>Name the file Firstname_Lastname_TNS2027</li>
                  <li>Maximum file size: 50MB</li>
                  <li>
                    By uploading it you confirm we may use it on the program,
                    website and social media
                  </li>
                </ul>

                <div className={styles.fileRow}>
                  <label className={styles.fileButton}>
                    Choose photo
                    <input
                      ref={fileInputRef}
                      className={styles.fileInput}
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handlePhotoChange}
                      disabled={isSubmitting}
                    />
                  </label>
                  <span className={styles.fileName}>
                    {photoFile ? photoFile.name : "No file selected"}
                  </span>
                </div>

                {photoPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Selected speaker headshot preview"
                    className={styles.preview}
                  />
                )}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>5. Other details</h2>
                <p>Logistics details that help us host you well during the summit.</p>
              </div>

              <div className={styles.grid2}>
                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>Accessibility needs</span>
                  <textarea
                    className={styles.textarea}
                    name="accessibilityNeeds"
                    value={form.accessibilityNeeds}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </label>

                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>
                    LinkedIn, X or website, if you want it shown
                  </span>
                  <input
                    className={styles.input}
                    name="socialLinks"
                    value={form.socialLinks}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </label>

                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>Anything else we should know</span>
                  <textarea
                    className={styles.textarea}
                    name="otherNotes"
                    value={form.otherNotes}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </label>

                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span className={styles.label}>
                    Dietary requirements or allergies
                    <span className={styles.required}>*</span>
                  </span>
                  <textarea
                    className={styles.textarea}
                    name="dietaryRequirements"
                    value={form.dietaryRequirements}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              <fieldset className={styles.field}>
                <legend className={styles.label}>
                  Will you attend the Vertex Dinner?
                  <span className={styles.required}>*</span>
                </legend>
                <div className={styles.radioGroup}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="attendVertexDinner"
                      value="yes"
                      checked={form.attendVertexDinner === "yes"}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                    Yes
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="attendVertexDinner"
                      value="no"
                      checked={form.attendVertexDinner === "no"}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <fieldset className={styles.field}>
                <legend className={styles.label}>
                  Will a partner or guest be sharing your hotel room?
                  <span className={styles.required}>*</span>
                </legend>
                <div className={styles.radioGroup}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="guestSharingRoom"
                      value="yes"
                      checked={form.guestSharingRoom === "yes"}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                    Yes
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="guestSharingRoom"
                      value="no"
                      checked={form.guestSharingRoom === "no"}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <fieldset className={styles.field}>
                <legend className={styles.label}>
                  Do you require an additional night on 29 April? (At your own
                  expense, subject to availability)
                  <span className={styles.required}>*</span>
                </legend>
                <div className={styles.radioGroup}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="additionalNightApril29"
                      value="yes"
                      checked={form.additionalNightApril29 === "yes"}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                    Yes
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="additionalNightApril29"
                      value="no"
                      checked={form.additionalNightApril29 === "no"}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <p className={styles.travelNote}>
                Travel: Please remember to arrange your own travel plans, within
                the regional allowance in your Speaker Information Pack.
              </p>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Before you submit</h2>
                <p>
                  This checklist updates automatically as you complete each part
                  of the form.
                </p>
              </div>

              <div className={styles.checklist}>
                {statusItems.map((item) => (
                  <div
                    key={item.key}
                    className={`${styles.statusItem} ${
                      item.done ? styles.statusDone : styles.statusMissing
                    }`}
                  >
                    <span className={styles.statusMark} aria-hidden="true">
                      {item.done ? "✓" : "✕"}
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.actions}>
              {error && (
                <p className={`${styles.message} ${styles.messageError}`} role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p
                  className={`${styles.message} ${styles.messageSuccess}`}
                  role="status"
                >
                  {success}
                </p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting || !completion.allComplete}
              >
                {isSubmitting ? "Submitting..." : "Submit speaker details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
