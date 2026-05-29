/**
 * SEO Core Utilities — FileEraser standalone site ke liye
 * Schema generators, metadata config, aur canonical URL helpers
 */

// Site ka base configuration — fileeraser.dsecuretech.com ke liye
export const SEO_CONFIG = {
  siteName: "File Eraser",
  siteUrl: "https://fileeraser.dsecuretech.com",
  parentSiteUrl: "https://dsecuretech.com",
  defaultImage: "https://dsecuretech.com/logo-white.svg",
  author: "D-Secure Tech",
  language: "en",
  locale: "en_US",
  twitterHandle: "@dsecuretech",
} as const;

// Canonical URL generate karo
export const getCanonicalUrl = (path: string = "/"): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};

// Keywords generate karne ke liye helper function jo custom keywords ya default high-quality SEO keywords list deta hai
export const getKeywords = (customKeywords?: string[]): string[] => {
  // Agar user ne custom keywords diye hain toh unhe return karo
  if (customKeywords && customKeywords.length > 0) {
    return customKeywords;
  }

  // Default rich keywords ki array jo SEO metrics ko boost karegi
  return [
    // --- Primary / Exact Match ---
    "file eraser",
    "file shredder",
    "file deleter",
    "file wiper",
    "file destroyer",
    "secure file eraser",
    "permanent file eraser",
    "file erasure software",
    "file shredder software",
    "file deletion software",
    "eraser",
    "Eraser",

    // --- Long-Tail / Intent Based ---
    "how to permanently delete files",
    "how to securely delete files windows",
    "how to shred files permanently",
    "delete files that cannot be recovered",
    "permanently delete files from hard drive",
    "securely erase files windows 10",
    "securely erase files windows 11",
    "how to wipe files beyond recovery",
    "erase files without recovery",
    "unrecoverable file deletion",

    // --- Standard / Compliance Based ---
    "NIST 800-88 file erasure",
    "DoD file shredder",
    "GDPR file deletion tool",
    "HIPAA compliant file eraser",
    "ISO 27001 file wiping",
    "certified file shredder software",
    "compliant file erasure tool",
    "data sanitization software",
    "data erasure compliance tool",

    // --- IT Admin / Enterprise ---
    "enterprise file eraser",
    "bulk file deletion tool",
    "remote file eraser software",
    "network file wiping tool",
    "endpoint file erasure software",
    "centralized file deletion software",
    "file erasure for IT teams",
    "file shredder for business",
    "corporate data deletion software",
    "active directory file eraser",

    // --- Storage Media Specific ---
    "HDD file eraser",
    "SSD file eraser",
    "NVMe file wiper",
    "USB file shredder",
    "external hard drive file eraser",
    "network drive file wiper",
    "file eraser for laptop",
    "file eraser for desktop",
    "file eraser for Windows",

    // --- Comparison / Alternatives ---
    "best file eraser software",
    "best file shredder windows",
    "top secure file deletion tools",
    "file eraser software free vs paid",
    "eraser software alternative",
    "better than recycle bin delete",
    "alternative to Eraser app",
    "BitRaser file eraser alternative",
    "Blancco file eraser alternative",
    "secure file delete tool comparison",

    // --- Recovery Prevention Angle ---
    "prevent file recovery",
    "stop file recovery software",
    "anti-forensic file deletion",
    "forensic file eraser",
    "file overwrite tool",
    "anti-recovery file wiper",
    "beyond recovery file delete",
    "file trace remover",
    "remove file metadata permanently",
    "wipe file slack space",

    // --- System Cleanup Related ---
    "free space wiper",
    "recycle bin shredder",
    "temp file eraser",
    "browser history eraser",
    "windows registry cleaner",
    "thumbnail cache wiper",
    "swap file eraser",
    "hibernation file wiper",
    "recent files cleaner",
    "disk cleanup and file shredder",

    // --- Audit / Reporting ---
    "file erasure certificate",
    "file deletion audit report",
    "erasure proof document",
    "tamper proof deletion log",
    "file wipe report generator",
    "GDPR deletion proof",
    "data destruction certificate",
    "secure erase verification report",

    // --- Scheduler / Automation ---
    "scheduled file eraser",
    "automatic file shredder",
    "on shutdown file eraser",
    "automated secure file deletion",
    "recurring file wipe tool",
    "silent background file eraser",

    // --- Vertical / Industry Specific ---
    "file eraser for healthcare",
    "file eraser for finance",
    "file eraser for government",
    "file eraser for law firms",
    "file eraser for IT asset disposal",
    "ITAD file wiping software",
    "file eraser for data centers",
    "file eraser for schools"
  ];
};

