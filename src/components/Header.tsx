"use client";

// Header component — D-Secure branding + parent site navigation
// Desktop: Zoho-style mega dropdown, Mobile: accordion-style expandable menu
import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS, DSECURE_BASE_URL } from "@/lib/constants";
import ProductsDropdown from "./ProductsDropdown";
import SolutionsDropdown from "./SolutionsDropdown";

// Mobile accordion ke liye Products data
const MOBILE_PRODUCTS = {
  eraser: {
    label: "Eraser",
    items: [
      { name: "Drive Eraser", href: `${DSECURE_BASE_URL}/products/drive-eraser` },
      { name: "Drive Eraser Diagnostic", href: `${DSECURE_BASE_URL}/products/drive-eraser-diagnostic` },
      { name: "File Eraser", href: `${DSECURE_BASE_URL}/products/file-eraser` },
      { name: "File Eraser Network", href: `${DSECURE_BASE_URL}/products/file-eraser-network` },
      { name: "Smartphone Eraser", href: `${DSECURE_BASE_URL}/products/smartphone-eraser` },
      { name: "Virtual Machine Eraser", href: `${DSECURE_BASE_URL}/products/virtual-machine-eraser` },
      { name: "Removable Media Eraser", href: `${DSECURE_BASE_URL}/products/removable-media-eraser` },
      { name: "LUN Eraser", href: `${DSECURE_BASE_URL}/products/lun-eraser` },
    ],
  },
  migration: {
    label: "Migration",
    items: [
      { name: "Data Migration", href: `${DSECURE_BASE_URL}/products/data-migration` },
      { name: "Forensic Imaging", href: `${DSECURE_BASE_URL}/products/forensic-imaging` },
      { name: "FreezeState", href: `${DSECURE_BASE_URL}/products/freeze-state` },
      { name: "Asset Reimaging", href: `${DSECURE_BASE_URL}/products/asset-reimaging` },
    ],
  },
  diagnostics: {
    label: "Diagnostics",
    items: [
      { name: "Hardware Diagnostics", href: `${DSECURE_BASE_URL}/products/hardware-diagnostics` },
      { name: "Smartphone Diagnostics", href: `${DSECURE_BASE_URL}/products/smartphone-diagnostic` },
      { name: "SMART Diagnostics", href: `${DSECURE_BASE_URL}/products/hard-drive-monitor` },
      { name: "Autopilot Detection", href: `${DSECURE_BASE_URL}/products/autopilot-detection` },
    ],
  },
  verification: {
    label: "Verification",
    items: [
      { name: "Erasure Verification", href: `${DSECURE_BASE_URL}/products/drive-verifier` },
    ],
  },
};

// Mobile accordion ke liye Solutions data
const MOBILE_SOLUTIONS = {
  industry: {
    label: "Industries",
    items: [
      { name: "Enterprise", href: `${DSECURE_BASE_URL}/solutions/enterprise` },
      { name: "Banking & Finance", href: `${DSECURE_BASE_URL}/solutions/data-erasure-banking-finance` },
      { name: "Government", href: `${DSECURE_BASE_URL}/solutions/government` },
      { name: "Healthcare", href: `${DSECURE_BASE_URL}/solutions/healthcare` },
      { name: "Education", href: `${DSECURE_BASE_URL}/solutions/education` },
      { name: "Non-Profit", href: `${DSECURE_BASE_URL}/solutions/non-profit` },
    ],
  },
  specialized: {
    label: "Specialized",
    items: [
      { name: "Service Providers", href: `${DSECURE_BASE_URL}/solutions/service-providers` },
      { name: "ITAD", href: `${DSECURE_BASE_URL}/solutions/itad` },
    ],
  },
};

