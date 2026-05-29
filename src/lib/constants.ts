/**
 * Constants — External URLs, API endpoints, aur static data
 * Sab backlinks aur configuration ek jagah maintain karo
 */

// Parent site ka base URL — sab backlinks yahan point karenge
export const DSECURE_BASE_URL = "https://dsecuretech.com";

// API endpoints — same as dsecure-frontend
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.dsecuretech.com";
export const POWER_AUTOMATE_URL =
  process.env.NEXT_PUBLIC_POWER_AUTOMATE_HTTP_URL || "";

// Form submission — FormSubmit.co endpoint
export const FORMSUBMIT_URL =
  "https://formsubmit.co/support@dsecuretech.com";

// Demo iframe URL
export const DEMO_URL = "https://fileeraser-demo.dsecuretech.com/";

// Product links — dsecuretech.com pe backlinks ke liye
export const PRODUCT_LINKS = {
  "drive-eraser": {
    href: `${DSECURE_BASE_URL}/products/drive-eraser`,
    label: "Drive Eraser",
    description: "NIST 800-88 compliant HDD & SSD secure erasure",
    icon: "🗄️",
  },
  "drive-verifier": {
    href: `${DSECURE_BASE_URL}/products/drive-verifier`,
    label: "Drive Verifier",
    description: "Post-erasure verification — confirm zero data traces",
    icon: "✅",
  },
  "hardware-diagnostics": {
    href: `${DSECURE_BASE_URL}/products/hardware-diagnostics`,
    label: "Hardware Diagnostics",
    description: "50+ automated PC & server health tests",
    icon: "🔬",
  },
  "file-eraser": {
    href: `${DSECURE_BASE_URL}/products/file-eraser`,
    label: "File Eraser",
    description: "Secure file & folder shredding beyond Recycle Bin",
    icon: "📄",
  },
  "file-eraser-network": {
    href: `${DSECURE_BASE_URL}/products/file-eraser-network`,
    label: "File Eraser Network",
    description: "Centralized enterprise network data sanitization",
    icon: "🌐",
  },
  "smartphone-eraser": {
    href: `${DSECURE_BASE_URL}/products/smartphone-eraser`,
    label: "Smartphone Eraser",
    description: "Certified iOS & Android mobile data wipe",
    icon: "📱",
  },
  "smartphone-diagnostic": {
    href: `${DSECURE_BASE_URL}/products/smartphone-diagnostic`,
    label: "Smartphone Diagnostic",
    description: "60+ automated hardware tests for mobile devices",
    icon: "🔍",
  },
  "lun-eraser": {
    href: `${DSECURE_BASE_URL}/products/lun-eraser`,
    label: "LUN Eraser",
    description: "SAN & NAS active storage array sanitization",
    icon: "🏢",
  },
  "virtual-machine-eraser": {
    href: `${DSECURE_BASE_URL}/products/virtual-machine-eraser`,
    label: "VM Eraser",
    description: "VMware, Hyper-V & cloud VM data deletion",
    icon: "☁️",
  },
  "removable-media-eraser": {
    href: `${DSECURE_BASE_URL}/products/removable-media-eraser`,
    label: "Removable Media Eraser",
    description: "Secure USB, SD card & flash drive wiping",
    icon: "💾",
  },
  "forensic-imaging": {
    href: `${DSECURE_BASE_URL}/products/forensic-imaging`,
    label: "Forensic Imaging",
    description: "Bit-for-bit drive clone & evidence capture",
    icon: "🔎",
  },
  "freeze-state": {
    href: `${DSECURE_BASE_URL}/products/freeze-state`,
    label: "Freeze State",
    description: "Deep Freeze alternative for Windows workstations",
    icon: "🧊",
  },
  "data-migration": {
    href: `${DSECURE_BASE_URL}/products/data-migration`,
    label: "Data Migration",
    description: "Secure bit-perfect file transfer & system migration",
    icon: "🔄",
  },
  "asset-reimaging": {
    href: `${DSECURE_BASE_URL}/products/asset-reimaging`,
    label: "Asset Reimaging",
    description: "Zero-touch OS deployment to hundreds of devices",
    icon: "🖥️",
  },
  "hard-drive-monitor": {
    href: `${DSECURE_BASE_URL}/products/hard-drive-monitor`,
    label: "Hard Drive Monitor",
    description: "S.M.A.R.T. health tracking & bad sector detection",
    icon: "📊",
  },
} as const;

