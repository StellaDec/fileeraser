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

// High-quality metadata for search engines and AI agents
export const metadata: Metadata = {
  title: "File Eraser Software — Secure Data Eraser & File Deletion Tool",
  description: "Looking for a reliable file eraser? D-Secure File Eraser is a certified software to permanently erase files beyond recovery. The ultimate data eraser for Windows & Mac.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  keywords: getKeywords(),
  openGraph: {
    title: "D-Secure File Eraser — Certified Data Erasure Software",
    description: "Permanently delete files, folders, and partition traces beyond forensic recovery with GDPR compliant file deletion.",
    url: getCanonicalUrl("/"),
    siteName: "D-Secure File Eraser",
    images: [
      {
        url: "https://dsecuretech.com/logo-white.svg",
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
    title: "D-Secure File Eraser — Certified Data Erasure Software",
    description: "Permanently delete files, folders, and partition traces beyond forensic recovery with NIST 800-88 compliance.",
    site: "@dsecuretech",
    images: ["https://dsecuretech.com/logo-white.svg"],
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
        "Secure File & Folder Shredding",
        "Partition & Volume Sanitization",
        "Free Space Erasure",
        "Tamper-proof Certificate Generation",
        "Cloud-based Admin Console & Group Policy support"
      ]
    }
  );
  
  const faqs = [
    {
      question: "How is D-Secure File Eraser different from simply deleting files?",
      answer: "When you delete a file normally, only the reference to the data is removed—the actual data remains on your drive and can be recovered with forensic tools. D-Secure File Eraser overwrites the data multiple times using internationally recognized algorithms (like NIST 800-88, DoD 5220.22-M), making recovery impossible."
    },
    {
      question: "What erasure standards does File Eraser support?",
      answer: "D-Secure File Eraser supports 27+ erasure standards including NIST 800-88 Clear/Purge, DoD 5220.22-M (3-pass and 7-pass), Gutmann (35-pass), HMG IS5, RCMP TSSIT OPS-II, Peter Gutmann's method, and many more."
    },
    {
      question: "Will I receive proof of erasure for compliance audits?",
      answer: "Absolutely. After every erasure operation, D-Secure generates a detailed PDF certificate that includes file details, erasure method used, timestamp, verification status, and a tamper-proof hash. These certificates are suitable for regulatory audits and compliance documentation."
    },
    {
      question: "How to securely delete files on Windows 10/11 beyond recovery?",
      answer: "To permanently delete files windows 10/11 beyond recovery, you need dedicated secure file deletion software. D-Secure File Eraser overwrites data at the sector level, making it the perfect secure delete tool for sensitive documents."
    },
    {
      question: "Is there a file shredder software free download or trial?",
      answer: "Yes, you can obtain the D-Secure file shredder software free download evaluation version to test its certified file erasure and data erasure software for files capabilities on your local storage devices."
    }
  ];
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbs = [
    { name: "Home", item: "https://dsecuretech.com" },
    { name: "Products", item: "https://dsecuretech.com/products" },
    { name: "File Eraser", item: "/" },
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
