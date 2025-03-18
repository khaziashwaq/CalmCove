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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {error || "Story not found"}
          </h1>
          <a
            href="/?section=stories"
            className="text-blue-500 hover:underline mt-4 block"
          >
            Return to Stories
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/storyForm")}
            className="rounded-lg bg-blue-500 px-6 py-2.5 text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm md:text-base"
          >
            Share Your Story
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Story Header */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {story.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <span>{story.author}</span>
              <span className="mx-2">•</span>
              <span>
                {formatDistanceToNow(new Date(story.date), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Story Content */}
          <div className="px-6 py-4">
            <div className="prose max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Like Button */}
          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                hasLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{story?.likes || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="px-6 py-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
