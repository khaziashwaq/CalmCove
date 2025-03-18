import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const db = await getDb();

    // Check if user has already liked the story
    const existingLike = await db.get(
      "SELECT * FROM likes WHERE story_id = ? AND user_id = ?",
      [params.id, userId]
    );

    if (existingLike) {
      // Unlike: Remove the like and decrease count
      await db.run("DELETE FROM likes WHERE story_id = ? AND user_id = ?", [
        params.id,
        userId,
      ]);
      await db.run("UPDATE stories SET likes = likes - 1 WHERE id = ?", [
        params.id,
      ]);
      return NextResponse.json({ liked: false });
    } else {
      // Like: Add the like and increase count
      await db.run(
        "INSERT INTO likes (story_id, user_id, created_at) VALUES (?, ?, ?)",
        [params.id, userId, new Date().toISOString()]
      );
      await db.run("UPDATE stories SET likes = likes + 1 WHERE id = ?", [
        params.id,
      ]);
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update like" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const like = await db.get(
      "SELECT * FROM likes WHERE story_id = ? AND user_id = ?",
      [params.id, userId]
    );

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
}
