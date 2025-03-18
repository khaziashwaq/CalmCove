import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the request body
    const db = await getDb();
    const body = await request.json();

    console.log("Received request body:", body);

    const { userEmail, userName, content } = body;
    console.log("Extracted values:", { content, userEmail, userName });

    // Validate required fields
    if (!content) {
      console.log("Missing content in request");
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // Set the author name based on user info
    const author = userName && userEmail ? `${userName}` : "Anonymous";
    const date = new Date().toISOString();

    // Insert the comment
    const result = await db.run(
      "INSERT INTO comments (story_id, author, content, date) VALUES (?, ?, ?, ?)",
      [params.id, author, content, date]
    );
    console.log("Database insert result:", result);

    // Get the inserted comment
    const comment = await db.get("SELECT * FROM comments WHERE id = ?", [
      result.lastID,
    ]);
    console.log("Retrieved comment:", comment);

    if (!comment) {
      throw new Error("Failed to retrieve created comment");
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
