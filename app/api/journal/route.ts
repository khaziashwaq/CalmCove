import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { createJournalEntry, getJournalEntries } from "@/lib/firestore";

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401 }
      );
    }

    const auth = getFirebaseAdmin();
    const user = await auth.verifyIdToken(token);

    const body = await request.json();

    const {
      date,
      mood,
      daily_tasks,
      goals_for_tomorrow,
      creative_ideas,
      habit_tracker,
      todays_wins,
      gratitude_list,
      personal_reflections,
    } = body;

    const journalId = await createJournalEntry(user.uid, {
      date,
      mood,
      daily_tasks,
      goals_for_tomorrow,
      creative_ideas,
      habit_tracker,
      todays_wins,
      gratitude_list,
      personal_reflections,
    });

    return NextResponse.json({ success: true, id: journalId });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create journal entry",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const auth = getFirebaseAdmin();
    const user = await auth.verifyIdToken(token);
    if (!user?.uid) {
      return NextResponse.json(
        { error: "Invalid authorization token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || undefined;

    const entries = await getJournalEntries(user.uid, date);

    return NextResponse.json(entries || []);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch journal entries",
      },
      { status: 500 }
    );
  }
}
