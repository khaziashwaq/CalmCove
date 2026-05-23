import { NextResponse } from "next/server";
import { getStoryById, getCommentsByStoryId } from "@/lib/firestore";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const story = await getStoryById(params.id);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const comments = await getCommentsByStoryId(params.id);

    return NextResponse.json({ ...story, comments });
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 },
    );
  }
}
