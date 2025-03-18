import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { headers } from "next/headers";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    console.log("Starting journal entry creation...");
    const db = await getDb();
    const headersList = headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader) {
      console.log("No authorization header found");
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      console.log("Invalid authorization header format");
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401 }
      );
    }

    console.log("Verifying Firebase token...");
    const auth = getFirebaseAdmin();
    const user = await auth.verifyIdToken(token);
    console.log("Token verified for user:", user.uid);

    const body = await request.json();

    const {
      id,
      date,
      mood,
      daily_tasks,
      goals_for_tomorrow,
      creative_ideas,
      habit_tracker,
      todays_wins,
      gratitude_list,
      personal_reflections,
      user_id,
    } = body;

    // Remove id from destructuring since we generate it
    const journalId = `${date}-${user.uid}`;
    console.log("Generated journal ID:", journalId);

    try {
      const result = await db.run(
        `INSERT INTO journal (
          id,
          date,
          mood,
          daily_tasks,
          goals_for_tomorrow,
          creative_ideas,
          habit_tracker,
          todays_wins,
          gratitude_list,
          personal_reflections,
          user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          date,
          mood,
          daily_tasks,
          goals_for_tomorrow,
          creative_ideas,
          habit_tracker,
          todays_wins,
          gratitude_list,
          personal_reflections,
          user.uid,
        ]
      );
      console.log("Database insert completed:", result);
    } catch (dbError: unknown) {
      console.error("Database insert error:", dbError);
      if (dbError instanceof Error) {
        throw new Error(`Database insert failed: ${dbError.message}`);
      }
      throw new Error("Database insert failed: Unknown error");
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Full error details:", error);
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
