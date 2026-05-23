"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import ScribbleButton from "@/components/ScribbleButton";

export default function StoryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handlePostStory = async () => {
    if (!user) {
      alert("Please sign in to post a story");
      router.push("/signIn");
      return;
    }

    try {
      const storyData = {
        title: title,
        content: content,
        userName: user.displayName,
        userEmail: user.email,
      };

      console.log("Posting story with user data:", {
        displayName: user.displayName,
        email: user.email,
      });

      const response = await fetch("/api/stories", {
        method: "POST",
        body: JSON.stringify(storyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        router.push(`/stories/${data.id}`);
      }
    } catch (error) {
      console.error("Error posting story:", error);
      alert("Failed to post story. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <FadeIn>
          <div className="card-calm p-12 text-center max-w-md">
            <p className="text-3xl mb-4">🌿</p>
            <p className="text-sand-600 leading-relaxed">
              Sign in to share your story with the community. Every voice matters here.
            </p>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 py-8 sm:py-12">
      <FadeIn>
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-lavender-500 mb-2">
              Share your experience
            </p>
            <h1 className="text-2xl font-light text-sand-800">
              Your story could be someone&apos;s comfort
            </h1>
          </div>

          <div className="card-calm p-8 space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a title..."
              className="w-full border-none bg-transparent text-xl font-medium text-sand-800 placeholder:text-sand-400 focus:outline-none focus:ring-0 transition-all"
              autoFocus
            />
            <div className="h-px bg-sand-200/40" />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story... Take your time, there's no rush."
              className="w-full border-none bg-transparent h-80 resize-none text-sand-700 placeholder:text-sand-400 focus:outline-none focus:ring-0 leading-relaxed"
            />
          </div>

          <div className="flex justify-end mt-6">
            <ScribbleButton onClick={handlePostStory} className="px-8 py-3">
              Share Story
            </ScribbleButton>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
