"use client";

import React, { useState } from "react";
import ArticleCard from "@/components/ArticleCard";

export default function Information() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Understanding Anxiety",
      description:
        "Learn about the different types of anxiety and how to manage them effectively.",
      link: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Stress Management",
      description:
        "Discover practical techniques for managing stress in your daily life.",
      link: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Mindfulness Practices",
      description:
        "Explore mindfulness techniques to improve your mental well-being.",
      link: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Mental Health Articles",
      description: "Mental health articles",
      link: "https://via.placeholder.com/150",
    },
  ]);

  const fetchArticles = async (searchTerm: string) => {
    const response = await fetch(`/api/articles?query=${searchTerm}`);
    const data = await response.json();
    console.log(data);
    setArticles(data || []);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-fit">
      <div className="relative max-w-xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
          onChange={(e) => fetchArticles(e.target.value)}
          type="text"
          placeholder="Search mental health topics..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900 bg-white transition-all duration-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
}