// Chevron icon — rotate hota hai expand/collapse pe
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Desktop dropdown states
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileActiveProductTab, setMobileActiveProductTab] = useState<string | null>(null);
  const [mobileActiveSolutionTab, setMobileActiveSolutionTab] = useState<string | null>(null);

  const anyDropdownOpen = productsOpen || solutionsOpen;

  useEffect(() => {
    // Inline reset function — stale closure se bachne ke liye
    const resetMenus = () => {
      setMobileMenuOpen(false);
      setProductsOpen(false);
      setSolutionsOpen(false);
      setMobileProductsOpen(false);
      setMobileSolutionsOpen(false);
      setMobileActiveProductTab(null);
      setMobileActiveSolutionTab(null);
      // Scroll position ke hisaab se hidden sync karo
      setHidden(globalThis.scrollY > 400);
    };

    // Sticky nav visibility handler
    const handleStickyNav = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      setHidden(customEvent.detail.visible);
    };
    globalThis.addEventListener("stickyNavVisible", handleStickyNav);

    // pageshow — bfcache restore pe fire hota hai
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // bfcache se restore hua — force re-render
        resetMenus();
      }
    };
    globalThis.addEventListener("pageshow", handlePageShow);

    // visibilitychange — tab switch/minimize pe
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        resetMenus();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // popstate — browser back/forward button
    const handlePopState = () => {
      resetMenus();
    };
    globalThis.addEventListener("popstate", handlePopState);

    // focus — jab window focus milta hai (external site se wapas aane pe)
    const handleFocus = () => {
      resetMenus();
    };
    globalThis.addEventListener("focus", handleFocus);

    return () => {
      globalThis.removeEventListener("stickyNavVisible", handleStickyNav);
      globalThis.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibility);
      globalThis.removeEventListener("popstate", handlePopState);
      globalThis.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Desktop dropdown toggles
  const toggleProducts = () => {
    setProductsOpen((prev) => !prev);
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
  };
  const toggleSolutions = () => {
    setSolutionsOpen((prev) => !prev);
    setProductsOpen(false);
    setMobileMenuOpen(false);
  };

  const closeAll = () => {
    setProductsOpen(false);
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileSolutionsOpen(false);
    setMobileActiveProductTab(null);
    setMobileActiveSolutionTab(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setProductsOpen(false);
    setSolutionsOpen(false);
    if (mobileMenuOpen) {
      setMobileProductsOpen(false);
      setMobileSolutionsOpen(false);
      setMobileActiveProductTab(null);
      setMobileActiveSolutionTab(null);
    }
  };

  // Mobile accordion toggle — Products
  const toggleMobileProducts = () => {
    setMobileProductsOpen((prev) => !prev);
    setMobileSolutionsOpen(false);
    setMobileActiveProductTab(null);
  };

  // Mobile accordion toggle — Solutions
  const toggleMobileSolutions = () => {
    setMobileSolutionsOpen((prev) => !prev);
    setMobileProductsOpen(false);
    setMobileActiveSolutionTab(null);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-slate-200/80 transition-all duration-300 ${
        hidden
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo + Product Name */}
          <a
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
            title="File Eraser — D-Secure Data Erasure Software"
          >
            <Image
              src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759928831/bwsswefvwhdvuy8yrplk.png"
              alt="File Eraser Logo"
              width={36}
              height={36}
              priority
              className="h-8 lg:h-9 w-auto"
            />
            <span className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight">
              File Eraser
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.label === "Products") {
                return (
                  <button
                    key={link.label}
                    onClick={toggleProducts}
                    className={`inline-flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                      productsOpen
                        ? "text-emerald-700"
                        : "text-slate-600 hover:text-emerald-700"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }

              if (link.label === "Solutions") {
                return (
                  <button
                    key={link.label}
                    onClick={toggleSolutions}
                    className={`inline-flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                      solutionsOpen
                        ? "text-emerald-700"
                        : "text-slate-600 hover:text-emerald-700"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                  title={`${link.label} — D-Secure Tech`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Login Button — Desktop */}
          <div className="hidden lg:flex items-center">
            <a
              href={`${DSECURE_BASE_URL}/login`}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              title="Login to D-Secure Dashboard"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Backdrop */}
      {anyDropdownOpen && (
        <button
          className="fixed inset-0 z-40 bg-transparent cursor-default w-full h-full border-0 p-0 m-0"
          style={{ top: "72px" }}
          onClick={closeAll}
          aria-label="Close dropdown menu"
        />
      )}

      {/* Desktop Mega Dropdown Panels */}
      {productsOpen && (
        <div className="relative z-50">
          <ProductsDropdown onClose={() => setProductsOpen(false)} />
        </div>
      )}
      {solutionsOpen && (
        <div className="relative z-50">
          <SolutionsDropdown onClose={() => setSolutionsOpen(false)} />
        </div>
      )}

      {/* ========== MOBILE NAVIGATION — Accordion Style ========== */}
      {mobileMenuOpen && (
        <>
          <button
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden w-full h-full border-0 p-0 m-0 cursor-default"
            style={{ top: "64px" }}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu backdrop"
          />
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl z-50 lg:hidden overflow-y-auto max-h-[80vh]">
            <nav className="px-4 py-3 flex flex-col">

              {/* Products — Accordion */}
              <button
                onClick={toggleMobileProducts}
                className={`flex items-center justify-between px-4 py-3.5 text-[15px] font-medium rounded-lg transition-colors ${
                  mobileProductsOpen ? "text-emerald-700 bg-emerald-50/50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Products
                <ChevronDown open={mobileProductsOpen} />
              </button>

              {mobileProductsOpen && (
                <div className="ml-2 border-l-2 border-emerald-100 pl-3 mb-2">
                  {Object.entries(MOBILE_PRODUCTS).map(([key, category]) => (
                    <div key={key}>
                      {/* Category tab — Eraser, Migration, etc */}
                      <button
                        onClick={() => setMobileActiveProductTab(mobileActiveProductTab === key ? null : key)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          mobileActiveProductTab === key
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {category.label}
                        <ChevronDown open={mobileActiveProductTab === key} />
                      </button>

                      {/* Sub-items — product links */}
                      {mobileActiveProductTab === key && (
                        <div className="ml-3 border-l border-slate-200 pl-3 mb-1">
                          {category.items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 text-sm text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/40 rounded-md transition-colors"
                              onClick={closeAll}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Explore All Products link */}
                  <a
                    href={`${DSECURE_BASE_URL}/products`}
                    className="block px-3 py-2.5 text-xs font-semibold text-emerald-600 uppercase tracking-wide hover:bg-emerald-50/40 rounded-md transition-colors"
                    onClick={closeAll}
                  >
                    Explore All Products →
                  </a>
                </div>
              )}

              {/* Solutions — Accordion */}
              <button
                onClick={toggleMobileSolutions}
                className={`flex items-center justify-between px-4 py-3.5 text-[15px] font-medium rounded-lg transition-colors ${
                  mobileSolutionsOpen ? "text-emerald-700 bg-emerald-50/50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Solutions
                <ChevronDown open={mobileSolutionsOpen} />
              </button>

              {mobileSolutionsOpen && (
                <div className="ml-2 border-l-2 border-emerald-100 pl-3 mb-2">
                  {Object.entries(MOBILE_SOLUTIONS).map(([key, category]) => (
                    <div key={key}>
                      <button
                        onClick={() => setMobileActiveSolutionTab(mobileActiveSolutionTab === key ? null : key)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          mobileActiveSolutionTab === key
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {category.label}
                        <ChevronDown open={mobileActiveSolutionTab === key} />
                      </button>

                      {mobileActiveSolutionTab === key && (
                        <div className="ml-3 border-l border-slate-200 pl-3 mb-1">
                          {category.items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 text-sm text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/40 rounded-md transition-colors"
                              onClick={closeAll}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <a
                    href={`${DSECURE_BASE_URL}/solutions`}
                    className="block px-3 py-2.5 text-xs font-semibold text-emerald-600 uppercase tracking-wide hover:bg-emerald-50/40 rounded-md transition-colors"
                    onClick={closeAll}
                  >
                    All Solutions →
                  </a>
                </div>
              )}

              {/* Simple nav links — Resources, Partners, Trust Certificate, Support */}
              {NAV_LINKS.filter((l) => l.label !== "Products" && l.label !== "Solutions").map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3.5 text-[15px] font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={closeAll}
                >
                  {link.label}
                </a>
              ))}

              {/* Login Button */}
              <a
                href={`${DSECURE_BASE_URL}/login`}
                className="mt-3 mb-1 bg-emerald-600 text-white px-5 py-3.5 rounded-xl text-[15px] font-semibold text-center hover:bg-emerald-700 transition-all"
                onClick={closeAll}
              >
                Login
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
