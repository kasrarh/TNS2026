import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import {
  ABSTRACT_SUBMISSION_STATUSES,
  COLLECTIONS,
  DB_NAME,
  type AbstractSubmission2027Document,
  type AbstractSubmissionStatus,
} from "@/lib/db/schema";

const NOTES_MAX_CHARS = 5000;

/**
 * Updates review fields on one TNS2027 submission. Admin only.
 * Body may include any of: status, reviewerNotes, guardianConsentReceived.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin-session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const now = new Date();
    const set: Record<string, unknown> = { updatedAt: now, reviewedAt: now };

    if (body.status !== undefined) {
      if (
        !ABSTRACT_SUBMISSION_STATUSES.includes(
          body.status as AbstractSubmissionStatus
        )
      ) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      set.status = body.status;
    }

    if (body.reviewerNotes !== undefined) {
      if (typeof body.reviewerNotes !== "string") {
        return NextResponse.json({ error: "Invalid notes" }, { status: 400 });
      }
      set.reviewerNotes = body.reviewerNotes.slice(0, NOTES_MAX_CHARS);
    }

    const collection = (await clientPromise)
      .db(DB_NAME)
      .collection<AbstractSubmission2027Document>(
        COLLECTIONS.abstractSubmissions2027
      );
    const _id = new ObjectId(id);

    if (body.guardianConsentReceived !== undefined) {
      if (typeof body.guardianConsentReceived !== "boolean") {
        return NextResponse.json({ error: "Invalid consent value" }, { status: 400 });
      }
      const existing = await collection.findOne(
        { _id },
        { projection: { safeguarding: 1 } }
      );
      if (!existing) {
        return NextResponse.json({ error: "Submission not found" }, { status: 404 });
      }
      if (!existing.safeguarding?.isMinor) {
        return NextResponse.json(
          { error: "Consent only applies to ES Explorers under 18." },
          { status: 400 }
        );
      }
      set["safeguarding.guardianConsentReceived"] = body.guardianConsentReceived;
    }

    if (Object.keys(set).length === 2) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const updated = await collection.findOneAndUpdate(
      { _id },
      { $set: set },
      { returnDocument: "after" }
    );
    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      submission: {
        ...updated,
        _id: updated._id.toString(),
        reviewerNotes: updated.reviewerNotes ?? "",
        reviewedAt: updated.reviewedAt ?? null,
      },
    });
  } catch (error) {
    console.error("Error updating abstract submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
