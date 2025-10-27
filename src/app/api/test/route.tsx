import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("conferenceDB");
  const result = await db.collection("test").insertOne({ hello: "world" });
  return Response.json({ message: "Success", id: result.insertedId});
}
