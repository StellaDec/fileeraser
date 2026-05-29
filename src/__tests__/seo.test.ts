import { describe, it, expect } from "vitest";
import {
  getCanonicalUrl,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  getKeywords,
  SEO_CONFIG,
} from "../lib/seo";

// SEO utility functions ke liye unit tests
describe("SEO Core Utilities Tests", () => {
  
  // 1. Canonical URL Generator test
  describe("getCanonicalUrl", () => {
    it("should generate correct canonical URL with leading slash", () => {
      const url = getCanonicalUrl("/products");
      expect(url).toBe(`${SEO_CONFIG.siteUrl}/products`);
    });

    it("should generate correct canonical URL without leading slash", () => {
      const url = getCanonicalUrl("about");
      expect(url).toBe(`${SEO_CONFIG.siteUrl}/about`);
    });

    it("should fallback to root when no path is provided", () => {
      const url = getCanonicalUrl();
      expect(url).toBe(`${SEO_CONFIG.siteUrl}/`);
    });
  });

  // 2. Organization Schema Generator test
  describe("generateOrganizationSchema", () => {
    it("should return valid Organization schema structure", () => {
      const schema = generateOrganizationSchema();
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("File Eraser");
      expect(schema.url).toBe(SEO_CONFIG.parentSiteUrl);
      expect(schema.logo["@type"]).toBe("ImageObject");
    });
  });

  // 3. WebSite Schema Generator test
  describe("generateWebSiteSchema", () => {
    it("should return valid WebSite schema structure", () => {
      const schema = generateWebSiteSchema();
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.name).toBe("File Eraser");
      expect(schema.url).toBe(SEO_CONFIG.siteUrl);
    });
  });

  // 4. SoftwareProduct Schema Generator test
  describe("generateSoftwareProductSchema", () => {
    it("should return valid Product schema with default options", () => {
      const schema = generateSoftwareProductSchema(
        "File Eraser",
        "Secure file deletion tool"
      );
      
      expect(schema["@type"]).toBe("Product");
      expect(schema.name).toBe("File Eraser");
      expect(schema.description).toBe("Secure file deletion tool");
      expect(schema.sku).toBe("file-eraser");
      expect(schema.offers).toBeDefined();
      expect(schema.aggregateRating).toBeUndefined();
    });

    it("should include aggregateRating when rating options are provided", () => {
      const schema = generateSoftwareProductSchema(
        "File Eraser",
        "Secure file deletion tool",
        {
          ratingValue: 4.8,
          reviewCount: 150,
        }
      );
      
      expect(schema.aggregateRating).toBeDefined();
      // TypeScript safety - typecasting to access inner fields since return type is Record<string, unknown>
      const rating = schema.aggregateRating as { ratingValue: string; reviewCount: string };
      expect(rating.ratingValue).toBe("4.8");
      expect(rating.reviewCount).toBe("150");
    });
  });

  // 5. FAQ Schema Generator test
  describe("generateFAQSchema", () => {
    it("should construct valid FAQPage schema from array", () => {
      const faqs = [
        { question: "Q1?", answer: "A1." },
        { question: "Q2?", answer: "A2." },
      ];
      const schema = generateFAQSchema(faqs);
      
      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0]["@type"]).toBe("Question");
      expect(schema.mainEntity[0].name).toBe("Q1?");
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe("A1.");
    });
  });

  // 6. Breadcrumb Schema Generator test
  describe("generateBreadcrumbSchema", () => {
    it("should map breadcrumbs to ListItem array correctly", () => {
      const crumbs = [
        { name: "Home", item: "/" },
        { name: "Products", item: "/products" },
      ];
      const schema = generateBreadcrumbSchema(crumbs);
      
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0]["@type"]).toBe("ListItem");
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[0].name).toBe("Home");
      expect(schema.itemListElement[0].item).toBe(`${SEO_CONFIG.siteUrl}/`);
    });
  });

  // 7. Keywords Generator test — new getKeywords helper test
  describe("getKeywords", () => {
    // Default list test parameters
    it("should return the default list of secure file eraser keywords when no arguments are passed", () => {
      const keywords = getKeywords();
      // Verify karein ki standard list fetch ho rahi hai aur length minimum expected level pe hai
      expect(keywords).toBeDefined();
      expect(keywords.length).toBeGreaterThan(50);
      expect(keywords).toContain("file eraser");
      expect(keywords).toContain("file shredder");
      expect(keywords).toContain("NIST 800-88 file erasure");
    });

    // Custom keywords override parameters
    it("should return the custom keywords list when passed as arguments", () => {
      const customList = ["custom-eraser", "d-secure-pro-shredder"];
      const keywords = getKeywords(customList);
      // Verify karein ki custom keywords override override fully function kar raha hai
      expect(keywords).toEqual(customList);
      expect(keywords).not.toContain("file eraser");
    });
  });
});
