import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const stories = await db.all("SELECT * FROM stories ORDER BY date DESC");
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, userName, userEmail } = await request.json();
    const db = await getDb();

    // Generate a unique ID using title, timestamp, and random string
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const baseId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const id = `${baseId}-${timestamp}-${randomStr}`;

    const date = new Date().toISOString();

    // Set the author name, using both display name and email if available
    const author = userName ? `${userName}` : "Anonymous";

    console.log("Creating story with author:", author);

    await db.run(
      "INSERT INTO stories (id, title, author, content, date, likes) VALUES (?, ?, ?, ?, ?, 0)",
      [id, title, author, content, date]
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create story" },
      { status: 500 }
    );
  }
}
