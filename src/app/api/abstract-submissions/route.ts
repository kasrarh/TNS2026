import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {
  ABSTRACT_PROGRAMS,
  ECS_INVESTIGATOR_CATEGORY,
  ageOnReferenceDate,
  countWords,
  getCategoryGroup,
  getEarlyCareerFlags,
  isPastDeadline,
  parseKeywords,
  parseYear,
  toEarlyCareerAbstractInput,
  toEmergingAbstractInput,
  validateEarlyCareerAbstract,
  validateEmergingAbstract,
  type AbstractProgram,
  type CommonAbstractInput,
  type FieldErrors,
} from "@/lib/abstractForm";
import {
  COLLECTIONS,
  DB_NAME,
  type AbstractSubmission2027Document,
} from "@/lib/db/schema";
import { normalizeEmail } from "@/lib/db/roles";

type SubmissionParts = Pick<
  AbstractSubmission2027Document,
  "category" | "studies" | "role" | "safeguarding" | "eligibilityFlags"
>;

function commonParts(input: CommonAbstractInput) {
  return {
    applicant: {
      firstName: input.firstName,
      lastName: input.lastName,
      preferredName: input.preferredName,
      pronouns: input.pronouns,
      email: normalizeEmail(input.email),
      phone: input.phone,
      location: input.location,
      linkedinUrl: input.linkedinUrl || null,
    },
    abstract: {
      title: input.title,
      authors: input.authors,
      affiliations: input.affiliations,
      scientificArea: input.scientificArea,
      scientificAreaOther:
        input.scientificArea === "Other" ? input.scientificAreaOther : null,
      body: input.abstract,
      wordCount: countWords(input.abstract),
      keywords: parseKeywords(input.keywords),
    },
    declarations: input.declarations,
  };
}

function buildEmerging(body: Record<string, unknown>) {
  const input = toEmergingAbstractInput(body);
  const errors = validateEmergingAbstract(input);
  if (Object.keys(errors).length > 0) return { errors };

  const group = getCategoryGroup(input.category);
  const isScholar = group === "scholars";
  const isExplorer = group === "explorers";
  const age = isExplorer ? ageOnReferenceDate(input.dateOfBirth) : null;
  const isMinor = age !== null && age < 18;

  const parts: SubmissionParts = {
    category: input.category,
    studies: {
      programAndYear: isScholar ? input.programAndYear : null,
      universityAndDepartment: isScholar ? input.universityAndDepartment : null,
      schoolAndGrade: isExplorer ? input.schoolAndGrade : null,
      supervisorName: input.supervisorName,
      supervisorEmail: normalizeEmail(input.supervisorEmail),
    },
    role: null,
    safeguarding:
      isExplorer && age !== null
        ? {
            dateOfBirth: input.dateOfBirth,
            ageOnApril25_2027: age,
            isMinor,
            guardian: isMinor
              ? {
                  name: input.guardianName,
                  email: normalizeEmail(input.guardianEmail),
                  phone: input.guardianPhone,
                }
              : null,
            emergencyContact: {
              name: input.emergencyName,
              relationship: input.emergencyRelationship,
              phone: input.emergencyPhone,
            },
            guardianConsentAcknowledged: isMinor
              ? input.guardianConsentAcknowledged
              : false,
            guardianConsentReceived: false,
          }
        : null,
    eligibilityFlags: null,
  };

  return { common: commonParts(input), parts };
}

function buildEarlyCareer(body: Record<string, unknown>) {
  const input = toEarlyCareerAbstractInput(body);
  const errors = validateEarlyCareerAbstract(input);
  if (Object.keys(errors).length > 0) return { errors };

  const isInvestigator = input.category === ECS_INVESTIGATOR_CATEGORY;
  const flags = getEarlyCareerFlags(input);

  const parts: SubmissionParts = {
    category: input.category,
    studies: null,
    role: {
      jobTitle: input.jobTitle,
      organizationAndDepartment: input.organizationAndDepartment,
      sector: input.sector,
      sectorOther: input.sector === "Other" ? input.sectorOther : null,
      highestDegree: input.highestDegree,
      researchStartYear: parseYear(input.researchStartYear) as number,
      firstAppointmentYear: isInvestigator
        ? parseYear(input.firstAppointmentYear)
        : null,
      careerBreaks: input.careerBreaks,
      lookingFor: input.lookingFor,
      lookingForOther: input.lookingFor.includes("Other")
        ? input.lookingForOther || null
        : null,
    },
    safeguarding: null,
    eligibilityFlags: {
      ...flags,
      needsReview: flags.outsideResearchWindow || flags.outsideInvestigatorWindow,
    },
  };

  return { common: commonParts(input), parts };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const program = body.program as AbstractProgram;

    if (!(ABSTRACT_PROGRAMS as readonly string[]).includes(program)) {
      return NextResponse.json({ error: "Unknown program." }, { status: 400 });
    }

    if (isPastDeadline(program)) {
      return NextResponse.json(
        { error: "The abstract submission deadline has passed." },
        { status: 403 }
      );
    }

    const built =
      program === "emerging" ? buildEmerging(body) : buildEarlyCareer(body);

    if ("errors" in built) {
      return NextResponse.json(
        {
          error: "Please fix the highlighted fields.",
          fieldErrors: built.errors as FieldErrors,
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const document: AbstractSubmission2027Document = {
      program,
      ...built.parts,
      ...built.common,
      status: "pending",
      submittedAt: now,
      updatedAt: now,
    };

    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<AbstractSubmission2027Document>(
        COLLECTIONS.abstractSubmissions2027
      )
      .insertOne(document);

    return NextResponse.json(
      {
        success: true,
        message: "Abstract submitted successfully.",
        submissionId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving abstract submission:", error);
    return NextResponse.json(
      { error: "Failed to save your abstract. Please try again." },
      { status: 500 }
    );
  }
}
