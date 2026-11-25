/**
 * Shared rules for the TNS2027 abstract submission forms.
 * Used by both the client forms and the API route so the checks match.
 *
 * Programs:
 *  - "emerging"     Emerging Scientists (students)
 *  - "early-career" Early Career Scientists (professionals)
 */

export const ABSTRACT_PROGRAMS = ["emerging", "early-career"] as const;
export type AbstractProgram = (typeof ABSTRACT_PROGRAMS)[number];

/**
 * Submission deadlines, 11:59 PM ET (EST = UTC-5).
 * Internal fallback: either can be moved to 15 Feb 2027 (2027-02-16T04:59:59.999Z).
 */
export const ABSTRACT_DEADLINES: Record<AbstractProgram, { at: Date; label: string }> = {
  emerging: {
    at: new Date("2027-01-27T04:59:59.999Z"),
    label: "26 January 2027, 11:59 PM ET",
  },
  "early-career": {
    at: new Date("2027-02-01T04:59:59.999Z"),
    label: "31 January 2027, 11:59 PM ET",
  },
};

export function isPastDeadline(program: AbstractProgram, now = new Date()) {
  return now.getTime() > ABSTRACT_DEADLINES[program].at.getTime();
}

export const TITLE_MAX_CHARS = 180;
export const ABSTRACT_MAX_WORDS = 250;
export const KEYWORDS_MIN = 3;
export const KEYWORDS_MAX = 5;

export const SCIENTIFIC_AREAS = [
  "Spatial transcriptomics",
  "Spatial proteomics",
  "Single-cell sequencing",
  "Flow / mass cytometry",
  "Mass spectrometry",
  "Multimodal integration",
  "Computational methods",
  "Other",
] as const;

export interface Declaration {
  key: string;
  label: string;
}

const SHARED_DECLARATIONS = {
  sharing: {
    key: "sharing",
    label:
      "I consent to my abstract and 5-slide digital pitch deck being shared on the TNS website, in Panoramics email updates and on social media.",
  },
  media: {
    key: "media",
    label: "I consent to being photographed and recorded at the summit.",
  },
} as const;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\-.\s\d]{7,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return PHONE_PATTERN.test(value.trim()) && digits.length >= 7;
}

export function isValidUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function parseKeywords(text: string) {
  return text
    .split(/[,;\n]/)
    .map((k) => k.trim())
    .filter(Boolean);
}

export type FieldErrors = Partial<Record<string, string>>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function makeNeed<T extends object>(input: T, errors: FieldErrors) {
  return (key: keyof T & string, message = "Required.") => {
    if (!str(input[key])) errors[key] = message;
  };
}

// ---------------------------------------------------------------------------
// Fields shared by both programs (sections "Your details", "Scientific
// abstract" and "Declarations")
// ---------------------------------------------------------------------------

export interface CommonAbstractInput {
  firstName: string;
  lastName: string;
  preferredName: string;
  pronouns: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;

  title: string;
  authors: string;
  affiliations: string;
  scientificArea: string;
  scientificAreaOther: string;
  abstract: string;
  keywords: string;

  declarations: Record<string, boolean>;
}

export const emptyCommonInput = (
  declarations: readonly Declaration[]
): CommonAbstractInput => ({
  firstName: "",
  lastName: "",
  preferredName: "",
  pronouns: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  title: "",
  authors: "",
  affiliations: "",
  scientificArea: "",
  scientificAreaOther: "",
  abstract: "",
  keywords: "",
  declarations: Object.fromEntries(declarations.map((d) => [d.key, false])),
});

