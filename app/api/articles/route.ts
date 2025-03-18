import { NextResponse } from "next/server";

const API_KEY = "9272a5b25a964c8eb310e68bd207f759";

export async function GET() {
  try {
    const url = `https://newsapi.org/v2/everything?q=mental+health&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response was not JSON");
    }

    const data = await response.json();

    if (!data || !data.articles) {
      throw new Error("Invalid response format from News API");
    }

    // Transform the articles to match our format
    const articles = data.articles.map((article: any, index: number) => ({
      id: index + 1,
      title: article.title || "No Title",
      description: article.description || "No description available",
      link: article.url || "#",
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error("API Error:", error);
    // Return a more detailed error message
    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
