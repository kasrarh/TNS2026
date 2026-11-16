export type YesNo = "" | "yes" | "no";

export interface SpeakerFormFields {
  fullName: string;
  mobile: string;
  pronunciation: string;
  bio: string;
  attendVertexDinner: YesNo;
  needsHotelRoom: YesNo;
  guestSharingRoom: YesNo;
  additionalNightApril29: YesNo;
}

export interface SpeakerFormCompletion {
  detailsComplete: boolean;
  bioChecked: boolean;
  photoAttached: boolean;
  dinnerAnswered: boolean;
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
    form.fullName.trim() && form.mobile.trim() && form.pronunciation.trim()
  );
  const bioChecked = Boolean(form.bio.trim());
  const photoAttached = Boolean(hasPhoto);
  const dinnerAnswered = Boolean(form.attendVertexDinner);
  const hotelAnswered =
    form.needsHotelRoom === "no" ||
    (form.needsHotelRoom === "yes" &&
      Boolean(form.guestSharingRoom && form.additionalNightApril29));

  return {
    detailsComplete,
    bioChecked,
    photoAttached,
    dinnerAnswered,
    hotelAnswered,
    allComplete:
      detailsComplete &&
      bioChecked &&
      photoAttached &&
      dinnerAnswered &&
      hotelAnswered,
  };
}

export function validateSpeakerSubmission(body: Record<string, unknown>) {
  const requiredFields = [
    "fullName",
    "mobile",
    "pronunciation",
    "bio",
    "photoUrl",
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

  if (body.attendVertexDinner === undefined || body.needsHotelRoom === undefined) {
    return {
      ok: false as const,
      error: "Please complete all required speaker fields.",
    };
  }

  if (body.needsHotelRoom === true) {
    if (
      body.guestSharingRoom === undefined ||
      body.additionalNightApril29 === undefined
    ) {
      return {
        ok: false as const,
        error: "Please complete all required speaker fields.",
      };
    }
  }

  return { ok: true as const };
}
