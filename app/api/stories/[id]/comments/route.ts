import { NextResponse } from "next/server";
import { createComment } from "@/lib/firestore";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { userEmail, userName, content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 },
      );
    }

    const author = userName && userEmail ? `${userName}` : "Anonymous";
    const date = new Date().toISOString();

    const comment = await createComment(params.id, { author, content, date });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
