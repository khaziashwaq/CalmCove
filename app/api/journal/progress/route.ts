import { NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { getJournalProgress } from "@/lib/firestore";

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

    const entries = await getJournalProgress(user.uid);

    // Calculate mood distribution
    const moodCounts: Record<string, number> = {};
    entries.forEach((entry: any) => {
      const mood = entry.mood || "Neutral";
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // Calculate streak (consecutive days with entries)
    let currentStreak = 0;
    let longestStreak = 0;
    if (entries.length > 0) {
      currentStreak = 1;
      let tempStreak = 1;
      for (let i = entries.length - 1; i > 0; i--) {
        const curr = new Date(entries[i].date);
        const prev = new Date(entries[i - 1].date);
        const diffDays = Math.floor(
          (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) longestStreak = tempStreak;
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;

      // Calculate current streak from today backwards
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastEntryDate = new Date(entries[entries.length - 1].date);
      lastEntryDate.setHours(0, 0, 0, 0);
      const daysSinceLastEntry = Math.floor(
        (today.getTime() - lastEntryDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastEntry > 1) {
        currentStreak = 0;
      } else {
        currentStreak = 1;
        for (let i = entries.length - 1; i > 0; i--) {
          const curr = new Date(entries[i].date);
          const prev = new Date(entries[i - 1].date);
          const diffDays = Math.floor(
            (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // Habit completion rate
    let totalHabits = 0;
    let completedHabits = 0;
    entries.forEach((entry: any) => {
      if (entry.habit_tracker) {
        try {
          const habits = JSON.parse(entry.habit_tracker);
          habits.forEach((h: any) => {
            totalHabits++;
            if (h.completed) completedHabits++;
          });
        } catch {}
      }
    });

    // Mood timeline (last 30 entries)
    const moodMap: Record<string, number> = {
      Happy: 5,
      Excited: 4,
      Peaceful: 4,
      Tired: 2,
      Anxious: 2,
      Sad: 1,
      Neutral: 3,
    };

    const moodTimeline = entries.slice(-30).map((entry: any) => ({
      date: entry.date,
      mood: entry.mood,
      score: moodMap[entry.mood] || 3,
    }));

    // Entries with dates and moods for calendar indicators
    const entryDates = entries.map((entry: any) => entry.date);
    const entryMoods: Record<string, string> = {};
    entries.forEach((entry: any) => {
      entryMoods[entry.date] = entry.mood || "Neutral";
    });

    return NextResponse.json({
      totalEntries: entries.length,
      currentStreak,
      longestStreak,
      moodCounts,
      moodTimeline,
      habitCompletionRate:
        totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0,
      entryDates,
      entryMoods,
    });
  } catch (error) {
    console.error("Error fetching journal progress:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch journal progress",
      },
      { status: 500 }
    );
  }
}
