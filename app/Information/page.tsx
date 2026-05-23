"use client";

import React, { useState, useMemo } from "react";
import {
  whoMentalHealthTopics,
  MentalHealthTopic,
} from "@/data/whoMentalHealthTopics";


const categories = [
  "All",
  ...Array.from(new Set(whoMentalHealthTopics.map((t) => t.category))),
];

export default function Information() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return whoMentalHealthTopics.filter((topic) => {
      const matchesCategory =
        selectedCategory === "All" || topic.category === selectedCategory;
      if (!q) return matchesCategory;

      const matchesSearch =
        topic.title.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q) ||
        topic.category.toLowerCase().includes(q) ||
        topic.symptoms.some((s) => s.toLowerCase().includes(q)) ||
        topic.treatments.some((t) => t.toLowerCase().includes(q)) ||
        topic.keyFacts.some((f) => f.toLowerCase().includes(q)) ||
        topic.selfCare.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-3 py-8 sm:px-6 sm:py-12 lg:px-8 overflow-y-auto">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-sm font-medium tracking-widest uppercase text-sage-500 mb-3">
              Understanding together
            </p>
            <h1 className="text-3xl font-light text-sand-900 sm:text-4xl tracking-tight">
              Mental Health Information
            </h1>
            <p className="mt-3 text-sand-500 max-w-lg mx-auto text-sm leading-relaxed">
              Evidence-based information from the World Health Organization (WHO)
            </p>
          </div>

          {/* Search */}
          <div className="relative mx-auto mb-8 max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-sand-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search topics, symptoms, treatments..."
              className="block w-full rounded-2xl border border-sand-200 bg-white/60 backdrop-blur-sm py-3.5 pl-11 pr-4 text-sand-800 shadow-soft placeholder:text-sand-400 focus:border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-200/30 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-lavender-100 text-lavender-700 border border-lavender-200/60 shadow-glow"
                    : "bg-white/60 text-sand-600 border border-sand-200/40 hover:bg-sand-100 hover:border-sand-300/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchTerm && (
            <p className="mb-4 text-center text-sm text-sand-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          )}

          {/* Topic Cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isExpanded={expandedId === topic.id}
                  onToggle={() =>
                    setExpandedId(expandedId === topic.id ? null : topic.id)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="card-calm p-12 text-center max-w-md mx-auto">
              <p className="text-4xl">🔍</p>
              <h2 className="mt-4 text-xl font-light text-sand-800">
                Nothing found just yet
              </h2>
              <p className="mt-2 text-sand-500 text-sm leading-relaxed">
                Try a different search term or explore the categories above.
              </p>
            </div>
          )}

          {/* Source attribution */}
          <div className="mt-14 rounded-2xl bg-sage-50/60 border border-sage-200/40 p-5 text-center text-sm text-sage-700">
            <p>
              All information sourced from the{" "}
              <a
                href="https://www.who.int/health-topics/mental-health"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-sage-400/60 underline-offset-2"
              >
                World Health Organization (WHO)
              </a>{" "}
              fact sheets. This is for informational purposes only — please
              consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({
  topic,
  isExpanded,
  onToggle,
}: {
  topic: MentalHealthTopic;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex flex-col card-calm transition-all duration-300 ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Card Header */}
      <div className="p-7">
        <div className="mb-3 flex items-start justify-between">
          <span className="text-3xl">{topic.icon}</span>
          <span className="rounded-2xl bg-sand-100 border border-sand-200/40 px-3 py-1 text-xs font-medium text-sand-600">
            {topic.category}
          </span>
        </div>
        <h2 className="mb-2 text-xl font-medium text-sand-800">{topic.title}</h2>
        <p className="mb-4 text-sm leading-relaxed text-sand-600">
          {topic.description}
        </p>

        {/* Key Fact Preview */}
        {!isExpanded && topic.keyFacts[0] && (
          <div className="mb-4 rounded-2xl bg-lavender-50/60 border border-lavender-200/30 p-3">
            <p className="text-xs font-medium text-lavender-700">
              📊 {topic.keyFacts[0]}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="text-sm px-5 py-2 rounded-full bg-steel-500 text-white font-medium hover:bg-steel-600 transition-colors duration-200"
          >
            {isExpanded ? "Show Less" : "Learn More"}
          </button>
          <a
            href={topic.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2 rounded-full bg-steel-500 text-white font-medium hover:bg-steel-600 transition-colors duration-200"
          >
            WHO Source ↗
          </a>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-sand-200/30 px-7 pb-7 pt-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Key Facts */}
            <DetailSection title="Key Facts" icon="📊" color="lavender">
              {topic.keyFacts.map((fact, i) => (
                <li key={i} className="text-sm text-sand-600">
                  {fact}
                </li>
              ))}
            </DetailSection>

            {/* Symptoms */}
            <DetailSection title="Symptoms" icon="⚠️" color="cream">
              {topic.symptoms.map((s, i) => (
                <li key={i} className="text-sm text-sand-600">
                  {s}
                </li>
              ))}
            </DetailSection>

            {/* Treatments */}
            <DetailSection title="Treatments" icon="💊" color="sage">
              {topic.treatments.map((t, i) => (
                <li key={i} className="text-sm text-sand-600">
                  {t}
                </li>
              ))}
            </DetailSection>

            {/* Self-Care */}
            <DetailSection title="Self-Care" icon="🌱" color="rose">
              {topic.selfCare.map((s, i) => (
                <li key={i} className="text-sm text-sand-600">
                  {s}
                </li>
              ))}
            </DetailSection>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSection({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) {
  const bgColors: Record<string, string> = {
    lavender: "bg-lavender-50/60",
    cream: "bg-cream-50/60",
    sage: "bg-sage-50/60",
    rose: "bg-rose-50/60",
  };

  const textColors: Record<string, string> = {
    lavender: "text-lavender-700",
    cream: "text-cream-700",
    sage: "text-sage-700",
    rose: "text-rose-700",
  };

  return (
    <div>
      <h3
        className={`mb-2 flex items-center gap-1.5 text-sm font-medium ${
          textColors[color] || "text-sand-800"
        }`}
      >
        <span>{icon}</span> {title}
      </h3>
      <ul
        className={`list-inside list-disc space-y-1 rounded-2xl p-3 ${
          bgColors[color] || "bg-sand-50"
        }`}
      >
        {children}
      </ul>
    </div>
  );
}
