import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { countWords, validateSpeakerSubmission } from "@/lib/speakerForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      position,
      affiliation,
      email,
      mobile,
      pronunciation,
      bio,
      photoUrl,
      photoKey,
      accessibilityNeeds,
      socialLinks,
      otherNotes,
      dietaryRequirements,
      attendVertexDinner,
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

    const document = {
      fullName: String(fullName).trim(),
      position: String(position).trim(),
      affiliation: String(affiliation).trim(),
      email: String(email).trim().toLowerCase(),
      mobile: String(mobile).trim(),
      pronunciation: String(pronunciation).trim(),
      bio: String(bio).trim(),
      bioWordCount: countWords(String(bio)),
      photoUrl: String(photoUrl).trim(),
      photoKey: photoKey ? String(photoKey).trim() : null,
      accessibilityNeeds: accessibilityNeeds
        ? String(accessibilityNeeds).trim()
        : "",
      socialLinks: socialLinks ? String(socialLinks).trim() : "",
      otherNotes: otherNotes ? String(otherNotes).trim() : "",
      dietaryRequirements: String(dietaryRequirements).trim(),
      attendVertexDinner: Boolean(attendVertexDinner),
      guestSharingRoom: Boolean(guestSharingRoom),
      additionalNightApril29: Boolean(additionalNightApril29),
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
