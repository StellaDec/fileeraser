// Footer component — dsecure main site jaisa layout
// Brand + Products + Industries + Resources + Company columns
// Bottom bar with copyright, status badge, policy links, scroll-to-top
"use client";

import Image from "next/image";
import {
  DSECURE_BASE_URL,
  FOOTER_PRODUCT_LINKS,
  FOOTER_INDUSTRY_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_POLICY_LINKS,
} from "@/lib/constants";

// Footer column renderer — reusable across all link groups
function FooterColumn({ title, links }: Readonly<{ title: string; links: ReadonlyArray<{ label: string; href: string; external?: boolean }> }>) {
  return (
    <div>
      <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
              title={`${link.label} — D-Secure`}
              {...('external' in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
              {'external' in link && link.external && (
                <span className="ml-1 text-[10px]">↗</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Content — 5 columns */}
      <div className="container mx-auto px-4 max-w-7xl py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column — wider */}
          <div className="lg:col-span-3">
            <a
              href="https://dsecuretech.com"
              className="inline-flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity"
              title="D-Secure File Eraser — D-Secure Data Erasure"
            >
              <Image
                src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759398294/dsecure/logos/dsecure-logo-white.svg"
                alt="D-Secure File Eraser Logo"
                width={36}
                height={36}
                className="h-8 lg:h-9 w-auto"
                style={{ width: "auto" }}
              />
              {/* <span className="text-lg font-bold text-white tracking-tight">
                D-Secure File Eraser
              </span> */}
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Leading provider of Compliant data erasure solutions for
              enterprises worldwide. Secure your data lifecycle with our
              enterprise-grade security solutions.
            </p>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2 lg:col-start-5">
            <FooterColumn title="Products" links={FOOTER_PRODUCT_LINKS} />
          </div>

          {/* Industries Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Industries" links={FOOTER_INDUSTRY_LINKS} />
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Resources" links={FOOTER_RESOURCE_LINKS} />
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={FOOTER_COMPANY_LINKS} />
          </div>
        </div>
      </div>

      {/* Bottom Bar — copyright + status + policy links + scroll-to-top */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left side — copyright + status */}
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-xs text-slate-500">
              {`© ${currentYear} `}
              <a
                href={"https://dsecuretech.com"}
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                D-Secure Technologies Pvt. Ltd.
              </a>
              {" All rights reserved."}
            </p>
            {/* Status badge */}
            <span className="inline-flex items-center gap-1.5 text-xs text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>{" "}
              All systems operational
            </span>
          </div>

          {/* Right side — policy links */}
          <div className="flex items-center gap-3 flex-wrap">
            {FOOTER_POLICY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-slate-500 hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
