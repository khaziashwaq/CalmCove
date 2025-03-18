"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Please sign in to share your story</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden scrollbar-hide">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-1/2 border-none mb-4 rounded-md text-lg focus:text-xl transition-all mt-16"
        autoFocus
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tell your story..."
        className="w-1/2 border-none h-96 resize-none rounded-md"
      />
      <div className="w-1/2 flex justify-end mt-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handlePostStory}
        >
          Post
        </button>
      </div>
    </div>
  );
}
