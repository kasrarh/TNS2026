import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { countWords, validateSpeakerSubmission } from "@/lib/speakerForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      mobile,
      pronunciation,
      bio,
      photoUrl,
      photoKey,
      accessibilityNeeds,
      otherNotes,
      attendVertexDinner,
      needsHotelRoom,
      guestSharingRoom,
      additionalNightApril29,
    } = body;

    const validation = validateSpeakerSubmission(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("conference");
    const collection = db.collection("speaker_submissions");

    const wantsHotel = Boolean(needsHotelRoom);

    const document = {
      fullName: String(fullName).trim(),
      mobile: String(mobile).trim(),
      pronunciation: String(pronunciation).trim(),
      bio: String(bio).trim(),
      bioWordCount: countWords(String(bio)),
      photoUrl: String(photoUrl).trim(),
      photoKey: photoKey ? String(photoKey).trim() : null,
      accessibilityNeeds: accessibilityNeeds
        ? String(accessibilityNeeds).trim()
        : "",
      otherNotes: otherNotes ? String(otherNotes).trim() : "",
      attendVertexDinner: Boolean(attendVertexDinner),
      needsHotelRoom: wantsHotel,
      guestSharingRoom: wantsHotel ? Boolean(guestSharingRoom) : false,
      additionalNightApril29: wantsHotel
        ? Boolean(additionalNightApril29)
        : false,
      submittedAt: new Date(),
      status: "received",
      _id: new ObjectId(),
    };

    const result = await collection.insertOne(document);

    return NextResponse.json(
      {
        success: true,
        message: "Speaker details submitted successfully.",
        submissionId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving speaker submission:", error);
    return NextResponse.json(
      { error: "Failed to save speaker submission." },
      { status: 500 }
    );
  }
}