// Gallery images — Cloudinary hosted
export const GALLERY_IMAGES = [
  {
    url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770725346/file-eraser-main.webp",
    alt: "D-Secure File Eraser — Main Dashboard Interface",
    caption: "Main Dashboard",
  },
  {
    url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770725346/file-eraser-shredding.webp",
    alt: "D-Secure File Eraser — File Shredding in Progress",
    caption: "Secure Shredding",
  },
  {
    url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770725346/file-eraser-certificate.webp",
    alt: "D-Secure File Eraser — Tamper-proof Erasure Certificate",
    caption: "Audit Certificate",
  },
] as const;

// Video URL
export const VIDEO_URL =
  "https://res.cloudinary.com/dhwi5wevf/video/upload/f_auto,q_auto/v1770725346/jqkinwc7zk4w2ak9nplw.3gp";

// Navigation links — Header ke liye (parent site ke nav structure se match karta hai)
// dropdown: true wale items mega menu ke saath render honge
export const NAV_LINKS = [
  { label: "Products", href: `${DSECURE_BASE_URL}/products`, external: true, dropdown: true },
  { label: "Solutions", href: `${DSECURE_BASE_URL}/solutions`, external: true, dropdown: true },
  { label: "Resources & Blogs", href: `${DSECURE_BASE_URL}/blog`, external: true, dropdown: false },
  { label: "Partners", href: `${DSECURE_BASE_URL}/partners`, external: true, dropdown: false },
  { label: "Trust Certificate", href: `${DSECURE_BASE_URL}/data-guardian-award`, external: true, dropdown: false },
  { label: "Support", href: `${DSECURE_BASE_URL}/contact`, external: true, dropdown: false },
] as const;

// Footer links — image reference ke mutaabiq 4 columns
export const FOOTER_PRODUCT_LINKS = [
  { label: "All Products", href: `${DSECURE_BASE_URL}/products` },
  { label: "Drive Eraser", href: `${DSECURE_BASE_URL}/products/drive-eraser` },
  { label: "Drive Eraser Diagnostic", href: `${DSECURE_BASE_URL}/products/drive-eraser-diagnostic` },
  { label: "File Eraser", href: `${DSECURE_BASE_URL}/products/file-eraser` },
] as const;

export const FOOTER_INDUSTRY_LINKS = [
  { label: "All Industries", href: `${DSECURE_BASE_URL}/solutions` },
  { label: "Healthcare", href: `${DSECURE_BASE_URL}/solutions/healthcare` },
  { label: "Banking & Finance", href: `${DSECURE_BASE_URL}/solutions/data-erasure-banking-finance` },
  { label: "Government", href: `${DSECURE_BASE_URL}/solutions/government` },
  { label: "Education", href: `${DSECURE_BASE_URL}/solutions/education` },
  { label: "Non-Profit", href: `${DSECURE_BASE_URL}/solutions/non-profit` },
] as const;

export const FOOTER_RESOURCE_LINKS = [
  { label: "Documentation", href: `${DSECURE_BASE_URL}/docs` },
  { label: "Compliance", href: `${DSECURE_BASE_URL}/compliance` },
  { label: "Blog", href: `${DSECURE_BASE_URL}/blog` },
  { label: "Case Studies", href: `${DSECURE_BASE_URL}/case-studies` },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About Us", href: `${DSECURE_BASE_URL}/about` },
  { label: "Contact", href: `${DSECURE_BASE_URL}/contact` },
  { label: "Company Profile", href: `${DSECURE_BASE_URL}/company-profile`, external: true },
  { label: "Partners", href: `${DSECURE_BASE_URL}/partners` },
] as const;

// Bottom bar ke policy links
export const FOOTER_POLICY_LINKS = [
  { label: "Privacy Policy", href: `${DSECURE_BASE_URL}/privacy-policy` },
  { label: "Legal Policy", href: `${DSECURE_BASE_URL}/legal-policy` },
  { label: "Terms of Service", href: `${DSECURE_BASE_URL}/terms-of-service` },
  { label: "Cookie Policy", href: `${DSECURE_BASE_URL}/cookie-policy` },
  { label: "Security", href: `${DSECURE_BASE_URL}/security` },
  { label: "Status", href: `${DSECURE_BASE_URL}/status` },
] as const;

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com/dsecuretech", icon: "𝕏" },
  { label: "LinkedIn", href: "https://linkedin.com/company/dsecuretech", icon: "in" },
  { label: "GitHub", href: "https://github.com/dsecuretech", icon: "GH" },
  { label: "YouTube", href: "https://youtube.com/dsecuretech", icon: "▶" },
] as const;
