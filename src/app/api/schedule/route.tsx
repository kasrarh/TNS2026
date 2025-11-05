import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("conferenceDB");
    const collection = db.collection("schedule");

    const dataset = await req.json();

    if (!Array.isArray(dataset)) {
      return NextResponse.json(
        { message: "Dataset must be an array of objects" },
        { status: 400 }
      );
    }

    const result = await collection.insertMany(dataset);

    return NextResponse.json({
      message: "Data inserted successfully",
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    console.error("Error inserting documents:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
} 
