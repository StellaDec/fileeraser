import { MetadataRoute } from "next";

// Sitemap configuration for FileEraser standalone site
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fileeraser.dsecuretech.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
