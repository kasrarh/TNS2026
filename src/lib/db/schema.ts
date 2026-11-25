import type { ObjectId } from "mongodb";
import type { UserRole, UserStatus } from "./roles";

export const DB_NAME = "conference";

export const COLLECTIONS = {
  users: "users",
  speakerProfiles: "speaker_profiles",
  teamProfiles: "team_profiles",
  attendeeProfiles: "attendee_profiles",
  sessions: "sessions",
  /** TNS2027 abstracts (Emerging + Early Career). The legacy "abstracts" collection holds TNS2026. */
  abstractSubmissions2027: "abstract_submissions_2027",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/** Login identity shared by every dashboard role. */
export interface UserDocument {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  fullName: string;
  /** Account avatar. Null until the user uploads one. */
  photoUrl: string | null;
  photoKey: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

export interface SpeakerProfileDocument {
  _id?: ObjectId;
  userId: ObjectId;
  /** Optional link to an existing speaker_submissions document. */
  submissionId: ObjectId | null;
  mobile: string;
  pronunciation: string;
  needsHotelRoom: boolean;
}

export interface TeamProfileDocument {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  department: string;
}

export interface AttendeeProfileDocument {
  _id?: ObjectId;
  userId: ObjectId;
  /** Optional link to an existing tns2027_signups document. */
  signupId: ObjectId | null;
  ticketType: string;
}

export interface SessionDocument {
  _id?: ObjectId;
  userId: ObjectId;
  tokenHash: string;
  expiresAt: Date;
}

export type AbstractSubmissionStatus =
  | "pending"
  | "accepted"
  | "waitlisted"
  | "rejected";

/**
 * One TNS2027 abstract submission. `program` separates the Emerging
 * Scientists and Early Career Scientists calls; program-specific details
 * live under `studies` and `safeguarding`.
 */
export interface AbstractSubmission2027Document {
  _id?: ObjectId;
  program: "emerging" | "early-career";
  /** e.g. "es-scholars-graduate", "ecs-early-career-investigator". */
  category: string;

  applicant: {
    firstName: string;
    lastName: string;
    preferredName: string;
    pronouns: string;
    /** Stored lowercase. */
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string | null;
  };

  /** Emerging Scientists only; null for Early Career. */
  studies: {
    programAndYear: string | null;
    universityAndDepartment: string | null;
    schoolAndGrade: string | null;
    supervisorName: string;
    supervisorEmail: string;
  } | null;

  /** Early Career Scientists only; null for Emerging. */
  role: {
    jobTitle: string;
    organizationAndDepartment: string;
    sector: string;
    sectorOther: string | null;
    highestDegree: string;
    researchStartYear: number;
    firstAppointmentYear: number | null;
    careerBreaks: string;
    /** "What are you looking for at TNS2027?" — used to place pitch tables. */
    lookingFor: string[];
    lookingForOther: string | null;
  } | null;

  /**
   * Early Career eligibility flags for reviewers. Outside a window is
   * flagged, never blocked, so career breaks can be reviewed. Null for Emerging.
   */
  eligibilityFlags: {
    researchYears: number | null;
    outsideResearchWindow: boolean;
    appointmentYears: number | null;
    outsideInvestigatorWindow: boolean;
    needsReview: boolean;
  } | null;

  /** ES Explorers only; null for everyone else. */
  safeguarding: {
    dateOfBirth: string;
    ageOnApril25_2027: number;
    isMinor: boolean;
    guardian: { name: string; email: string; phone: string } | null;
    emergencyContact: { name: string; relationship: string; phone: string };
    guardianConsentAcknowledged: boolean;
    /** Set by the team once the signed consent form comes back. */
    guardianConsentReceived: boolean;
  } | null;

  abstract: {
    title: string;
    authors: string;
    affiliations: string;
    scientificArea: string;
    scientificAreaOther: string | null;
    body: string;
    wordCount: number;
    keywords: string[];
  };

  declarations: Record<string, boolean>;

  status: AbstractSubmissionStatus;
  /** Internal notes from the review team. Never shown to applicants. */
  reviewerNotes?: string;
  /** Last time an admin changed status, notes or consent. */
  reviewedAt?: Date | null;
  submittedAt: Date;
  updatedAt: Date;
}

export const ABSTRACT_SUBMISSION_STATUSES: readonly AbstractSubmissionStatus[] = [
  "pending",
  "accepted",
  "waitlisted",
  "rejected",
];
