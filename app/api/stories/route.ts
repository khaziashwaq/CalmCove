import { NextResponse } from "next/server";
import { getAllStories, createStory } from "@/lib/firestore";

export async function GET() {
  try {
    const stories = await getAllStories();
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, userName, userEmail } = await request.json();

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const baseId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const id = `${baseId}-${timestamp}-${randomStr}`;

    const date = new Date().toISOString();
    const author = userName ? `${userName}` : "Anonymous";

    await createStory({ id, title, author, content, date });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json(
      { error: "Failed to create story" },
      { status: 500 },
    );
  }
}
