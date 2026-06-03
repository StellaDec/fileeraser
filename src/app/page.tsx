import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FileEraserPage from "@/components/FileEraserPage";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  getCanonicalUrl,
  getKeywords,
} from "@/lib/seo";
import { faqs } from "@/lib/faq-data";

// High-quality metadata for search engines and AI agents
export const metadata: Metadata = {
  title: "File Eraser Software — How to Permanently Delete Files Beyond Recovery | D-Secure",
  description: "Understand why pressing Delete doesn't erase your data. D-Secure File Eraser overwrites files at the sector level using NIST 800-88, DoD 5220.22-M and 25+ other standards — making recovery impossible.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  keywords: getKeywords(),
  openGraph: {
    title: "File Eraser vs Delete vs Format — What Actually Destroys Your Data?",
    description: "Learn how file erasure works at the storage level and why standard deletion leaves your sensitive data fully recoverable.",
    url: getCanonicalUrl("/"),
    siteName: "D-Secure File Eraser",
    images: [
      {
        url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1780378791/dmwbyiicwpmfelcsdufl.png",
        width: 1200,
        height: 630,
        alt: "D-Secure File Eraser Data Sanitization Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "File Eraser vs Delete vs Format — What Actually Destroys Your Data?",
    description: "Learn how file erasure works at the storage level and why standard deletion leaves your sensitive data fully recoverable.",
    site: "@dsecuretech",
    images: ["https://res.cloudinary.com/dhwi5wevf/image/upload/v1780378791/dmwbyiicwpmfelcsdufl.png"],
  },
};

export default function Home() {
  // Generate all schema models
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const productSchema = generateSoftwareProductSchema(
    "D-Secure File Eraser",
    "Certified data erasure software featuring 27+ international sanitization standards (NIST 800-88, DoD 5220.22-M) with digital certificates of destruction.",
    {
      price: "39.99",
      ratingValue: 4.9,
      reviewCount: 312,
      features: [
        "Secure File & Folder Erasure",
        "Partition & Volume Sanitization",
        "Free Space Erasure",
        "Tamper-proof Certificate Generation",
        "Cloud-based Admin Console & Group Policy support"
      ],
      image: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1780378791/dmwbyiicwpmfelcsdufl.png"
    }
  );
  
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbs = [
    { name: "Home", item: "https://dsecuretech.com" },
    { name: "Products", item: "https://dsecuretech.com/products" },
    { name: "D-Secure File Eraser", item: "/" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* Schema.org JSON-LD scripts for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <main className="flex-grow">
        <FileEraserPage />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
