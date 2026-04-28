import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("conference");
    const collection = db.collection("tns2027_signups");

    const existingSignup = await collection.findOne({ email });
    if (existingSignup) {
      return NextResponse.json(
        { success: true, message: "This email is already registered." },
        { status: 200 },
      );
    }

    await collection.insertOne({
      email,
      createdAt: new Date(),
      source: "engagement_section",
    });

    return NextResponse.json(
      { success: true, message: "Thanks! Your email has been registered." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving TNS2027 signup:", error);
    return NextResponse.json(
      { error: "Failed to register email." },
      { status: 500 },
    );
  }
}
