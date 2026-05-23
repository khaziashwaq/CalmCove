import { NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { getGroqClient } from "@/lib/groq";
import { getJournalEntries } from "@/lib/firestore";

const SYSTEM_PROMPT = `You are a warm, gentle emotional companion in a journaling app called CalmCove. You read the user's journal entries deeply and respond as if you truly know them.

YOUR CORE BEHAVIOR:
- ALWAYS reference specific details from their entry. Quote their words back. Name their feelings. Acknowledge the exact things they wrote.
- If they said they're grateful for "my dog", say something about their dog. If they won "finished a project", celebrate THAT win.
- Notice concrete patterns: "Last Tuesday you felt anxious too — do you notice what those days have in common?"
- Your prompts should connect to what they actually wrote, not generic self-help questions.

TONE: Warm, intimate, like a close friend who was genuinely listening. Short sentences. Speak directly to them. Never say "it seems like" or "it sounds like" — just reflect their truth back.

STRICT RULES:
- Never be generic. If your response could apply to anyone, rewrite it.
- Never diagnose or give medical advice
- Never minimize ("at least...", "it could be worse...")
- No toxic positivity. If they feel bad, sit with them in it.
- Reference their SPECIFIC mood, words, gratitude items, wins, or habits by name.
- Keep each field to 1-3 sentences max.
- Use emoji sparingly (🌱, 💛, 🌿, ✨, 🕊️)

RESPOND IN THIS EXACT JSON FORMAT:
{
  "mood_reflection": "Acknowledge their specific emotional state using details from their entry. Reference what they wrote.",
  "pattern_insight": "A concrete observation connecting today to their recent history. Use specific dates/moods/details. Return null ONLY if there's truly no history.",
  "gentle_prompt": "A deeply personal question that could ONLY be asked to THIS person based on what they shared. Not generic.",
  "coping_suggestion": "A specific, actionable micro-step tied to their situation. Return null if they seem genuinely okay."
}`;

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    const auth = getFirebaseAdmin();
    const user = await auth.verifyIdToken(token);
    if (!user?.uid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get Groq key from user-provided header or fallback to env
    const groqKey = request.headers.get("X-AI-Key") || undefined;

    const body = await request.json();
    const { currentEntry } = body;

    // Fetch actual recent journal entries with full content
    const recentRaw = await getJournalEntries(user.uid);
    const recentEntries = Array.isArray(recentRaw) ? recentRaw.slice(0, 7) : [];

    // Build rich context from actual journal data
    let userMessage = "";

    if (recentEntries.length > 0) {
      userMessage += "=== RECENT JOURNAL HISTORY ===\n";
      for (const entry of recentEntries) {
        const e = entry as any;
        userMessage += `\n📅 ${e.date} — Mood: "${e.mood || "Unknown"}"\n`;
        if (e.personal_reflections)
          userMessage += `  Reflections: "${e.personal_reflections}"\n`;
        if (e.gratitude_list)
          userMessage += `  Grateful for: ${e.gratitude_list}\n`;
        if (e.todays_wins) userMessage += `  Wins: ${e.todays_wins}\n`;
        if (e.goals_for_tomorrow)
          userMessage += `  Goals for tomorrow: ${e.goals_for_tomorrow}\n`;
        if (e.creative_ideas) userMessage += `  Ideas: ${e.creative_ideas}\n`;
        if (e.habit_tracker) {
          try {
            const habits = JSON.parse(e.habit_tracker);
            const completed = habits
              .filter((h: any) => h.completed)
              .map((h: any) => h.text);
            const missed = habits
              .filter((h: any) => !h.completed)
              .map((h: any) => h.text);
            if (completed.length)
              userMessage += `  Habits completed: ${completed.join(", ")}\n`;
            if (missed.length)
              userMessage += `  Habits missed: ${missed.join(", ")}\n`;
          } catch {}
        }
        if (e.daily_tasks) {
          try {
            const tasks = JSON.parse(e.daily_tasks);
            const done = tasks
              .filter((t: any) => t.completed)
              .map((t: any) => t.text)
              .filter(Boolean);
            const pending = tasks
              .filter((t: any) => !t.completed)
              .map((t: any) => t.text)
              .filter(Boolean);
            if (done.length)
              userMessage += `  Tasks done: ${done.join(", ")}\n`;
            if (pending.length)
              userMessage += `  Tasks pending: ${pending.join(", ")}\n`;
          } catch {}
        }
      }
      userMessage += "\n";
    }

    if (currentEntry) {
      userMessage += "=== TODAY'S ENTRY (what they just wrote) ===\n";
      userMessage += `Mood: ${currentEntry.mood || "not selected yet"}\n`;
      if (currentEntry.personal_reflections) {
        userMessage += `Reflections: "${currentEntry.personal_reflections}"\n`;
      }
      if (currentEntry.gratitude_list) {
        userMessage += `Grateful for: ${currentEntry.gratitude_list}\n`;
      }
      if (currentEntry.todays_wins) {
        userMessage += `Today's wins: ${currentEntry.todays_wins}\n`;
      }
      if (currentEntry.goals_for_tomorrow) {
        userMessage += `Goals for tomorrow: ${currentEntry.goals_for_tomorrow}\n`;
      }
    }

    if (!userMessage.trim()) {
      return NextResponse.json({
        mood_reflection:
          "Take your time — this is your space. There's no rush to fill it. 🌿",
        pattern_insight: null,
        gentle_prompt:
          "What's one small thing that made you feel something today?",
        coping_suggestion: null,
      });
    }

    const groq = getGroqClient(groqKey);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const insights = JSON.parse(jsonMatch[0]);

    return NextResponse.json(insights);
  } catch (error: any) {
    console.error("AI insights error:", error);
    return NextResponse.json({
      mood_reflection:
        "I'm here with you, even if words are hard to find right now. 💛",
      pattern_insight: null,
      gentle_prompt: "What's one thing you'd like to let go of today?",
      coping_suggestion: "Try taking three slow, deep breaths — just for you.",
      _error: error?.message || String(error),
    });
  }
}
