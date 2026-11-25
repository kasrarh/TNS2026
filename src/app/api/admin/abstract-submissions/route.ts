import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import {
  COLLECTIONS,
  DB_NAME,
  type AbstractSubmission2027Document,
} from "@/lib/db/schema";

/** Lists every TNS2027 abstract submission, newest first. Admin only. */
export async function GET() {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin-session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const submissions = await client
      .db(DB_NAME)
      .collection<AbstractSubmission2027Document>(
        COLLECTIONS.abstractSubmissions2027
      )
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: submissions.length,
      submissions: submissions.map((s) => ({
        ...s,
        _id: s._id.toString(),
        reviewerNotes: s.reviewerNotes ?? "",
        reviewedAt: s.reviewedAt ?? null,
      })),
    });
  } catch (error) {
    console.error("Error fetching abstract submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch abstract submissions" },
      { status: 500 }
    );
  }
}
