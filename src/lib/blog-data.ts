/**
 * Blog Data — Related Resources section ke liye
 * Sab links dsecuretech.com/blog pe point karenge (backlinks)
 */

import { DSECURE_BASE_URL } from "./constants";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  publishDate: string;
  readTime: string;
  link: string;
}

// D-Secure File Eraser page pe dikhne wale related blogs - screen shot ke anusar updated
export const relatedBlogs: BlogPost[] = [
  {
    id: "overwrite-standards-basics",
    title: "Overwrite Standards: Beyond the Basics",
    excerpt:
      "A deep dive into NIST 800-88 and DoD 5220.22-M standards. Meticulous analysis of overwrite methods and guidelines.",
    tag: "DATA ERASURE",
    publishDate: "February 17, 2026",
    readTime: "1 min read",
    link: `${DSECURE_BASE_URL}/blog/overwrite-guide`, // Screen shot content aur parent route
  },
  {
    id: "securely-erasing-ssds-nvme",
    title: "Securely Erasing SSDs & NVMe Drives",
    excerpt:
      "Why traditional wiping methods fail on SSDs. Exploring command-based erasure, cryptographic sanitization, and firmware protocols.",
    tag: "STORAGE SECURITY",
    publishDate: "March 11, 2026",
    readTime: "1 min read",
    link: `${DSECURE_BASE_URL}/blog/ssd-wipe-guide`, // Screen shot content aur parent route
  },
  {
    id: "debunking-data-deletion-myths",
    title: "Debunking 5 Critical Data Deletion Myths",
    excerpt:
      "Formatting is not erasure. We expose common misconceptions that leave organizations vulnerable to forensic recovery.",
    tag: "SECURITY AWARENESS",
    publishDate: "March 28, 2026",
    readTime: "1 min read",
    link: `${DSECURE_BASE_URL}/blog/data-deletion-myths`, // Screen shot content aur parent route
  },
  {
    id: "best-data-erasure-methods",
    title: "Best Data Erasure Methods for Storage Devices",
    excerpt:
      "One size does not fit all. Learn the correct erasure standard for HDDs, SSDs, and Mobile devices to ensure complete security.",
    tag: "CORE ERASURE",
    publishDate: "March 28, 2026",
    readTime: "1 min read",
    link: `${DSECURE_BASE_URL}/blog/best-data-erasure-methods`, // Screen shot content aur parent route
  },
];

// Read time calculate karo agar provided nahi hai
export const getReadTime = (text: string): string => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};
