"use client";

// Products Mega Dropdown — Zoho-style tabbed product grid
// Sab links dsecuretech.com pe redirect karte hain
import { useState } from "react";
import { X } from "lucide-react";
import { DSECURE_BASE_URL } from "@/lib/constants";

// Static color class maps — Tailwind dynamic classes purge ho jaate hain
const colorClasses: Record<string, {
  border: string; hoverBorder: string; text: string; hoverText: string;
  bg: string; hoverBg: string; borderPill: string; pulse: string;
}> = {
  emerald: {
    border: "border-emerald-300", hoverBorder: "hover:border-emerald-300",
    text: "text-emerald-700", hoverText: "group-hover:text-emerald-700",
    bg: "bg-emerald-50", hoverBg: "hover:bg-emerald-100",
    borderPill: "border-emerald-200", pulse: "bg-emerald-400",
  },
  blue: {
    border: "border-blue-300", hoverBorder: "hover:border-blue-300",
    text: "text-blue-700", hoverText: "group-hover:text-blue-700",
    bg: "bg-blue-50", hoverBg: "hover:bg-blue-100",
    borderPill: "border-blue-200", pulse: "bg-blue-400",
  },
  cyan: {
    border: "border-cyan-300", hoverBorder: "hover:border-cyan-300",
    text: "text-cyan-700", hoverText: "group-hover:text-cyan-700",
    bg: "bg-cyan-50", hoverBg: "hover:bg-cyan-100",
    borderPill: "border-cyan-200", pulse: "bg-cyan-400",
  },
  teal: {
    border: "border-teal-300", hoverBorder: "hover:border-teal-300",
    text: "text-teal-700", hoverText: "group-hover:text-teal-700",
    bg: "bg-teal-50", hoverBg: "hover:bg-teal-100",
    borderPill: "border-teal-200", pulse: "bg-teal-400",
  },
  rose: {
    border: "border-rose-300", hoverBorder: "hover:border-rose-300",
    text: "text-rose-700", hoverText: "group-hover:text-rose-700",
    bg: "bg-rose-50", hoverBg: "hover:bg-rose-100",
    borderPill: "border-rose-200", pulse: "bg-rose-400",
  },
};

// Helper — color ke liye safe class return karo
const c = (color: string) => colorClasses[color] || colorClasses.emerald;

// Product card ka type definition
interface ProductCard {
  name: string;
  desc: string;
  href: string;
  color: string;
  variants?: { label: string; href: string; color: string; pulse?: boolean }[];
}

