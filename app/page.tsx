"use client";

import { useEffect } from "react";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Stories";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section === "stories") {
      const storiesElement = document.getElementById("Stories");
      if (storiesElement) {
        setTimeout(() => {
          storiesElement.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay to ensure the page is fully loaded
      }
    }
    if (section === "about") {
      const aboutElement = document.getElementById("About");
      if (aboutElement) {
        setTimeout(() => {
          aboutElement.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay to ensure the page is fully loaded
      }
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Testimonials />
    </main>
  );
}
