export const USER_ROLES = ["admin", "speaker", "team", "attendee"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["invited", "active", "disabled"] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  );
}

export function isUserStatus(value: unknown): value is UserStatus {
  return (
    typeof value === "string" &&
    (USER_STATUSES as readonly string[]).includes(value)
  );
}

/** Store emails lowercase so the unique index treats them as one address. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