// Organization schema — Google Knowledge Panel ke liye
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SEO_CONFIG.parentSiteUrl}/#organization`,
 name: "File Eraser",
alternateName: [
  // --- Common User Terms ---
  "D-Secure File Eraser",
  "File Eraser",
  "File Shredder",
  "File Deleter",
  "File Remover",
  "File Wiper",
  "File Destroyer",
  "File Cleaner",
  "File Scrubber",
  "File Eliminator",
  "File Purger",

  // --- "Secure/Permanent" Variants ---
  "Secure File Eraser",
  "Secure File Deletion Tool",
  "Secure File Shredder",
  "Secure File Remover",
  "Secure File Wiper",
  "Permanent File Eraser",
  "Permanent File Deleter",
  "Permanent File Remover",
  "Permanent File Shredder",
  "Permanent File Destruction Tool",

  // --- "Data" Variants ---
  "Data File Eraser",
  "Data File Shredder",
  "Data File Wiper",
  "Data File Remover",
  "Data Destruction Tool",
  "Data Wiping Software",
  "Data Sanitization Tool",
  "Data Erasure Software",
  "Data Scrubbing Tool",
  "Data Purging Software",

  // --- Software/Tool/Utility Variants ---
  "File Erasure Software",
  "File Shredding Software",
  "File Deletion Software",
  "File Wiping Software",
  "File Shredding Tool",
  "File Deletion Tool",
  "File Wiping Tool",
  "File Erasure Tool",
  "File Sanitization Tool",
  "File Sanitization Software",

  // --- Compliance/Enterprise Terms ---
  "NIST 800-88 File Eraser",
  "GDPR File Deletion Tool",
  "HIPAA Compliant File Eraser",
  "Certified File Shredder",
  "Enterprise File Eraser",
  "Corporate File Deletion Software",
  "Compliance File Wiper",
  "Audit-Ready File Eraser",

  // --- Recovery Prevention Angle ---
  "Unrecoverable File Deletion Tool",
  "File Overwrite Tool",
  "Anti-Recovery File Eraser",
  "File Trace Remover",
  "Forensic File Eraser",
],
  url: SEO_CONFIG.parentSiteUrl,
  logo: {
    "@type": "ImageObject",
    "@id": `${SEO_CONFIG.parentSiteUrl}/#logo`,
    url: `${SEO_CONFIG.parentSiteUrl}/logo-white.svg`,
    contentUrl: `${SEO_CONFIG.parentSiteUrl}/logo-white.svg`,
    caption: "D-Secure Tech Logo",
  },
  description:
    "D-Secure provides NIST 800-88 compliant data erasure software. The modern alternative to tools like Blancco and BitRaser for secure enterprise sanitization.",
  slogan: "Certified Data Erasure for a Secure Future",
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "support@dsecuretech.com",
    url: `${SEO_CONFIG.parentSiteUrl}/contact`,
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: "Worldwide",
});

// WebSite schema — Sitelinks Search Box ke liye
export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "File Eraser",
  url: SEO_CONFIG.siteUrl,
  publisher: {
    "@type": "Organization",
    name: "File Eraser",
    url: SEO_CONFIG.parentSiteUrl,
  },
});

