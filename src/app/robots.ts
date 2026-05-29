import { MetadataRoute } from "next";

// Robots.txt configuration for search engines & AI crawlers
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://fileeraser.dsecuretech.com/sitemap.xml",
  };
}
