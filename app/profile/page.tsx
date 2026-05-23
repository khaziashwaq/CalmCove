"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

interface MoodTimelineEntry {
  date: string;
  mood: string;
  score: number;
}

interface ProgressData {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  moodCounts: Record<string, number>;
  moodTimeline: MoodTimelineEntry[];
  habitCompletionRate: number;
  entryDates: string[];
}

const moodEmojis: Record<string, string> = {
  Happy: "🌟",
  Sad: "🌧️",
  Excited: "⚡",
  Peaceful: "🌸",
  Anxious: "🌊",
  Tired: "😴",
  Neutral: "😐",
};

const moodHexColors: Record<string, string> = {
  Happy: "#f59e0b",
  Sad: "#38bdf8",
  Excited: "#fb7185",
  Peaceful: "#34d399",
  Anxious: "#a78bfa",
  Tired: "#9ca3af",
  Neutral: "#94a3b8",
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        router.push("/signIn");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/journal/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setProgress(data);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-breathe rounded-full h-12 w-12 border-2 border-lavender-300 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-lavender-200/60" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const totalMoodEntries = progress
    ? Object.values(progress.moodCounts).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="h-full overflow-y-auto pt-8 sm:pt-12 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* User Info */}
        <div className="mb-6 sm:mb-8 card-calm p-5 sm:p-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl bg-lavender-100 text-xl sm:text-2xl font-medium text-lavender-700">
              {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-light text-sand-900">
                {user.displayName || user.email}
              </h1>
              <p className="text-sm text-sand-500">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Total Entries"
            value={progress?.totalEntries ?? 0}
            icon="📝"
          />
          <StatCard
            label="Current Streak"
            value={`${progress?.currentStreak ?? 0} days`}
            icon="🌱"
          />
          <StatCard
            label="Longest Streak"
            value={`${progress?.longestStreak ?? 0} days`}
            icon="🌿"
          />
          <StatCard
            label="Habit Completion"
            value={`${progress?.habitCompletionRate ?? 0}%`}
            icon="✨"
          />
        </div>

        {progress && progress.totalEntries > 0 ? (
          <>
            {/* Mood Distribution */}
            <div className="mb-8 card-calm p-8">
              <h2 className="mb-6 text-lg font-medium text-sand-800">
                Mood Distribution
              </h2>
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
                <DonutChart
                  moodCounts={progress.moodCounts}
                  total={totalMoodEntries}
                />
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(progress.moodCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([mood, count]) => (
                      <div key={mood} className="flex items-center gap-2">
                        <span
                          className="inline-block h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: moodHexColors[mood] || "#94a3b8",
                          }}
                        />
                        <span className="text-sm text-sand-600">
                          {moodEmojis[mood] || "😐"} {mood}
                        </span>
                        <span className="text-sm font-medium text-sand-800">
                          {count}
                        </span>
                        <span className="text-xs text-sand-400">
                          ({Math.round((count / totalMoodEntries) * 100)}%)
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Mood Timeline */}
            <div className="mb-8 card-calm p-8">
              <h2 className="mb-2 text-lg font-medium text-sand-800">
                Mood Timeline
              </h2>
              <p className="mb-4 text-sm text-sand-400">
                Last {progress.moodTimeline.length} entries
              </p>
              <MoodAreaChart timeline={progress.moodTimeline} />
            </div>

            {/* Recent Entries */}
            <div className="card-calm p-8">
              <h2 className="mb-4 text-lg font-medium text-sand-800">
                Recent Journal Dates
              </h2>
              <div className="flex flex-wrap gap-2">
                {progress.entryDates.slice(-20).reverse().map((date) => {
                  const d = new Date(date);
                  return (
                    <span
                      key={date}
                      className="rounded-2xl bg-lavender-50 border border-lavender-200/40 px-3 py-1.5 text-sm font-medium text-lavender-700"
                    >
                      {d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="card-calm p-12 text-center">
            <p className="text-4xl">📓</p>
            <h2 className="mt-4 text-xl font-light text-sand-800">
              Your story is just beginning
            </h2>
            <p className="mt-3 text-sand-500 max-w-md mx-auto leading-relaxed">
              Start journaling to discover patterns in your emotional landscape.
              There&apos;s no right or wrong way to begin.{" "}
              <a href="/journal" className="text-lavender-500 hover:text-lavender-600 font-medium transition-colors">
                Open your journal
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="card-calm p-5">
      <div className="mb-1 text-2xl">{icon}</div>
      <div className="text-2xl font-medium text-sand-800">{value}</div>
      <div className="text-sm text-sand-500">{label}</div>
    </div>
  );
}

function DonutChart({
  moodCounts,
  total,
}: {
  moodCounts: Record<string, number>;
  total: number;
}) {
  const radius = 80;
  const strokeWidth = 28;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  const sorted = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);
  let accumulated = 0;

  const topMood = sorted.length > 0 ? sorted[0][0] : "Neutral";

  return (
    <div className="relative">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {sorted.map(([mood, count]) => {
          const fraction = count / total;
          const dashLength = circumference * fraction;
          const dashOffset =
            circumference * (1 - accumulated) + circumference * 0.25;
          accumulated += fraction;

          return (
            <circle
              key={mood}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={moodHexColors[mood] || "#94a3b8"}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-700"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl">{moodEmojis[topMood] || "😐"}</span>
        <span className="text-xs font-medium text-sand-500">mostly</span>
        <span className="text-sm font-medium text-sand-700">{topMood}</span>
      </div>
    </div>
  );
}

function MoodAreaChart({ timeline }: { timeline: MoodTimelineEntry[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (timeline.length === 0) return null;

  const padding = { top: 30, right: 20, bottom: 50, left: 40 };
  const width = 800;
  const height = 260;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxScore = 5;
  const minScore = 1;

  const points = timeline.map((entry, i) => {
    const x = padding.left + (i / Math.max(timeline.length - 1, 1)) * chartW;
    const y =
      padding.top +
      chartH -
      ((entry.score - minScore) / (maxScore - minScore)) * chartH;
    return { x, y, ...entry };
  });

  const linePath =
    points.length === 1
      ? `M ${points[0].x} ${points[0].y}`
      : points
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + chartH
  } L ${points[0].x} ${padding.top + chartH} Z`;

  const yLabels = [
    { score: 1, label: "😢" },
    { score: 2, label: "😟" },
    { score: 3, label: "😐" },
    { score: 4, label: "😊" },
    { score: 5, label: "🌟" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gridlines */}
        {yLabels.map(({ score, label }) => {
          const y =
            padding.top +
            chartH -
            ((score - minScore) / (maxScore - minScore)) * chartH;
          return (
            <g key={score}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={y + 5}
                textAnchor="end"
                className="text-sm"
                fill="#9ca3af"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={14}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === i ? 6 : 4}
              fill={moodHexColors[p.mood] || "#3b82f6"}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-150"
            />
            {hoveredIndex === i && (
              <g>
                <rect
                  x={p.x - 50}
                  y={p.y - 44}
                  width={100}
                  height={30}
                  rx={8}
                  fill="#1f2937"
                  opacity={0.9}
                />
                <text
                  x={p.x}
                  y={p.y - 25}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                >
                  {moodEmojis[p.mood]} {p.mood} ·{" "}
                  {new Date(p.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* X-axis labels */}
        {points
          .filter((_, i) => {
            const step = Math.max(1, Math.floor(points.length / 8));
            return i % step === 0 || i === points.length - 1;
          })
          .map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize="11"
            >
              {new Date(p.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </text>
          ))}
      </svg>
    </div>
  );
}