// SoftwareProduct schema — Product rich snippet ke liye
export const generateSoftwareProductSchema = (
  productName: string,
  description: string,
  options: {
    category?: string;
    subCategory?: string;
    os?: string;
    price?: string;
    currency?: string;
    ratingValue?: number;
    reviewCount?: number;
    features?: string[];
  } = {}
) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    additionalType: "https://schema.org/SoftwareApplication",
    name: productName,
    description: description,
    applicationCategory: options.category || "SecurityApplication",
    subCategory: options.subCategory || "Data Privacy & Security",
    operatingSystem: options.os || "Windows, Windows Server",
    sku: productName.toLowerCase().replace(/\s+/g, "-"),
    brand: {
      "@type": "Brand",
      name: "D-Secure",
      url: SEO_CONFIG.parentSiteUrl,
    },
    offers: {
      "@type": "Offer",
      price: options.price || "39.99",
      priceCurrency: options.currency || "USD",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.parentSiteUrl}/pricing-and-plan`, // main site pricing path ko accurate page path pe set kiya
      priceValidUntil: "2027-12-31",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
    },
    publisher: {
      "@type": "Organization",
      name: "D-Secure Tech",
      url: SEO_CONFIG.parentSiteUrl,
      logo: `${SEO_CONFIG.parentSiteUrl}/logo-white.svg`,
    },
    image: `${SEO_CONFIG.parentSiteUrl}/logo-white.svg`,
    softwareVersion: "2025.1.0",
    featureList: options.features || [
  // --- Core Erasure Features ---
  "Secure File Shredding",
  "Permanent File Deletion",
  "File Overwrite Technology",
  "Multi-Pass File Wiping",
  "Single File Erasure",
  "Batch File Erasure",
  "Folder Erasure",
  "Selective File Wiping",
  "Drag and Drop File Shredding",

  // --- Erasure Standards ---
  "DoD 5220.22-M Wiping Standard",
  "NIST SP 800-88 Compliant Erasure",
  "Gutmann 35-Pass Overwrite",
  "HMG IS5 Baseline and Enhanced",
  "VSITR Standard Support",
  "BSI/GOST Erasure Standards",
  "Custom Overwrite Pass Configuration",

  // --- Storage Media Support ---
  "HDD File Erasure",
  "SSD File Erasure",
  "NVMe File Erasure",
  "USB Drive File Wiping",
  "External Hard Drive Support",
  "Network Drive File Erasure",
  "Mapped Drive Support",

  // --- System Cleanup Features ---
  "Free Space Wiping",
  "Recycle Bin Sanitization",
  "Temporary File Cleaning",
  "Browser History Erasure",
  "Windows Registry Trace Removal",
  "Recent Files List Clearing",
  "Thumbnail Cache Wiping",
  "Swap File Erasure",
  "Hibernation File Wiping",

  // --- Reporting & Compliance ---
  "Erasure Audit Report Generation",
  "Tamper-Proof Erasure Certificate",
  "SHA-256 Report Verification",
  "GDPR Erasure Proof Documentation",
  "HIPAA Deletion Compliance Report",
  "ISO 27001 Erasure Logging",
  "Detailed Erasure Logs",
  "Export Report as PDF",

  // --- Automation & Scheduling ---
  "Automated Scheduler",
  "Scheduled File Wiping",
  "Recurring Erasure Tasks",
  "On-Shutdown File Erasure",
  "Event-Triggered File Deletion",
  "Silent Background Erasure",

  // --- Enterprise & Network ---
  "Centralized Network Support",
  "Remote File Erasure",
  "Active Directory Integration",
  "Multi-User License Support",
  "Enterprise Policy Enforcement",
  "Admin Console Management",
  "Bulk Erasure Deployment",
  "Endpoint File Erasure",

  // --- Security & Verification ---
  "Post-Erasure Verification",
  "Data Recovery Prevention",
  "Forensic-Level File Destruction",
  "Anti-Recovery Overwrite",
  "Zero Data Remnant Guarantee",
],
  };

  // Rating schema agar available hai
  if (options.ratingValue && options.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: options.ratingValue.toString(),
      reviewCount: options.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
};

// FAQ schema — SERP dropdown snippets ke liye
export const generateFAQSchema = (
  faqs: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Breadcrumb schema — Navigation trail ke liye
export const generateBreadcrumbSchema = (
  breadcrumbs: { name: string; item: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.item.startsWith("http")
      ? crumb.item
      : `${SEO_CONFIG.siteUrl}${crumb.item}`,
  })),
});
