import type { ObjectId } from "mongodb";
import type { UserRole, UserStatus } from "./roles";

export const DB_NAME = "conference";

export const COLLECTIONS = {
  users: "users",
  speakerProfiles: "speaker_profiles",
  teamProfiles: "team_profiles",
  attendeeProfiles: "attendee_profiles",
  sessions: "sessions",
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
