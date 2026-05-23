"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import type { Story, Comment } from "@/types";
import { User } from "@/components/UserIcon";
import { auth, googleLogin } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function StoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;

  const [story, setStory] = useState<Story | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Check if user has liked the story
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user && story) {
        try {
          const response = await fetch(
            `/api/stories/${storyId}/likes?userId=${user.uid}`
          );
          const data = await response.json();
          if (response.ok) {
            setHasLiked(data.liked);
          }
        } catch (err) {
          console.error("Error checking like status:", err);
        }
      }
    };
    checkLikeStatus();
  }, [user, story, storyId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${storyId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch story");
        }

        setStory(data);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Error fetching story:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    console.log("Current user state:", {
      displayName: user?.displayName,
      email: user?.email,
      user: user,
    });

    try {
      const commentData = {
        content: newComment,
        userName: user?.displayName || null,
        userEmail: user?.email || null,
      };

      console.log("Sending comment data:", commentData);

      const response = await fetch(`/api/stories/${storyId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to add comment");
      }

      setComments([data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleLike = async () => {
    if (!story || !user) {
      alert("Please sign in to like stories");
      return;
    }

    try {
      const response = await fetch(`/api/stories/${storyId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update like");
      }

      setHasLiked(data.liked);
      setStory((prev) =>
        prev
          ? {
              ...prev,
              likes: prev.likes + (data.liked ? 1 : -1),
            }
          : null
      );
    } catch (err) {
      console.error("Error updating like:", err);
      alert("Failed to update like. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-breathe rounded-full h-12 w-12 border-2 border-lavender-300 flex items-center justify-center mx-auto">
            <div className="h-6 w-6 rounded-full bg-lavender-200/60" />
          </div>
          <p className="mt-4 text-sand-500 text-sm">Finding this story for you...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center card-calm p-12 max-w-md">
          <p className="text-3xl mb-4">🍂</p>
          <h1 className="text-xl font-light text-sand-800 mb-2">
            {error || "This story has drifted away"}
          </h1>
          <a
            href="/?section=stories"
            className="text-lavender-500 hover:text-lavender-600 text-sm font-medium transition-colors"
          >
            Return to Stories
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.push("/storyForm")}
            className="btn-primary text-sm rounded-2xl"
          >
            Share Your Story
          </button>
        </div>
        <div className="card-calm overflow-hidden">
          {/* Story Header */}
          <div className="p-5 sm:p-8 pb-4">
            <h1 className="text-2xl sm:text-3xl font-light text-sand-900 mb-3 leading-snug">
              {story.title}
            </h1>
            <div className="flex items-center text-sand-500 text-sm">
              <span className="font-medium text-sand-600">{story.author}</span>
              <span className="mx-2 text-sand-300">·</span>
              <span>
                {formatDistanceToNow(new Date(story.date), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Story Content */}
          <div className="px-5 sm:px-8 py-4 sm:py-6">
            <div className="prose max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-5 text-sand-700 leading-relaxed text-[0.95rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Like Button */}
          <div className="px-5 sm:px-8 py-4 border-t border-sand-200/40">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                hasLiked
                  ? "text-rose-400 hover:text-rose-500"
                  : "text-sand-400 hover:text-rose-400"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{story?.likes || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="px-5 sm:px-8 py-4 sm:py-6 border-t border-sand-200/40">
            <h2 className="text-lg font-medium text-sand-800 mb-5">
              Thoughts & Reflections
            </h2>

            {/* Add Comment */}
            <div className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts gently..."
                className="input-calm min-h-[100px] resize-none"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="btn-warm mt-3 text-sm rounded-2xl"
              >
                Share Thought
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-sand-200/30 pb-5 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sand-700 text-sm">{comment.author}</span>
                    <span className="text-xs text-sand-400">
                      {formatDistanceToNow(new Date(comment.date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sand-600 text-sm leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
