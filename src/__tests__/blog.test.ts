import { describe, it, expect } from "vitest";
import { relatedBlogs, getReadTime } from "../lib/blog-data";
import { DSECURE_BASE_URL } from "../lib/constants";

// Blog system elements aur utilities ke liye unit tests - screenshot validation ke sath
describe("Blog Data & Utilities Tests", () => {
  
  // 1. relatedBlogs mapping check karne ke liye tests
  describe("relatedBlogs Array Structure", () => {
    it("should have exactly 4 related blogs on the landing page", () => {
      // Landing page pe exactly 4 high-value blogs hone chahiye
      expect(relatedBlogs).toHaveLength(4);
    });

    it("should have correct properties in each blog post object matching the screenshot", () => {
      // Har blog entry structural specifications ko satisfy karti hai
      relatedBlogs.forEach((blog) => {
        expect(blog.id).toBeDefined();
        expect(blog.title).toBeDefined();
        expect(blog.excerpt).toBeDefined();
        expect(blog.tag).toBeDefined();
        expect(blog.publishDate).toBeDefined();
        expect(blog.readTime).toBeDefined();
        expect(blog.link).toBeDefined();
        
        // Excerpt validation
        expect(blog.excerpt.length).toBeGreaterThan(10);
      });
    });

    it("should map links correctly to parent domain according to the screenshot", () => {
      // Sabhi blog cards dsecuretech.com ke actual live routes se match karne chahiye
      const expectedPaths = [
        `${DSECURE_BASE_URL}/blog/overwrite-guide`,
        `${DSECURE_BASE_URL}/blog/ssd-wipe-guide`,
        `${DSECURE_BASE_URL}/blog/data-deletion-myths`,
        `${DSECURE_BASE_URL}/blog/best-data-erasure-methods`
      ];

      relatedBlogs.forEach((blog, index) => {
        expect(blog.link).toBe(expectedPaths[index]);
      });
    });

    it("should match exact titles and tags from the screenshot", () => {
      const expectedBlogs = [
        { title: "Overwrite Standards: Beyond the Basics", tag: "DATA ERASURE" },
        { title: "Securely Erasing SSDs & NVMe Drives", tag: "STORAGE SECURITY" },
        { title: "Debunking 5 Critical Data Deletion Myths", tag: "SECURITY AWARENESS" },
        { title: "Best Data Erasure Methods for Storage Devices", tag: "CORE ERASURE" }
      ];

      relatedBlogs.forEach((blog, index) => {
        expect(blog.title).toBe(expectedBlogs[index].title);
        expect(blog.tag).toBe(expectedBlogs[index].tag);
      });
    });
  });

  // 2. getReadTime helper function check karne ke liye tests
  describe("getReadTime function", () => {
    it("should calculate correct read time for short texts", () => {
      const text = "This is a simple short description for testing read time calculation.";
      const time = getReadTime(text);
      expect(time).toBe("1 min read");
    });
  });
});