// Tab ke andar products ka data — dsecuretech.com ke routes
const TABS: Record<string, { label: string; products: ProductCard[] }> = {
  eraser: {
    label: "Eraser",
    products: [
      {
        name: "Drive Eraser", desc: "Erase HDD, SSD, PC, Mac & Server data permanently.",
        href: `${DSECURE_BASE_URL}/products/drive-eraser`, color: "emerald",
        variants: [
          { label: "Drive Eraser", href: `${DSECURE_BASE_URL}/products/drive-eraser`, color: "emerald" },
          { label: "Diagnostic & Health", href: `${DSECURE_BASE_URL}/products/drive-eraser-diagnostic`, color: "blue", pulse: true },
        ],
      },
      {
        name: "File Eraser", desc: "Wipe files, folders, traces & browser history.",
        href: `${DSECURE_BASE_URL}/products/file-eraser`, color: "blue",
        variants: [
          { label: "Standard", href: `${DSECURE_BASE_URL}/products/file-eraser`, color: "blue" },
          { label: "Network Edition", href: `${DSECURE_BASE_URL}/products/file-eraser-network`, color: "emerald", pulse: true },
        ],
      },
      { name: "Smartphone Eraser", desc: "Bulk iOS & Android wiping with audit reports.", href: `${DSECURE_BASE_URL}/products/smartphone-eraser`, color: "emerald" },
      { name: "Virtual Machine Eraser", desc: "Securely wipe VMs on ESXi & Hyper-V hosts.", href: `${DSECURE_BASE_URL}/products/virtual-machine-eraser`, color: "emerald" },
      { name: "Removable Media Eraser", desc: "Securely erase USB & flash storage devices.", href: `${DSECURE_BASE_URL}/products/removable-media-eraser`, color: "emerald" },
      { name: "LUN Eraser", desc: "Sanitize Logical Unit Numbers in active storage.", href: `${DSECURE_BASE_URL}/products/lun-eraser`, color: "emerald" },
    ],
  },
  migration: {
    label: "Migration",
    products: [
      { name: "Data Migration", desc: "Secure transfer across Cloud & Infrastructure.", href: `${DSECURE_BASE_URL}/products/data-migration`, color: "emerald" },
      { name: "Forensic Imaging", desc: "Bit-for-bit acquisition & cryptographic hashing.", href: `${DSECURE_BASE_URL}/products/forensic-imaging`, color: "cyan" },
      {
        name: "FreezeState", desc: "Reboot-to-restore system protection.",
        href: `${DSECURE_BASE_URL}/products/freeze-state`, color: "blue",
        variants: [
          { label: "Smart Diagnostic", href: `${DSECURE_BASE_URL}/products/freeze-state-smart`, color: "emerald", pulse: true },
          { label: "Advanced Eraser", href: `${DSECURE_BASE_URL}/products/freeze-state-advanced`, color: "blue", pulse: true },
        ],
      },
      { name: "Asset Reimaging", desc: "Automated OS deployment & imaging solution.", href: `${DSECURE_BASE_URL}/products/asset-reimaging`, color: "emerald" },
    ],
  },
  diagnostics: {
    label: "Diagnostics",
    products: [
      { name: "Hardware Diagnostics", desc: "Enterprise-grade diagnostic tools.", href: `${DSECURE_BASE_URL}/products/hardware-diagnostics`, color: "emerald" },
      { name: "Smartphone Diagnostics", desc: "50+ automated tests for mobile health.", href: `${DSECURE_BASE_URL}/products/smartphone-diagnostic`, color: "teal" },
      { name: "SMART Diagnostics", desc: "Health monitoring & disk cloning.", href: `${DSECURE_BASE_URL}/products/hard-drive-monitor`, color: "rose" },
      { name: "Autopilot Detection", desc: "Windows Autopilot identification.", href: `${DSECURE_BASE_URL}/products/autopilot-detection`, color: "emerald" },
    ],
  },
  verification: {
    label: "Verification",
    products: [
      { name: "Erasure Verification", desc: "Forensic verification & post-erasure audit tools.", href: `${DSECURE_BASE_URL}/products/drive-verifier`, color: "emerald" },
    ],
  },
};

// Chevron right SVG icon — reusable
const ChevronRight = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

export default function ProductsDropdown({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("eraser");

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
        aria-label="Close products menu"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR — vertical category tabs */}
        <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto">
          {Object.entries(TABS).map(([key, tab]) => (
            <button
              key={key}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === key
                  ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {tab.label}
              {activeTab === key && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-500" />}
            </button>
          ))}

          {/* Explore All link */}
          <div className="mt-6 px-5">
            <a
              href={`${DSECURE_BASE_URL}/products`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1"
              onClick={onClose}
            >
              Explore All Products <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT — 3-column product grid */}
        <div className="flex-1 overflow-y-auto bg-white px-6 pb-6">
          {/* Sticky category heading */}
          <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
            <div className="text-lg font-bold text-slate-800">{TABS[activeTab].label}</div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            {TABS[activeTab].products.map((product) => {
              const pc = c(product.color);
              return product.variants ? (
                // Variants wale cards — div wrapper
                <div
                  key={product.name}
                  className={`group border border-slate-200 rounded-xl p-5 ${pc.hoverBorder} hover:shadow-md transition-all h-full flex flex-col cursor-pointer`}
                >
                  <h4 className={`font-bold text-slate-900 ${pc.hoverText} transition-colors mb-2`}>
                    {product.name}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">{product.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const vc = c(v.color);
                      return (
                        <a
                          key={v.label}
                          href={v.href}
                          className={`px-3 py-1.5 rounded-full border ${vc.bg} ${vc.hoverBg} ${vc.borderPill} ${vc.text} text-[11px] font-bold transition-all flex items-center gap-1.5`}
                          onClick={onClose}
                        >
                          <span>{v.label}</span>
                          {v.pulse && <span className={`w-1.5 h-1.5 rounded-full ${vc.pulse} animate-pulse`} />}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Simple cards — direct <a> wrapper
                <a
                  key={product.name}
                  href={product.href}
                  className={`group border border-slate-200 rounded-xl p-5 ${pc.hoverBorder} hover:shadow-md transition-all h-full flex flex-col`}
                  onClick={onClose}
                >
                  <h4 className={`font-bold text-slate-900 ${pc.hoverText} transition-colors mb-2`}>
                    {product.name}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-grow">{product.desc}</p>
                  <span className={`text-xs font-semibold ${pc.text} uppercase tracking-wide flex items-center gap-1`}>
                    Learn More <ChevronRight className="w-3 h-3" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
