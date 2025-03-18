import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const story = await db.get("SELECT * FROM stories WHERE id = ?", [
      params.id,
    ]);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Get comments for the story
    const comments = await db.all(
      "SELECT * FROM comments WHERE story_id = ? ORDER BY date DESC",
      [params.id]
    );

    return NextResponse.json({ ...story, comments });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { likes } = await request.json();
    const db = await getDb();

    await db.run("UPDATE stories SET likes = ? WHERE id = ?", [
      likes,
      params.id,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update story" },
      { status: 500 }
    );
  }
}
