import { MetadataRoute } from "next";

// Robots.txt configuration — Search engines aur AI crawlers ke liye
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // --- Standard search engines ---
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/_next/"],
      },
      // --- OpenAI GPTBot ---
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- ChatGPT User plugin ---
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- Anthropic Claude ---
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- Google Gemini / Bard ---
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- Perplexity AI ---
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- Meta AI ---
      {
        userAgent: "FacebookBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      // --- Cohere ---
      {
        userAgent: "cohere-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: "https://fileeraser.dsecuretech.com/sitemap.xml",
  };
}
