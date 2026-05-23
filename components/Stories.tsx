"use client";

import { useState, useEffect, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";
import Link from "next/link";
import type { Story } from "@/types";
import { FadeInView } from "@/components/animations";
import { motion } from "framer-motion";

const TOPIC_KEYWORDS: Record<string, string[]> = {
  anxiety: ["anxiety", "anxious", "panic", "nervous", "worry", "worried", "fear", "restless"],
  depression: ["depression", "depressed", "sad", "hopeless", "empty", "numb", "worthless"],
  ocd: ["ocd", "obsessive", "compulsive", "intrusive thoughts", "rituals", "contamination"],
  ptsd: ["ptsd", "trauma", "flashback", "nightmares", "hypervigilance", "triggered"],
  bipolar: ["bipolar", "manic", "mania", "hypomania", "mood swings"],
  adhd: ["adhd", "attention", "hyperactive", "impulsive", "focus", "distracted"],
  "eating disorder": ["anorexia", "bulimia", "binge", "eating disorder", "body image", "purge"],
  "self-harm": ["self-harm", "self harm", "cutting", "hurt myself"],
  addiction: ["addiction", "addict", "substance", "alcohol", "sober", "relapse", "recovery"],
  loneliness: ["lonely", "loneliness", "isolated", "alone", "no friends"],
  grief: ["grief", "loss", "mourning", "death", "passed away", "bereaved"],
  "social anxiety": ["social anxiety", "social phobia", "embarrassed", "judged", "awkward"],
  stress: ["stress", "stressed", "burnout", "overwhelmed", "pressure", "exhausted"],
  "body dysmorphia": ["body dysmorphia", "ugly", "appearance", "mirror", "look wrong"],
  insomnia: ["insomnia", "sleep", "sleepless", "can't sleep", "awake at night"],
};

function getStoryTags(story: Story): string[] {
  const text = `${story.title} ${story.content}`.toLowerCase();
  const tags: string[] = [];
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      tags.push(topic);
    }
  }
  return tags;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/stories");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch stories");
        }

        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const taggedStories = useMemo(() => {
    return stories.map((story) => ({
      ...story,
      tags: getStoryTags(story),
    }));
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return taggedStories;
    const query = searchQuery.toLowerCase().trim();
    return taggedStories.filter(
      (story) =>
        story.tags.some((tag) => tag.includes(query)) ||
        story.title.toLowerCase().includes(query) ||
        story.content.toLowerCase().includes(query)
    );
  }, [taggedStories, searchQuery]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    taggedStories.forEach((story) => story.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [taggedStories]);

  if (loading) {
    return (
      <section className="px-6 py-24 h-full overflow-y-auto" id="Stories">
        <div className="pb-20 max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
              Community
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-sand-900 tracking-tight">
              Stories of courage
            </h2>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-breathe rounded-full h-12 w-12 border-2 border-rose-300 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-rose-200/60" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-24 h-full overflow-y-auto" id="Stories">
        <div className="pb-20 max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
              Community
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-sand-900 tracking-tight">
              Stories of courage
            </h2>
          </div>
          <div className="text-center card-calm p-12 max-w-md mx-auto">
            <p className="text-3xl mb-3">🌧️</p>
            <p className="text-sand-600">
              We couldn&apos;t load the stories right now. Take a deep breath — we&apos;ll try again soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 h-full overflow-y-auto" id="Stories">
      <div className="pb-20 max-w-screen-xl mx-auto">
        <FadeInView>
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
              Community
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-sand-900 tracking-tight">
              Stories of courage
            </h2>
            <p className="mt-4 text-sand-500 max-w-lg mx-auto text-sm leading-relaxed">
              Real voices, real experiences. Every story here is a reminder that you&apos;re not alone.
            </p>
          </div>
        </FadeInView>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by topic (e.g. anxiety, ocd, grief...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-calm w-full"
          />
        </div>

        {/* Tag pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  searchQuery === tag
                    ? "bg-steel-500 text-white"
                    : "bg-sand-100 text-sand-600 hover:bg-steel-100 hover:text-steel-700"
                }`}
              >
                {tag}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all duration-200"
              >
                clear
              </button>
            )}
          </div>
        )}

        {/* Stories grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sand-500 text-sm">No stories found for &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {filteredStories.map((story) => (
              <Link href={`/stories/${story.id}`} key={story.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestimonialCard
                    heading={story.title}
                    body={story.content.split("\n\n")[0]}
                  />
                  {story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 px-1">
                      {story.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-steel-50 text-steel-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Stories;
