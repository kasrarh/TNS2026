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
    const collection = db.collection("tns2027_signups");

    const signups = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: signups.length,
      signups: signups.map((signup) => ({
        _id: signup._id.toString(),
        email: signup.email,
        createdAt: signup.createdAt,
        source: signup.source ?? "unknown",
      })),
    });
  } catch (error) {
    console.error("Error fetching TNS2027 signups:", error);
    return NextResponse.json(
      { error: "Failed to fetch signups" },
      { status: 500 },
    );
  }
}
