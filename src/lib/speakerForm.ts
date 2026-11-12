export type YesNo = "" | "yes" | "no";

export interface SpeakerFormFields {
  fullName: string;
  position: string;
  affiliation: string;
  email: string;
  mobile: string;
  pronunciation: string;
  bio: string;
  dietaryRequirements: string;
  attendVertexDinner: YesNo;
  guestSharingRoom: YesNo;
  additionalNightApril29: YesNo;
}

export interface SpeakerFormCompletion {
  detailsComplete: boolean;
  bioChecked: boolean;
  photoAttached: boolean;
  dietaryAndDinner: boolean;
  hotelAnswered: boolean;
  allComplete: boolean;
}

export function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function isAllowedSpeakerPhoto(file: {
  type: string;
  size: number;
}) {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/jpg"]);
  if (!allowedTypes.has(file.type)) {
    return { ok: false as const, error: "Photo must be a JPG or PNG file." };
  }

  if (file.size > 50 * 1024 * 1024) {
    return { ok: false as const, error: "Photo must be smaller than 50MB." };
  }

  return { ok: true as const };
}

export function getSpeakerFormCompletion(
  form: SpeakerFormFields,
  hasPhoto: boolean
): SpeakerFormCompletion {
  const detailsComplete = Boolean(
    form.fullName.trim() &&
      form.position.trim() &&
      form.affiliation.trim() &&
      form.email.trim() &&
      form.mobile.trim() &&
      form.pronunciation.trim()
  );
  const bioChecked = Boolean(form.bio.trim());
  const photoAttached = Boolean(hasPhoto);
  const dietaryAndDinner = Boolean(
    form.dietaryRequirements.trim() && form.attendVertexDinner
  );
  const hotelAnswered = Boolean(
    form.guestSharingRoom && form.additionalNightApril29
  );

  return {
    detailsComplete,
    bioChecked,
    photoAttached,
    dietaryAndDinner,
    hotelAnswered,
    allComplete:
      detailsComplete &&
      bioChecked &&
      photoAttached &&
      dietaryAndDinner &&
      hotelAnswered,
  };
}

export function validateSpeakerSubmission(body: Record<string, unknown>) {
  const requiredFields = [
    "fullName",
    "position",
    "affiliation",
    "email",
    "mobile",
    "pronunciation",
    "bio",
    "photoUrl",
    "dietaryRequirements",
  ] as const;

  for (const field of requiredFields) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return {
        ok: false as const,
        error: "Please complete all required speaker fields.",
      };
    }
  }

  if (
    body.attendVertexDinner === undefined ||
    body.guestSharingRoom === undefined ||
    body.additionalNightApril29 === undefined
  ) {
    return {
      ok: false as const,
      error: "Please complete all required speaker fields.",
    };
  }

  return { ok: true as const };
}
