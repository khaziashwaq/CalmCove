"use client";

import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import Link from "next/link";
import type { Story } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({
      delay: 1500,
    }),
  ]);
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

    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }

    fetchStories();
  }, [emblaApi]);

  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900 p-16" id="Stories">
        <div className="pb-20 max-w-screen-xl">
          <h1 className="md:text-4xl xl:text-4xl text-2xl font-bold text-center my-10">
            INSPIRING STORIES
          </h1>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-gray-900 p-16" id="Stories">
        <div className="pb-20 max-w-screen-xl">
          <h1 className="md:text-4xl xl:text-4xl text-2xl font-bold text-center my-10">
            INSPIRING STORIES
          </h1>
          <div className="text-center text-red-500">
            <p>Error loading stories: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 p-16" id="Stories">
      <div className="pb-20 max-w-screen-xl mx-auto">
        <h1 className="md:text-4xl xl:text-4xl text-2xl font-bold text-center my-10">
          INSPIRING STORIES
        </h1>
        <div className="embla w-[160vh] m-auto" ref={emblaRef}>
          <div className="embla__container" ref={emblaRef}>
            {stories.map((story) => (
              <Link href={`/stories/${story.id}`}>
                <div className="embla__slide m-4">
                  <TestimonialCard
                    key={story.id}
                    heading={story.title}
                    body={story.content.split("\n\n")[0]}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
