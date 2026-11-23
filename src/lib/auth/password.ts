import { scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

/** Checks a password against a `scrypt$salt$hash` value stored on a user. */
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt" || !parts[1] || !parts[2]) {
    return false;
  }

  const [, salt, hash] = parts;
  const actual = scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(hash, "base64url");

  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}
