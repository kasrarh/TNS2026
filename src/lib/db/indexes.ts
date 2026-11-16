import type { Db } from "mongodb";
import { COLLECTIONS } from "./schema";

const PROFILE_COLLECTIONS = [
  COLLECTIONS.speakerProfiles,
  COLLECTIONS.teamProfiles,
  COLLECTIONS.attendeeProfiles,
] as const;

/**
 * Creates the multi-role dashboard indexes.
 * Safe to run more than once.
 *
 * sessions.expiresAt uses expireAfterSeconds: 0 so MongoDB deletes a
 * session when its expiresAt date is reached.
 */
export async function ensureIndexes(db: Db): Promise<void> {
  await db.collection(COLLECTIONS.users).createIndexes([
    {
      key: { email: 1 },
      unique: true,
      name: "users_email_unique",
    },
    {
      key: { role: 1, status: 1 },
      name: "users_role_status",
    },
  ]);

  for (const name of PROFILE_COLLECTIONS) {
    await db.collection(name).createIndex(
      { userId: 1 },
      { unique: true, name: `${name}_userId_unique` }
    );
  }

  await db.collection(COLLECTIONS.sessions).createIndexes([
    {
      key: { tokenHash: 1 },
      unique: true,
      name: "sessions_tokenHash_unique",
    },
    {
      key: { expiresAt: 1 },
      expireAfterSeconds: 0,
      name: "sessions_expiresAt_ttl",
    },
  ]);
}
