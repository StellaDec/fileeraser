"use client";

// Solutions Mega Dropdown — Zoho-style tabbed solutions grid
// Sab links dsecuretech.com pe redirect karte hain
import { useState } from "react";
import { X } from "lucide-react";
import { DSECURE_BASE_URL } from "@/lib/constants";

// Static color class map — Tailwind dynamic classes purge na ho
const colorClasses: Record<string, {
  hoverBorder: string; text: string; hoverText: string;
}> = {
  orange: { hoverBorder: "hover:border-orange-300", text: "text-orange-600", hoverText: "group-hover:text-orange-700" },
  blue:    { hoverBorder: "hover:border-blue-300",    text: "text-blue-600",    hoverText: "group-hover:text-blue-700" },
  cyan:    { hoverBorder: "hover:border-cyan-300",    text: "text-cyan-600",    hoverText: "group-hover:text-cyan-700" },
  amber:    { hoverBorder: "hover:border-amber-300",    text: "text-amber-600",    hoverText: "group-hover:text-amber-700" },
  rose:    { hoverBorder: "hover:border-rose-300",    text: "text-rose-600",    hoverText: "group-hover:text-rose-700" },
};

const c = (color: string) => colorClasses[color] || colorClasses.orange;

// Solution card ka type
interface SolutionCard {
  name: string;
  desc: string;
  href: string;
  color: string;
}

// Tab data — dsecuretech.com ke solution routes
const TABS: Record<string, { label: string; solutions: SolutionCard[] }> = {
  industry: {
    label: "Industries",
    solutions: [
      { name: "Enterprise", desc: "Data security and sanitization for global corporations.", href: `${DSECURE_BASE_URL}/solutions/enterprise`, color: "orange" },
      { name: "Banking & Finance", desc: "Compliance-driven erasure for financial institutions.", href: `${DSECURE_BASE_URL}/solutions/data-erasure-banking-finance`, color: "orange" },
      { name: "Government", desc: "Secure sanitization for public sector & defense.", href: `${DSECURE_BASE_URL}/solutions/government`, color: "orange" },
      { name: "Healthcare", desc: "Privacy-first data disposal for healthcare providers.", href: `${DSECURE_BASE_URL}/solutions/healthcare`, color: "orange" },
      { name: "Education", desc: "Managing data privacy across academic institutions.", href: `${DSECURE_BASE_URL}/solutions/education`, color: "orange" },
      { name: "Non-Profit", desc: "Secure data disposal for NGOs & charities.", href: `${DSECURE_BASE_URL}/solutions/non-profit`, color: "orange" },
    ],
  },
  specialized: {
    label: "Specialized",
    solutions: [
      { name: "Service Providers", desc: "Scaleable erasure services for MSPs and MSSPs.", href: `${DSECURE_BASE_URL}/solutions/service-providers`, color: "amber" },
      { name: "ITAD", desc: "Maximize asset value with secure disposal workflows.", href: `${DSECURE_BASE_URL}/solutions/itad`, color: "cyan" },
    ],
  },
};

// Chevron Right icon
const ChevronRight = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

export default function SolutionsDropdown({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("industry");

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
        aria-label="Close solutions menu"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto">
          {Object.entries(TABS).map(([key, tab]) => (
            <button
              key={key}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === key
                  ? "text-orange-700 bg-white border-r-2 border-orange-500 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {tab.label}
              {activeTab === key && <ChevronRight className="w-3.5 h-3.5 ml-auto text-orange-500" />}
            </button>
          ))}

          <div className="mt-6 px-5 text-center">
            <a
              href={`${DSECURE_BASE_URL}/solutions`}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors inline-block w-full text-center"
              onClick={onClose}
            >
              All Solutions
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT — 3-column grid */}
        <div className="flex-1 overflow-y-auto bg-white px-6 pb-6">
          <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
            <h3 className="text-lg font-bold text-slate-800">
              {activeTab === "industry" ? "By Industry" : "Specialized Segments"}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            {TABS[activeTab].solutions.map((sol) => {
              const sc = c(sol.color);
              return (
                <a
                  key={sol.name}
                  href={sol.href}
                  className={`group border border-slate-200 rounded-xl p-5 ${sc.hoverBorder} hover:shadow-md transition-all`}
                  onClick={onClose}
                >
                  <h4 className={`font-bold text-slate-900 ${sc.hoverText} transition-colors mb-2`}>
                    {sol.name}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{sol.desc}</p>
                  <span className={`text-xs font-semibold ${sc.text} uppercase tracking-wide flex items-center gap-1`}>
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