function validateCommon(
  input: CommonAbstractInput,
  declarations: readonly Declaration[],
  errors: FieldErrors
) {
  const need = makeNeed(input, errors);

  need("firstName");
  need("lastName");
  need("email");
  if (str(input.email) && !isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  need("phone");
  if (str(input.phone) && !isValidPhone(input.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  need("location");
  if (str(input.linkedinUrl) && !isValidUrl(input.linkedinUrl)) {
    errors.linkedinUrl = "Enter a full URL, starting with https://";
  }

  need("title");
  if (str(input.title).length > TITLE_MAX_CHARS) {
    errors.title = `Keep the title to ${TITLE_MAX_CHARS} characters or fewer.`;
  }
  need("authors");
  need("affiliations");
  if (!(SCIENTIFIC_AREAS as readonly string[]).includes(input.scientificArea)) {
    errors.scientificArea = "Choose a scientific area.";
  } else if (input.scientificArea === "Other") {
    need("scientificAreaOther", "Tell us the scientific area.");
  }
  need("abstract");
  if (countWords(input.abstract) > ABSTRACT_MAX_WORDS) {
    errors.abstract = `Keep the abstract to ${ABSTRACT_MAX_WORDS} words or fewer.`;
  }
  const keywordCount = parseKeywords(input.keywords).length;
  if (keywordCount < KEYWORDS_MIN || keywordCount > KEYWORDS_MAX) {
    errors.keywords = `Enter ${KEYWORDS_MIN} to ${KEYWORDS_MAX} keywords, separated by commas.`;
  }

  for (const d of declarations) {
    if (!input.declarations?.[d.key]) {
      errors[`declarations.${d.key}`] = "Required.";
    }
  }
}

function toCommonInput(
  body: Record<string, unknown>,
  declarations: readonly Declaration[]
): CommonAbstractInput {
  const decl = (body.declarations ?? {}) as Record<string, unknown>;
  return {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    preferredName: str(body.preferredName),
    pronouns: str(body.pronouns),
    email: str(body.email),
    phone: str(body.phone),
    location: str(body.location),
    linkedinUrl: str(body.linkedinUrl),
    title: str(body.title),
    authors: str(body.authors),
    affiliations: str(body.affiliations),
    scientificArea: str(body.scientificArea),
    scientificAreaOther: str(body.scientificAreaOther),
    abstract: str(body.abstract),
    keywords: str(body.keywords),
    declarations: Object.fromEntries(
      declarations.map((d) => [d.key, decl[d.key] === true])
    ),
  };
}

// ---------------------------------------------------------------------------
// Emerging Scientists
// ---------------------------------------------------------------------------

/** Age is measured on this day (the summit starts 27 April 2027). */
export const AGE_REFERENCE_DATE = { year: 2027, month: 4, day: 25 };

export const ES_CATEGORIES = [
  {
    value: "es-scholars-graduate",
    label: "ES Scholars: Graduate students",
    description:
      "PhD and Master's students, including clinicians enrolled in an MD/PhD or graduate program.",
    group: "scholars",
  },
  {
    value: "es-scholars-undergraduate",
    label: "ES Scholars: Undergraduate students",
    description: "Students enrolled in a bachelor's degree.",
    group: "scholars",
  },
  {
    value: "es-explorers-high-school",
    label: "ES Explorers: High School students",
    description: "High school students aged 16 or older on 25 April 2027.",
    group: "explorers",
  },
] as const;

export type EsCategoryGroup = (typeof ES_CATEGORIES)[number]["group"];

export const ES_DECLARATIONS: readonly Declaration[] = [
  {
    key: "eligibility",
    label: "I confirm I meet the eligibility definition for the category I selected.",
  },
  {
    key: "attendance",
    label:
      "I will attend TNS2027 in person, submit my 5-slide pitch deck by the deadline and pitch at the lunch if selected.",
  },
  SHARED_DECLARATIONS.sharing,
  SHARED_DECLARATIONS.media,
  {
    key: "supervisorApproval",
    label:
      "I have my supervisor's, teacher's or mentor's approval to submit this work.",
  },
];

export function getCategoryGroup(category: string): EsCategoryGroup | null {
  return ES_CATEGORIES.find((c) => c.value === category)?.group ?? null;
}

/**
 * Age on 25 April 2027, from a "YYYY-MM-DD" date of birth.
 * Returns null for an invalid or future date.
 */
export function ageOnReferenceDate(dob: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!match) return null;

  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const check = new Date(Date.UTC(y, m - 1, d));
  if (
    check.getUTCFullYear() !== y ||
    check.getUTCMonth() !== m - 1 ||
    check.getUTCDate() !== d
  ) {
    return null;
  }

  const ref = AGE_REFERENCE_DATE;
  let age = ref.year - y;
  if (ref.month < m || (ref.month === m && ref.day < d)) age -= 1;
  return age >= 0 ? age : null;
}

export type ExplorerAgeStatus = "unknown" | "ineligible" | "minor" | "adult";

export function getExplorerAgeStatus(dob: string): ExplorerAgeStatus {
  const age = ageOnReferenceDate(dob);
  if (age === null) return "unknown";
  if (age < 16) return "ineligible";
  if (age < 18) return "minor";
  return "adult";
}

export interface EmergingAbstractInput extends CommonAbstractInput {
  category: string;
  programAndYear: string;
  universityAndDepartment: string;
  schoolAndGrade: string;
  supervisorName: string;
  supervisorEmail: string;

  dateOfBirth: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  guardianConsentAcknowledged: boolean;
}

export const emptyEmergingInput = (): EmergingAbstractInput => ({
  ...emptyCommonInput(ES_DECLARATIONS),
  category: "",
  programAndYear: "",
  universityAndDepartment: "",
  schoolAndGrade: "",
  supervisorName: "",
  supervisorEmail: "",
  dateOfBirth: "",
  guardianName: "",
  guardianEmail: "",
  guardianPhone: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  guardianConsentAcknowledged: false,
});

/** Returns a map of field name to message; empty means valid. */
export function validateEmergingAbstract(
  input: EmergingAbstractInput
): FieldErrors {
  const errors: FieldErrors = {};
  const need = makeNeed(input, errors);

  validateCommon(input, ES_DECLARATIONS, errors);

  // Category and studies
  const group = getCategoryGroup(input.category);
  if (!group) errors.category = "Choose a category.";

  if (group === "scholars") {
    need("programAndYear");
    need("universityAndDepartment");
  }
  if (group === "explorers") {
    need("schoolAndGrade");
  }

  need("supervisorName");
  need("supervisorEmail");
  if (str(input.supervisorEmail) && !isValidEmail(input.supervisorEmail)) {
    errors.supervisorEmail = "Enter a valid email address.";
  }

  // Explorers safeguarding
  if (group === "explorers") {
    const ageStatus = getExplorerAgeStatus(str(input.dateOfBirth));
    if (!str(input.dateOfBirth) || ageStatus === "unknown") {
      errors.dateOfBirth = "Enter a valid date of birth.";
    } else if (ageStatus === "ineligible") {
      errors.dateOfBirth =
        "Thank you for your interest. ES Explorers must be at least 16 years old on 25 April 2027, so we can't accept this submission.";
    }

    if (ageStatus === "minor") {
      need("guardianName");
      need("guardianEmail");
      need("guardianPhone");
      if (str(input.guardianEmail) && !isValidEmail(input.guardianEmail)) {
        errors.guardianEmail = "Enter a valid email address.";
      }
      if (str(input.guardianPhone) && !isValidPhone(input.guardianPhone)) {
        errors.guardianPhone = "Enter a valid phone number.";
      }
      if (!input.guardianConsentAcknowledged) {
        errors.guardianConsentAcknowledged =
          "Please confirm you understand a signed consent form is needed.";
      }
    }

    need("emergencyName");
    need("emergencyRelationship");
    need("emergencyPhone");
    if (str(input.emergencyPhone) && !isValidPhone(input.emergencyPhone)) {
      errors.emergencyPhone = "Enter a valid phone number.";
    }
  }

  return errors;
}

/** Coerces an untrusted JSON body into the input shape. */
export function toEmergingAbstractInput(
  body: Record<string, unknown>
): EmergingAbstractInput {
  return {
    ...toCommonInput(body, ES_DECLARATIONS),
    category: str(body.category),
    programAndYear: str(body.programAndYear),
    universityAndDepartment: str(body.universityAndDepartment),
    schoolAndGrade: str(body.schoolAndGrade),
    supervisorName: str(body.supervisorName),
    supervisorEmail: str(body.supervisorEmail),
    dateOfBirth: str(body.dateOfBirth),
    guardianName: str(body.guardianName),
    guardianEmail: str(body.guardianEmail),
    guardianPhone: str(body.guardianPhone),
    emergencyName: str(body.emergencyName),
    emergencyRelationship: str(body.emergencyRelationship),
    emergencyPhone: str(body.emergencyPhone),
    guardianConsentAcknowledged: body.guardianConsentAcknowledged === true,
  };
}

// ---------------------------------------------------------------------------
// Early Career Scientists
// ---------------------------------------------------------------------------

/** Career windows are measured against the summit year. */
export const ECS_REFERENCE_YEAR = 2027;
export const ECS_RESEARCH_WINDOW_YEARS = 10;
export const ECS_INVESTIGATOR_WINDOW_YEARS = 5;

export const ECS_CATEGORIES = [
  {
    value: "ecs-postdoc-clinical-fellow",
    label: "Postdoctoral & Clinical Research Fellows",
    description:
      "Postdocs and research fellows; residents and clinical fellows doing research.",
  },
  {
    value: "ecs-research-technical-staff",
    label: "Research & Technical Staff",
    description:
      "Technicians, research assistants, lab managers and core facility staff.",
  },
  {
    value: "ecs-staff-associate-scientist",
    label: "Staff & Associate Scientists",
    description:
      "Staff scientists, research associates, scientific associates and research scientists.",
  },
  {
    value: "ecs-early-career-investigator",
    label: "Early-Career Investigators",
    description:
      "New PIs and clinician-scientists within 5 years of their first independent appointment.",
  },
  {
    value: "ecs-industry-startup",
    label: "Industry & Startup Scientists",
    description: "R&D scientists, research leads and founding scientists.",
  },
] as const;

export const ECS_INVESTIGATOR_CATEGORY = "ecs-early-career-investigator";

export const ECS_SECTORS = [
  "Academia",
  "Hospital or research institute",
  "Industry",
  "Startup",
  "Core facility",
  "Other",
] as const;

export const ECS_LOOKING_FOR = [
  "Collaborators",
  "Industry partners",
  "Funding",
  "Career opportunities",
  "Technology",
  "Other",
] as const;

export const ECS_DECLARATIONS: readonly Declaration[] = [
  {
    key: "eligibility",
    label:
      "I confirm I meet the Early Career Scientist definition for the category I selected.",
  },
  {
    key: "attendance",
    label:
      "I will attend TNS2027 in person, submit my 5-slide pitch deck by the deadline and pitch at the session if selected.",
  },
  SHARED_DECLARATIONS.sharing,
  SHARED_DECLARATIONS.media,
  {
    key: "organizationPermission",
    label: "I have permission from my organization to present this work publicly.",
  },
];

export interface EarlyCareerAbstractInput extends CommonAbstractInput {
  category: string;
  jobTitle: string;
  organizationAndDepartment: string;
  sector: string;
  sectorOther: string;
  highestDegree: string;
  researchStartYear: string;
  firstAppointmentYear: string;
  careerBreaks: string;
  lookingFor: string[];
  lookingForOther: string;
}

export const emptyEarlyCareerInput = (): EarlyCareerAbstractInput => ({
  ...emptyCommonInput(ECS_DECLARATIONS),
  category: "",
  jobTitle: "",
  organizationAndDepartment: "",
  sector: "",
  sectorOther: "",
  highestDegree: "",
  researchStartYear: "",
  firstAppointmentYear: "",
  careerBreaks: "",
  lookingFor: [],
  lookingForOther: "",
});

export function parseYear(value: string): number | null {
  if (!/^\d{4}$/.test(value.trim())) return null;
  const year = Number(value);
  return year >= 1950 && year <= ECS_REFERENCE_YEAR ? year : null;
}

export interface EarlyCareerFlags {
  researchYears: number | null;
  outsideResearchWindow: boolean;
  appointmentYears: number | null;
  outsideInvestigatorWindow: boolean;
}

/**
 * Career-window checks. These flag submissions for review; they never block,
 * so career breaks can be taken into account.
 */
export function getEarlyCareerFlags(
  input: Pick<EarlyCareerAbstractInput, "category" | "researchStartYear" | "firstAppointmentYear">
): EarlyCareerFlags {
  const start = parseYear(input.researchStartYear);
  const researchYears = start === null ? null : ECS_REFERENCE_YEAR - start;

  const isInvestigator = input.category === ECS_INVESTIGATOR_CATEGORY;
  const appointment = isInvestigator ? parseYear(input.firstAppointmentYear) : null;
  const appointmentYears =
    appointment === null ? null : ECS_REFERENCE_YEAR - appointment;

  return {
    researchYears,
    outsideResearchWindow:
      researchYears !== null && researchYears > ECS_RESEARCH_WINDOW_YEARS,
    appointmentYears,
    outsideInvestigatorWindow:
      appointmentYears !== null && appointmentYears > ECS_INVESTIGATOR_WINDOW_YEARS,
  };
}

export function validateEarlyCareerAbstract(
  input: EarlyCareerAbstractInput
): FieldErrors {
  const errors: FieldErrors = {};
  const need = makeNeed(input, errors);

  validateCommon(input, ECS_DECLARATIONS, errors);

  if (!ECS_CATEGORIES.some((c) => c.value === input.category)) {
    errors.category = "Choose a category.";
  }
  need("jobTitle");
  need("organizationAndDepartment");
  if (!(ECS_SECTORS as readonly string[]).includes(input.sector)) {
    errors.sector = "Choose a sector.";
  } else if (input.sector === "Other") {
    need("sectorOther", "Tell us your sector.");
  }
  need("highestDegree");

  if (!str(input.researchStartYear)) {
    errors.researchStartYear = "Required.";
  } else if (parseYear(input.researchStartYear) === null) {
    errors.researchStartYear = `Enter a year between 1950 and ${ECS_REFERENCE_YEAR}.`;
  }

  if (input.category === ECS_INVESTIGATOR_CATEGORY) {
    if (!str(input.firstAppointmentYear)) {
      errors.firstAppointmentYear = "Required.";
    } else if (parseYear(input.firstAppointmentYear) === null) {
      errors.firstAppointmentYear = `Enter a year between 1950 and ${ECS_REFERENCE_YEAR}.`;
    }
  }

  if (input.lookingFor.some((v) => !(ECS_LOOKING_FOR as readonly string[]).includes(v))) {
    errors.lookingFor = "Choose from the listed options.";
  }

  return errors;
}

export function toEarlyCareerAbstractInput(
  body: Record<string, unknown>
): EarlyCareerAbstractInput {
  const lookingFor = Array.isArray(body.lookingFor)
    ? Array.from(new Set(body.lookingFor.map(str).filter(Boolean)))
    : [];
  return {
    ...toCommonInput(body, ECS_DECLARATIONS),
    category: str(body.category),
    jobTitle: str(body.jobTitle),
    organizationAndDepartment: str(body.organizationAndDepartment),
    sector: str(body.sector),
    sectorOther: str(body.sectorOther),
    highestDegree: str(body.highestDegree),
    researchStartYear: str(body.researchStartYear),
    firstAppointmentYear: str(body.firstAppointmentYear),
    careerBreaks: str(body.careerBreaks),
    lookingFor,
    lookingForOther: str(body.lookingForOther),
  };
}
