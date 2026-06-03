"use client";

// FileEraserPage — Next.js ke liye adapted client component
import React, { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";

import Reveal from "@/components/Reveal";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  ServerIcon,
} from "@/components/FlatIcons";
import { relatedBlogs, getReadTime } from "@/lib/blog-data";
import { FileTextIcon, Monitor, Download, X } from "lucide-react";
import { useToast } from "@/components/Toast";
import { DSECURE_BASE_URL, API_BASE_URL, POWER_AUTOMATE_URL } from "@/lib/constants";
import { faqs } from "@/lib/faq-data";




const FileEraserPage: React.FC = memo(function FileEraserPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    businessType: "",
    endpoints: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const demoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } else if (demoContainerRef.current?.requestFullscreen) {
        await demoContainerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Gallery images array for lightbox navigation
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png",
      alt: "Dashboard View",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/ot4kpilynrfgw9vuzrbf.png",
      alt: "Erasure Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ctujrrfv3h1visi1jrvz.png",
      alt: "File Selection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ykhnzzsbwdeuncs9uvem.png",
      alt: "Erasure Progress",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/bjklx7nvvam1m2h122zo.png",
      alt: "D-Secure File Eraser Screenshot 5",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/lxs0usvvneldpij0dqwo.png",
      alt: "D-Secure File Eraser Screenshot 6",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/oax8dj4tw1pitsbnbr31.png",
      alt: "D-Secure File Eraser Screenshot 7",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/cninfubwl4z6u9bhoi3f.png",
      alt: "D-Secure File Eraser Screenshot 8",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/dns8j5kip5vxyczqoipe.png",
      alt: "D-Secure File Eraser Screenshot 9",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/k6uywfbzsktkrdzmojnm.png",
      alt: "D-Secure File Eraser Screenshot 10",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/lsjiymvrj0x7jmgempbe.png",
      alt: "D-Secure File Eraser Screenshot 11",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/ndoby2cwwxxsngynqp5e.png",
      alt: "D-Secure File Eraser Screenshot 12",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/slvfga3d5nx66jv7uxug.png",
      alt: "D-Secure File Eraser Screenshot 13",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/fpnm8lqq46ftsw0ny0ca.png",
      alt: "D-Secure File Eraser Screenshot 14",
    },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/vytjbf7yigyyo6nc5qhv.png",
    //   alt: "D-Secure File Eraser Screenshot 15",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mu4inz3sickwxfbtduzn.png",
    //   alt: "D-Secure File Eraser Screenshot 16",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/smkmqfqk7dw0xwmfl4xa.png",
    //   alt: "D-Secure File Eraser Screenshot 17",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/trcabsasqpewodfyrykl.png",
    //   alt: "D-Secure File Eraser Screenshot 18",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qnl0maavgwb12eyx9drx.png",
    //   alt: "D-Secure File Eraser Screenshot 19",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/y20i3mvvbzzddrzjnunf.png",
    //   alt: "D-Secure File Eraser Screenshot 20",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/g59dppsz6gyjm10rf5lo.png",
    //   alt: "D-Secure File Eraser Screenshot 21",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mx6or4o6uenf3q42ipqg.png",
    //   alt: "D-Secure File Eraser Screenshot 22",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/bj1yo6ykwgxvkp9bbmlm.png",
    //   alt: "D-Secure File Eraser Screenshot 23",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/iuvskkxwxsawnvvk8i4l.png",
    //   alt: "D-Secure File Eraser Screenshot 24",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/nalxxlyfrewjxtpptplf.png",
    //   alt: "D-Secure File Eraser Screenshot 25",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qxrifgrivw11cqhuegx0.png",
    //   alt: "D-Secure File Eraser Screenshot 26",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/pb9yo6kfjwz8z4shw2vz.png",
    //   alt: "D-Secure File Eraser Screenshot 27",
    // },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1778233927/r3mpk0vohwxanxppbchv.png",
      alt: "Tamper-proof Erasure Report",
    },
  ];

  // Number of additional images beyond the 4th card (for "More" badge)
  const additionalImagesCount = galleryImages.length - 4;

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex]);

  const sectionNavItems = [
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "erase-types", label: "Erase Types" },
    { id: "compliance", label: "Compliance" },
    { id: "use-cases", label: "Use Cases" },
    // { id: "blogs", label: "Blogs" }, // Temporarily disabled
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isDesktop = globalThis.innerWidth >= 1024; // lg breakpoint in Tailwind
      const shouldShow = scrollPosition > 400;

      // Secondary navbar ko sirf desktop mode mein show karo
      setIsNavVisible(isDesktop && shouldShow);

      // Main navbar ko desktop mode mein hide karo (visible: true), 
      // aur mobile/tablet mein SHOW rakho (visible: false) jab secondary hide ho.
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: isDesktop ? shouldShow : false },
        }),
      );

      // Find current active section
      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      // Unmount hone par main navbar visibility reset karo
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const eraseTypes = [
    {
      name: "Sector-Level File Erasure",
      desc: "Overwrites exact disk sectors occupied by target files using selectable algorithms — from single-pass NIST Clear to 35-pass Gutmann. No full-disk wipe required; surrounding data remains intact.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Unallocated Space & MFT Cleanup",
      desc: "Scans and overwrites unallocated clusters, MFT entries, and $MFT slack space to prevent file-carving attacks. Eliminates ghost data that persists after standard Recycle Bin deletion.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      color: "from-red-500 to-red-600",
    },
    {
      name: "Cloud Cache & Sync Destruction",
      desc: "Targets locally cached sync copies from Google Drive, OneDrive, and Dropbox. Clears versioned file histories and thumbnail databases that standard uninstall procedures leave behind.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Network Share & SMB Erasure",
      desc: "Connects to mapped network drives and UNC paths to destroy files on remote SMB/CIFS shares. Supports credential-based authentication for enterprise NAS and file server environments.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Archive & Container Sanitization",
      desc: "Penetrates ZIP, TAR, ISO, and VHD containers to individually shred enclosed files before destroying the archive itself. Handles nested archives and password-protected containers.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Full Volume Sterilization",
      desc: "Overwrites entire volumes including slack space, boot sectors, and partition tables. Essential for ITAD workflows where drives must be certified clean before reassignment or disposal.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 14l6-6m-3 6V8a2 2 0 012-2h6a2 2 0 012 2v6m2 4H7a2 2 0 01-2-2v-2a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
    },
  ];

  const platforms = [
    {
      name: "Windows",
      versions: "Windows 10, 11, Server 2016+ etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "macOS",
      versions: "Monterey, Ventura, Sonoma, Sequoia etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Linux",
      versions: "Ubuntu, CentOS, Debian, RHEL etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.072-.2-.052-.334.033-.466.204-.263.466-.399.795-.528.396-.2.762-.269 1.139-.268h.13zm4.006 2.933c-.009.04-.009.037-.012.071-.075.443-.134.8-.166 1.2-.028.332-.043.663-.044.998l.003.467.004.073.009.135.003.2.016.267c.09.333.15.6.313.8.082.103.17.2.27.27.136.07.272.135.41.135.074 0 .15-.015.223-.04.31-.112.48-.332.618-.59.109-.202.17-.403.217-.598.04-.195.067-.39.08-.545.031-.4.049-.664.049-.664l-.003-.402-.01-.267-.014-.202c-.012-.133-.03-.266-.053-.397v-.003L13 9.4v-.003l-.048-.2h.003l.025.003c-.038-.007-.077-.01-.116-.02-.062-.01-.124-.029-.184-.04z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "27+ Sanitization Algorithms",
      desc: "Select from NIST Clear/Purge, DoD 5220.22-M (3-pass, 7-pass), Gutmann 35-pass, HMG IS5 Enhanced, and RCMP TSSIT OPS-II. Each mapped to specific threat models for compliance-driven deployments.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "CLI & Headless Mode",
      desc: "Run erasure tasks via command-line interface without GUI dependencies. Supports batch scripting, PowerShell integration, and silent execution for automated deployment pipelines.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: "REST API Integration",
      desc: "Trigger erasure jobs programmatically via authenticated REST endpoints. Supports webhook callbacks, JSON status payloads, and integration with SIEM platforms like Splunk and QRadar.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Task Scheduler & GPO Hooks",
      desc: "Configure recurring wipe jobs via Windows Task Scheduler, cron, or Group Policy Objects. Event-triggered erasure on logoff, shutdown, or domain-policy push.",
      icon: <GearIcon className="w-6 h-6" />,
    },
    {
      title: "NTFS ADS & VSS Clearing",
      desc: "Detects and destroys NTFS Alternate Data Streams, Volume Shadow Copies, and $UsnJrnl entries that standard deletion tools leave completely untouched.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      ),
    },
    {
      title: "SHA-256 Signed Certificates",
      desc: "Each erasure generates a digitally signed PDF containing file hash, algorithm used, pass count, operator ID, and UTC timestamp — cryptographically tamper-evident for audit chains.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "MSI/PKG Silent Deployment",
      desc: "Deploy via MSI (Windows), PKG (macOS), or DEB/RPM (Linux) with zero user interaction. Supports SCCM, Intune, Jamf, and Ansible push deployment workflows.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "WORM-Compliant Audit Logs",
      desc: "Write-Once-Read-Many log architecture ensures erasure records cannot be modified or deleted post-creation — meeting SEC Rule 17a-4 and FINRA retention requirements.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      title: "Pre-Erasure AES-256 Encryption",
      desc: "AES-256-CBC encryption applied before overwrite begins. If erasure is interrupted mid-process, data remains cryptographically inaccessible — zero cleartext exposure window.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Centralized Telemetry Dashboard",
      desc: "Real-time monitoring of erasure progress across all endpoints. Filter by asset tag, operator, erasure standard, or completion status — exportable to CSV/SIEM.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      title: "Endpoint Decommissioning & ITAD",
      desc: "Sanitize laptops, desktops, and workstations before returning leased hardware or transferring assets between departments — with verifiable NIST 800-88 Purge certification per device.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Data Center Storage Retirement",
      desc: "Wipe file server volumes, NAS shares, and SAN LUNs before hardware decommissioning. Generate per-volume erasure certificates for asset disposal audit trails.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Regulatory Compliance Workflows",
      desc: "Automate GDPR Article 17 right-to-erasure requests across file shares. Batch-process deletion requests with per-file audit certificates for DPA submission.",
      icon: <CloudIcon className="w-8 h-8" />,
    },
    {
      title: "M&A Due Diligence Sanitization",
      desc: "During mergers and acquisitions, selectively destroy confidential IP, trade secrets, and privileged communications from shared infrastructure before entity transfer.",
      icon: <ClipboardIcon className="w-8 h-8" />,
    },
  ];



  const complianceStandards = [
    {
      name: "NIST 800-88 Rev.1",
      desc: "Maps File Eraser's 27+ algorithms to Clear (single-pass zero-fill) and Purge (multi-pass pattern overwrite) sanitization categories defined in SP 800-88 Revision 1.",
    },
    {
      name: "DoD 5220.22-M ECE",
      desc: "Implements the Extended (7-pass) variant: alternating 0x00, 0xFF, and PRNG passes with verification reads after each cycle — exceeding baseline 3-pass requirements.",
    },
    {
      name: "GDPR Art. 17",
      desc: "Automated right-to-erasure pipeline: ingest data subject requests, locate matching files across endpoints, execute verified erasure, and generate per-request audit certificates.",
    },
    {
      name: "HIPAA §164.310",
      desc: "Satisfies the Device and Media Controls implementation specification (d)(2)(i) — certified ePHI disposal with cryptographic verification and chain-of-custody documentation.",
    },
    {
      name: "SOX §802",
      desc: "WORM-compliant audit logs ensure erasure records meet Sarbanes-Oxley Section 802 retention requirements — immutable, timestamped, and digitally signed.",
    },
    {
      name: "PCI-DSS v4.0",
      desc: "Fulfills Requirement 3.1 and 9.4.6 for cryptographic erasure of cardholder data. Supports tokenized file tracking for PCI scope reduction documentation.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DataSheetFileEraser.pdf";
    link.download = "DataSheetFileEraser.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      {/* ================= STICKY SECTION NAV ================= */}
      {/* Secondary navbar strictly desktop mode ke liye hai */}
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white border-b border-orange-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <a
                href="/"
                className="hidden sm:flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
                title="D-Secure File Eraser — D-Secure Data Erasure Software"
              >
                <Image
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759554063/iffkbzphl8zhxei0prpn.svg"
                  alt="D-Secure File Eraser Logo"
                  width={32}
                  height={32}
                  className="h-7 sm:h-8 w-auto"
                  style={{ width: "auto" }}
                />
                {/* <span className="text-lg font-bold text-slate-800 tracking-tight">
                  D-Secure File Eraser
                </span> */}
              </a>
              <nav className="flex items-center gap-1 overflow-x-auto py-2 w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-start sm:justify-end">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-orange-50 hover:text-orange-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white bg-gradient-to-br from-orange-50 via-amber-50 to-cyan-50">
        {/* ================= HERO SECTION ================= */}
        <section className="py-8 lg:py-12 xl:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <a
                      href={DSECURE_BASE_URL}
                      className="hover:text-orange-600 transition-colors"
                    >
                      Home
                    </a>
                    <span>/</span>
                    <a
                      href={`${DSECURE_BASE_URL}/products`}
                      className="hover:text-orange-600 transition-colors"
                    >
                      Products
                    </a>
                    <span>/</span>
                    <span className="text-slate-900">D-Secure File Eraser</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <ShieldIcon className="w-4 h-4" />
                      D-Secure File Eraser Software
                    </div>
                    <a
                      href={`${DSECURE_BASE_URL}/products/file-eraser-network`}
                      className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      New: Network Edition Available
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      D-Secure File Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    When you press &quot;Delete&quot; on a file, the data stays on your
                    drive — only the reference is removed. Any{" "}
                    <strong>file recovery tool</strong> can bring it back.{" "}
                    <a
                      href="https://dsecuretech.com/products/file-eraser"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      D-Secure File Eraser
                    </a>{" "}
                    solves this by overwriting data at the sector level using{" "}
                    <strong>internationally recognized erasure algorithms</strong>,
                    so the original content becomes permanently unrecoverable —
                    even under <strong>forensic analysis</strong>.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "SOC 2"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-orange-100"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`${DSECURE_BASE_URL}/pricing-and-plan?product=file-eraser`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Buy Now
                    </a>
                    <button
                      onClick={downloadCatalog}
                      className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-800 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - 3D Product Box */}
              <Reveal delayMs={100}>
                {/* Mobile screen size par height adapt karne ke liye min-h update kiya hai */}
                <div
                  className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-transparent to-amber-200/30 blur-3xl"></div>

                  {/* Floating Particles */}
                  <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-orange-400 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-40"></div>
                  <div className="absolute top-[20%] right-[12%] w-1.5 h-1.5 bg-amber-400 rounded-full animate-[ping_2.5s_ease-in-out_infinite_0.5s] opacity-40"></div>
                  <div className="absolute bottom-[15%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2.8s_ease-in-out_infinite_1s] opacity-40"></div>
                  <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-orange-500 rounded-full animate-[ping_3.2s_ease-in-out_infinite_0.3s] opacity-40"></div>

                  {/* Cloudinary Image Product Box */}
                  <div
                    className="relative animate-[float_4s_ease-in-out_infinite] w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto flex justify-center"
                    style={{
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1780378791/dmwbyiicwpmfelcsdufl.png"
                      alt="D-Secure File Eraser Box"
                      className="w-[300px] sm:w-[400px] lg:w-[500px] drop-shadow-2xl object-contain"
                    />
                    {/* Bottom Reflection */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[180px] lg:w-[240px] h-16 bg-gradient-to-t from-orange-600/20 to-transparent blur-xl rounded-full"></div>
                  </div>

                  {/* CSS Animation Keyframes */}
                  <style>{`
                    @keyframes float {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-15px); }
                    }
                  `}</style>

                  {/* 
                    NOTE: ORIGINAL 3D CSS MODEL COMMENTED OUT AS PER REQUEST 
                    <div
                      className="relative animate-[float_4s_ease-in-out_infinite]"
                      style={{
                        transformStyle: "preserve-3d",
                        animation: "float 4s ease-in-out infinite",
                      }}
                    >
                      ... original HTML was here ...
                    </div>
                  */}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PLATFORM SUPPORT (moved up for structure differentiation) ================= */}
        <section
          id="platforms"
          className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-amber-50"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Cross-Platform Endpoint Sanitization
                </h2>
                <p className="text-lg text-slate-600">
                  Works natively across Windows, macOS, and Linux — no
                  compatibility patches or emulation layers needed
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 80}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 flex-shrink-0 text-orange-800 flex items-center justify-center bg-orange-50 rounded-2xl mb-4">
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {p.name}
                      </h3>
                      <p className="text-sm text-slate-500">{p.versions}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY FEATURES (moved up for structure differentiation) ================= */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Implementation-Ready Security Architecture
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Technical capabilities that differentiate D-Secure from
                  consumer-grade deletion utilities and basic disk cleanup tools
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delayMs={i * 40}>
                  <div className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors flex-shrink-0">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHAT YOU CAN ERASE ================= */}
        <section id="erase-types" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Erasure Target Categories
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Six attack surfaces where D-Secure File Eraser performs
                  sector-level data destruction — from local NTFS volumes to remote SMB shares
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eraseTypes.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 50}>
                  <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      {item.name}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VIDEO SECTION (DISABLED — Same images as corporate site, causes duplication) ================= */}
        {process.env.NEXT_PUBLIC_SHOW_DISABLED === 'true' && (<section
          id="demo"
          className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-orange-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  See D-Secure File Eraser in Action
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  See how the file eraser handles real-world erasure tasks — from
                  file selection to certificate generation
                </p>
              </div>
            </Reveal>

            {/* Media Grid - 1 Video + 2 Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Main Video Card */}
              {/* Embedded Product Demo - Sandbox Style */}
              <Reveal delayMs={100}>
                <div
                  ref={demoContainerRef}
                  className={`relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-orange-200/30 transition-shadow duration-500 flex flex-col group ${
                    isFullscreen
                      ? "w-full h-full rounded-none"
                      : "rounded-2xl h-full min-h-[800px]"
                  }`}
                >
                  {/* Fullscreen Toggle Button (visible only when demo is active) */}
                  {isDemoActive && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-12 right-4 z-50 p-2.5 bg-slate-900/80 hover:bg-orange-600 text-white rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
                      title={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      )}
                      <span className="text-sm font-medium pr-1 hidden sm:block">
                        {isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                      </span>
                    </button>
                  )}

                  {isDemoActive ? (
                    /* Iframe Container */
                    <iframe
                      src="https://d-secure-file-erase-sand-box.vercel.app/"
                      className="w-full h-full flex-1 border-0"
                      title="D-Secure File Eraser Demo"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                      allow="clipboard-read; clipboard-write; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    /* Demo Placeholder - Screenshot Thumbnail */
                    <button
                      onClick={() => setIsDemoActive(true)}
                      className="group relative w-full h-full min-h-[400px] flex-1 cursor-pointer overflow-hidden border-none p-0 m-0 bg-transparent text-left"
                      aria-label="Start interactive demo"
                    >
                      {/* Screenshot Background */}
                      <Image
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                        alt="D-Secure File Eraser Dashboard Interface Preview"
                        fill
                        className="object-cover object-left-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Subtle overlay for play button visibility */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
                      {/* Centered Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-orange-200 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-7 h-7 text-white ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-slate-200/80">
                            Click to start interactive demo
                          </span>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </Reveal>

              {/* [OLD VIDEO CARD - PRESERVED AS COMMENT]
              <Reveal delayMs={100}>
                <div
                  onClick={() => setShowVideoModal(true)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-bold text-lg">
                            Dashboard View
                          </h3>
                          <p className="text-orange-400 text-sm font-medium">
                            Product Demo
                          </p>
                        </div>
                      </div>
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-2xl">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl">
                          <svg
                            className="w-7 h-7 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-4 text-white/70 text-sm font-medium">
                        Click to watch demo
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        VIDEO
                      </span>
                      <span className="text-slate-400 text-xs">6:10</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Product Demo
                    </h3>
                    <p className="text-sm text-slate-500">
                      Complete walkthrough of D-Secure File Eraser features
                    </p>
                  </div>
                </div>
              </Reveal>
              */}

              {/* Screenshot Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Screenshot 1 */}
                <Reveal delayMs={150}>
                  <button
                    onClick={() => setSelectedImageIndex(0)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 1"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_1_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      <Image
                        src={galleryImages[0].url}
                        alt="D-Secure File Eraser Main Dashboard View"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-orange-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 2 */}
                <Reveal delayMs={200}>
                  <button
                    onClick={() => setSelectedImageIndex(1)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 2"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_2_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      <Image
                        src={galleryImages[1].url}
                        alt="Tamper-proof Data Erasure Certificate Report"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-orange-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 3 */}
                <Reveal delayMs={250}>
                  <button
                    onClick={() => setSelectedImageIndex(2)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View screenshot 3"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_3_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      <Image
                        src={galleryImages[2].url}
                        alt="File and Folder Selection for Secure Wiping"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-orange-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Screenshot 4 - Shows "More" badge if additional images exist */}
                <Reveal delayMs={300}>
                  <button
                    onClick={() => setSelectedImageIndex(3)}
                    className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer text-left p-0 border-none"
                    aria-label="View more screenshots"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_4_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </div>
                      <Image
                        src={galleryImages[3].url}
                        alt="Real-time Data Sanitization Progress"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* More Images Badge */}
                      {additionalImagesCount > 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xl sm:text-2xl font-bold">
                            +{additionalImagesCount} More
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-orange-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>)}

        {/* ================= HOW IT WORKS (Help Manual) ================= */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  How To Use D-Secure File Eraser?
                </h2>
                <p className="text-lg text-slate-600">
                  Four steps from download to verified erasure certificate
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Visual Flow Diagram (7 cols) */}
              <div className="lg:col-span-7">
                <Reveal delayMs={100}>
                  <div className="relative">
                    {/* Flow Steps */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                      {/* Step 1: Download */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 group-hover:border-orange-300 transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <CloudIcon className="w-10 h-10 text-orange-800" />
                          <div className="absolute -bottom-2">
                            <Download className="w-5 h-5 text-orange-500 bg-white rounded-full p-0.5 shadow-sm" />
                          </div>
                        </div>
                        {/* Text wrapping aur truncation issue ko solve karne ke liye max-w change kiya hai */}
                        <p className="font-semibold text-slate-800 text-sm max-w-[160px] md:max-w-[180px]">
                          Download D-Secure File Eraser Software
                        </p>
                      </div>

                      {/* Arrow 1 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 2: Install */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 group-hover:border-orange-300 transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <Monitor className="w-10 h-10 text-orange-800" />
                        </div>
                        {/* Text wrapping aur truncation issue ko solve karne ke liye max-w change kiya hai */}
                        <p className="font-semibold text-slate-800 text-sm max-w-[160px] md:max-w-[180px]">
                          Install D-Secure File Eraser
                        </p>
                      </div>

                      {/* Arrow 2 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 3: Select */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 group-hover:border-orange-300 transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <ClipboardIcon className="w-10 h-10 text-orange-800" />
                        </div>
                        {/* Text wrapping aur truncation issue ko solve karne ke liye max-w change kiya hai */}
                        <p className="font-semibold text-slate-800 text-sm max-w-[160px] md:max-w-[180px]">
                          Select Files/Folders/ Volumes To Erase
                        </p>
                      </div>

                      {/* Arrow 3 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 4: Erase */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 group-hover:border-orange-300 transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <FileTextIcon className="w-10 h-10 text-orange-800" />
                          <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <ShieldIcon className="w-4 h-4 text-orange-500" />
                          </div>
                        </div>
                        {/* Text wrapping aur truncation issue ko solve karne ke liye max-w change kiya hai */}
                        <p className="font-semibold text-slate-800 text-sm max-w-[160px] md:max-w-[180px]">
                          Erase & Save Report
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Text Content (5 cols) */}
              <div className="lg:col-span-5">
                <Reveal delayMs={200}>
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      <strong className="text-slate-900">D-Secure File Eraser</strong>{" "}
                      can be deployed across{" "}
                      <strong className="text-slate-900">
                        Windows, Mac, and Linux
                      </strong>{" "}
                      systems to permanently erase files, folders, and traces
                      beyond recovery. Each erasure operation uses your chosen
                      overwrite standard and produces a verifiable audit trail.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Select the file/s or folders or search the name to erase.
                      For organizations with distributed endpoints, the{" "}
                      <strong className="text-orange-700">Cloud Console</strong>{" "}
                      lets administrators execute and monitor erasures
                      remotely — no physical access required.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a
                        href={`${DSECURE_BASE_URL}/support/help-manual/complete-manual`}
                        className="inline-flex items-center gap-2 text-orange-800 font-bold hover:text-orange-700 transition-colors group"
                      >
                        Help Manual
                        <ClipboardIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TAMPER PROOF REPORT ================= */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    Audit-Ready Documentation
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Tamper-proof Erasure Report
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    After every erasure, a digitally signed PDF report is generated
                    containing the file path, overwrite algorithm used, pass count,
                    SHA-256 hash, and timestamp — ready to present during GDPR,
                    HIPAA, or SOX compliance audits.
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <button
                  onClick={() =>
                    setSelectedImageIndex(galleryImages.length - 1)
                  }
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group cursor-pointer w-full max-w-[320px] sm:max-w-[400px] mx-auto text-left p-0 border-none bg-slate-50 block"
                  aria-label="View Tamper-proof Erasure Report fullscreen"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1778233927/r3mpk0vohwxanxppbchv.png"
                    alt="Tamper-proof Erasure Report"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 to-transparent pointer-events-none"></div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-orange-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE STANDARDS ================= */}
        <section
          id="compliance"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Regulatory Compliance Implementation
                </h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  <a
                    href="https://dsecuretech.com/products/file-eraser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    D-Secure File Eraser
                  </a>{" "}
                  maps its 27+ sanitization algorithms to globally recognized data
                  protection frameworks — here&apos;s how each standard maps to file-level operations
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 gap-5">
              {complianceStandards.map((std, i) => (
                <Reveal key={std.name} delayMs={i * 50}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors border border-white/10 h-full flex flex-col">
                    <div className="w-12 h-12 mx-auto mb-3 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{std.name}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed flex-grow">
                      {std.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section
          id="use-cases"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-orange-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  IT Operational Workflows
                </h2>
                <p className="text-lg text-slate-600">
                  Enterprise scenarios where certified file erasure is operationally required
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delayMs={i * 80}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 h-full flex flex-col">
                    <div className="flex items-start gap-5 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center flex-shrink-0">
                        {u.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {u.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {u.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RELATED RESOURCES (BLOG) ================= */}
        {process.env.NEXT_PUBLIC_SHOW_DISABLED === 'true' && (
        <section id="blogs" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                    Technical Blogs
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl">
                    Expert insights on data security, erasure standards, and
                    best practices
                  </p>
                </div>
                {/* Naye tab mein view details/all blogs page open karne ke liye config */}
                <a
                  href={`${DSECURE_BASE_URL}/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-800 font-bold hover:text-orange-700 transition-colors group"
                >
                  View More
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBlogs.map((blog, i) => (
                <Reveal key={blog.id} delayMs={i * 60}>
                  <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-orange-800 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-800 transition-colors line-clamp-2">
                      {/* Har link naye window/tab mein open hoga standard security params ke sath */}
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0"
                      >
                        {blog.title}
                      </a>
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-orange-800 font-semibold text-sm mb-4 group-hover:gap-2 gap-1 transition-all">
                      Read Article <ArrowRightIcon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                      <span>{blog.publishDate}</span>
                      <span>{blog.readTime || getReadTime(blog.excerpt)}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* <ProductInternalLinks currentProduct="file-eraser" /> */}

        {/* ================= ERASURE STANDARDS COMPARISON ================= */}
        <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <ShieldIcon className="w-4 h-4" />
                  Overwrite Standards Reference
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Erasure Standards Comparison
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Different erasure standards use different overwrite patterns
                  and pass counts — here&apos;s how to pick the right one for
                  your compliance needs
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                      <th className="px-6 py-4 font-semibold text-sm">Standard</th>
                      <th className="px-6 py-4 font-semibold text-sm">Passes</th>
                      <th className="px-6 py-4 font-semibold text-sm">Pattern</th>
                      <th className="px-6 py-4 font-semibold text-sm hidden md:table-cell">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { std: "NIST 800-88 Clear", passes: "1", pattern: "Single overwrite + verification", best: "General-purpose sanitization; internal device reuse" },
                      { std: "NIST 800-88 Purge", passes: "Varies", pattern: "Cryptographic erase or block erase", best: "Devices leaving organizational control" },
                      { std: "DoD 5220.22-M (3-pass)", passes: "3", pattern: "Zero → One → Random + verify", best: "Government and defense data handling" },
                      { std: "DoD 5220.22-M ECE (7-pass)", passes: "7", pattern: "Extended overwrite cycle with verification", best: "Higher-sensitivity government data" },
                      { std: "Gutmann", passes: "35", pattern: "27 fixed patterns + 8 random passes", best: "Legacy magnetic media (pre-2001 drives)" },
                      { std: "HMG IS5 Baseline", passes: "1", pattern: "Single overwrite with zeros", best: "UK government lower-classification data" },
                      { std: "HMG IS5 Enhanced", passes: "3", pattern: "Zero → One → Random", best: "UK government higher-classification data" },
                      { std: "RCMP TSSIT OPS-II", passes: "7", pattern: "Alternating zero/one patterns + random", best: "Canadian government data destruction" },
                      { std: "Random Data", passes: "1–3", pattern: "Cryptographically random bytes", best: "Quick sanitization for non-regulated environments" },
                    ].map((row, i) => (
                      <tr key={row.std} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-orange-50 transition-colors`}>
                        <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{row.std}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center justify-center bg-orange-100 text-orange-800 font-bold rounded-full w-10 h-7 text-xs">
                            {row.passes}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{row.pattern}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm hidden md:table-cell">{row.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Which standard should I choose?</p>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      For most modern HDDs, NIST 800-88 Clear (single verified pass) is sufficient.
                      Multi-pass standards like DoD 5220.22-M were designed for older magnetic media where
                      data residue was theoretically detectable. For SSDs, firmware-based commands
                      (Secure Erase / Crypto Erase) are more effective than software overwriting due to
                      wear-leveling architecture. D-Secure File Eraser supports all these standards —
                      pick the one your compliance framework requires.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= DELETE vs FORMAT vs FILE ERASER ================= */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Delete vs Format vs File Eraser
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Understanding what actually happens to your data at the
                  storage level with each method
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  method: "Delete (Recycle Bin)",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ),
                  color: "red",
                  what: "Removes the file pointer from the directory table. The actual data bytes stay written on disk sectors.",
                  recoverable: "Yes — any recovery tool can restore the file until those sectors are reused by new data.",
                  verdict: "Not secure",
                },
                {
                  method: "Format (Quick/Full)",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  ),
                  color: "amber",
                  what: "Quick format resets the file system index. Full format writes zeros to every sector but destroys all data on the volume.",
                  recoverable: "Quick: Yes. Full: Partially — some tools can recover fragments from edge cases.",
                  verdict: "Unreliable",
                },
                {
                  method: "File Eraser (Overwrite)",
                  icon: <ShieldIcon className="w-8 h-8" />,
                  color: "orange",
                  what: "Overwrites the exact disk sectors occupied by the file with random or patterned data using verified algorithms (NIST, DoD, etc.).",
                  recoverable: "No — the original binary data is physically replaced. Recovery tools return only overwritten garbage.",
                  verdict: "Secure & verifiable",
                },
              ].map((item, i) => {
                const colorMap = {
                  red: { bg: "bg-red-50", border: "border-red-200", icon: "bg-red-100 text-red-700", badge: "bg-red-100 text-red-700" },
                  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "bg-amber-100 text-amber-700", badge: "bg-amber-100 text-amber-700" },
                  orange: { bg: "bg-orange-50", border: "border-orange-200", icon: "bg-orange-100 text-orange-800", badge: "bg-orange-100 text-orange-800" },
                };
                const c = colorMap[item.color as keyof typeof colorMap];
                return (
                  <Reveal key={item.method} delayMs={i * 100}>
                    <div className={`${c.bg} rounded-2xl p-8 ${c.border} border h-full flex flex-col`}>
                      <div className={`w-14 h-14 rounded-xl ${c.icon} flex items-center justify-center mb-5`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{item.method}</h3>
                      <div className="space-y-4 flex-grow">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">What happens</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.what}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Data recoverable?</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.recoverable}</p>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-200">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${c.badge}`}>
                          {item.color === "orange" && <CheckIcon className="w-3.5 h-3.5" />}
                          {item.verdict}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section
          id="faq"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-orange-50"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Technical Implementation FAQ
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delayMs={i * 50}>
                  <details className="group bg-slate-50 rounded-xl border border-slate-200 hover:border-orange-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h2 className="font-semibold text-slate-900 pr-4 text-base sm:text-lg">
                        {faq.question}
                      </h2>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY / CTA SECTION ================= */}
        <section id="contact" className="py-20 lg:py-28 bg-white border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Talk to Our Security Engineers
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get technical guidance on deployment architecture,
                    endpoint scale, and integration options for your
                    infrastructure.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Multi-endpoint deployment consultation",
                      "API and CLI integration support",
                      "Proof-of-concept setup assistance",
                      "Technical documentation access",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-orange-800" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <a
                      href={`${DSECURE_BASE_URL}/contact`}
                      className="inline-flex items-center gap-2 text-orange-800 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Or contact us directly
                      <ArrowRightIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-5">
                    Request Information
                  </h2>
                  <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);

                      try {
                        const now = new Date();
                        const timestampLocal = now.toLocaleString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        });
                        const timestampISO = now.toISOString();

                        // === FormSubmit ke liye FormData taiyar karein ===
                        const formSubmitData = new FormData();
                        // Backend ko notify karne ke liye webhook - backend auto-response email bhejega
                        formSubmitData.append(
                          "_webhook",
                          "https://api.dsecuretech.com/api/formsubmit/webhook",
                        );
                        formSubmitData.append("_captcha", "false");
                        formSubmitData.append("_template", "table");
                        formSubmitData.append("sendAutoReply", "true"); // Auto-reply enable karein

                        // Form fields
                        formSubmitData.append("name", formData.name.trim());
                        formSubmitData.append("email", formData.email.trim());
                        formSubmitData.append(
                          "customer_email",
                          formData.email.trim(),
                        );
                        formSubmitData.append("phone", formData.phone.trim());
                        formSubmitData.append(
                          "organization",
                          formData.organization.trim(),
                        );
                        formSubmitData.append(
                          "country",
                          formData.country.trim(),
                        );
                        formSubmitData.append(
                          "businessType",
                          formData.businessType,
                        );
                        formSubmitData.append(
                          "endpoints",
                          formData.endpoints,
                        );
                        formSubmitData.append(
                          "message",
                          formData.message.trim(),
                        );

                        // Autoresponse ke liye reply-to zaroori hai
                        formSubmitData.append(
                          "_replyto",
                          formData.email.trim(),
                        );
                        formSubmitData.append("timestamp", timestampLocal);
                        formSubmitData.append(
                          "source",
                          "D-Secure File Eraser Page Contact",
                        );

                        // Subject aur CC
                        formSubmitData.append(
                          "_subject",
                          "New Inquiry - D-Secure File Eraser Page",
                        );
                        formSubmitData.append(
                          "_cc",
                          "d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
                        );

                        // === Prepare submission data for Backend API ===
                        const submissionData = {
                          name: formData.name.trim(),
                          email: formData.email.trim(),
                          company: formData.organization.trim(),
                          phone: formData.phone.trim(),
                          country: formData.country.trim(),
                          businessType: formData.businessType,
                          solutionType: "file-erasure",
                          complianceRequirements: "",
                          message: formData.message.trim(),
                          usageType: "",
                          source: "D-Secure File Eraser Page Contact",
                          timestamp: timestampISO,
                        };

                        // Reset form and show success immediately
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          organization: "",
                          country: "",
                          businessType: "",
                          endpoints: "",
                          message: "",
                        });
                        setIsLoading(false);
                        showToast(
                          "Thank you! Your enquiry has been submitted successfully.",
                          "success",
                        );

                        try {
                          // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                          const API_BASE = API_BASE_URL;
                          const apiResponse = await fetch(
                            `${API_BASE}/api/ContactFormSubmissions`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(submissionData),
                            },
                          );

                          // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
                          await fetch(
                            "https://formsubmit.co/support@dsecuretech.com",
                            {
                              method: "POST",
                              body: formSubmitData,
                              headers: { Accept: "application/json" },
                            },
                          );

                          // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
                          fetch(POWER_AUTOMATE_URL, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "x-api-key": "REACT_CONTACT_2026",
                            },
                            body: JSON.stringify(submissionData),
                          }).catch(() => {});

                          if (!apiResponse.ok) {
                            const errorData = await apiResponse.json();
                            console.error(
                              "Backend submission failed:",
                              errorData,
                            );
                          }
                        } catch (error: unknown) {
                          console.error("Form error:", error);
                          const err = error as Error;
                          showToast(
                            err.message ||
                              "Failed to send message. Please try again later.",
                            "error",
                          );
                        }
                      } catch (error) {
                        console.error("FormSubmit error:", error);
                        showToast(
                          "Failed to submit enquiry. Please try again.",
                          "error",
                        );
                        setIsLoading(false);
                      }
                    }}
                  >
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email *"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                        required
                      />
                    </div>
                    {/* Row 2: Phone + Organization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                      />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Organization"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                      />
                    </div>
                    {/* Row 3: Country + Business Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors appearance-none text-sm"
                        required
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="bg-slate-800"
                        >
                          Select Country *
                        </option>
                        <option value="United States" className="bg-slate-800">
                          United States
                        </option>
                        <option value="United Kingdom" className="bg-slate-800">
                          United Kingdom
                        </option>
                        <option value="Canada" className="bg-slate-800">
                          Canada
                        </option>
                        <option value="Australia" className="bg-slate-800">
                          Australia
                        </option>
                        <option value="India" className="bg-slate-800">
                          India
                        </option>
                        <option value="Other" className="bg-slate-800">
                          Other
                        </option>
                      </select>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors appearance-none text-sm"
                        required
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="bg-slate-800"
                        >
                          Business Type *
                        </option>
                        <option value="Enterprise" className="bg-slate-800">
                          Enterprise
                        </option>
                        <option value="SMB" className="bg-slate-800">
                          SMB
                        </option>
                        <option
                          value="ITAD / Recycler"
                          className="bg-slate-800"
                        >
                          ITAD / Recycler
                        </option>
                        <option
                          value="Government / Public Sector"
                          className="bg-slate-800"
                        >
                          Government / Public Sector
                        </option>
                        <option
                          value="Individual / Home"
                          className="bg-slate-800"
                        >
                          Individual / Home
                        </option>
                        <option value="Other" className="bg-slate-800">
                          Other
                        </option>
                      </select>
                    </div>
                    {/* Row 4: Endpoints */}
                    <div className="grid grid-cols-1 gap-3">
                      <select
                        name="endpoints"
                        value={formData.endpoints}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors appearance-none text-sm"
                        required
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="bg-slate-800"
                        >
                          Number of endpoints *
                        </option>
                        <option value="1-10" className="bg-slate-800">
                          1-10
                        </option>
                        <option value="11-50" className="bg-slate-800">
                          11-50
                        </option>
                        <option value="51-200" className="bg-slate-800">
                          51-200
                        </option>
                        <option value="201-500" className="bg-slate-800">
                          201-500
                        </option>
                        <option value="500+" className="bg-slate-800">
                          500+
                        </option>
                      </select>
                    </div>
                    {/* Message */}
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="How can we help you?"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors resize-none text-sm"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal — disabled (gallery section hidden) */}
      {process.env.NEXT_PUBLIC_SHOW_DISABLED === 'true' && selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop close button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute inset-0 bg-transparent border-0 w-full h-full cursor-default"
            aria-label="Close gallery backdrop"
          />

          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={() => handlePrevImage()}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleNextImage()}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm z-10">
            {(selectedImageIndex ?? 0) + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* Video Modal — disabled (gallery section hidden) */}
      {process.env.NEXT_PUBLIC_SHOW_DISABLED === 'true' && showVideoModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop close button */}
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute inset-0 bg-transparent border-0 w-full h-full cursor-default"
            aria-label="Close video backdrop"
          />

          {/* Close Button */}
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center z-10">
            <video
              src="https://res.cloudinary.com/dhwi5wevf/video/upload/f_auto,q_auto/v1770725346/jqkinwc7zk4w2ak9nplw.3gp"
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            >
              <track kind="captions" />
            </video>
          </div>
        </div>
      )}
    </>
  );
});

export default FileEraserPage;



