import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin-session");
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("conference");
    const collection = db.collection("speaker_submissions");

    const submissions = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: submissions.length,
      speakers: submissions.map((speaker) => ({
        _id: speaker._id.toString(),
        fullName: speaker.fullName ?? "",
        mobile: speaker.mobile ?? "",
        pronunciation: speaker.pronunciation ?? "",
        bio: speaker.bio ?? "",
        bioWordCount: speaker.bioWordCount ?? 0,
        photoUrl: speaker.photoUrl ?? "",
        accessibilityNeeds: speaker.accessibilityNeeds ?? "",
        otherNotes: speaker.otherNotes ?? "",
        attendVertexDinner: speaker.attendVertexDinner === true,
        needsHotelRoom: speaker.needsHotelRoom === true,
        guestSharingRoom: speaker.guestSharingRoom === true,
        additionalNightApril29: speaker.additionalNightApril29 === true,
        submittedAt: speaker.submittedAt,
        status: speaker.status ?? "received",
      })),
    });
  } catch (error) {
    console.error("Error fetching speaker submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch speaker submissions" },
      { status: 500 },
    );
  }
}
