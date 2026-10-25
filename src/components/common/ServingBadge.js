"use client";

import { Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { servingText } from "@/lib/servingText";

// Small pill such as "Serves 2 · 6 pcs". Renders nothing when the dish has no serving info.
// Save as: src/components/common/ServingBadge.js
export default function ServingBadge({ dish, className = "" }) {
  const { lang } = useLanguage();
  const text = servingText(dish, lang);
  if (!text) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-2.5 py-0.5 font-sans text-sm text-brand-cream ${className}`}
    >
      <Users
        className="h-3.5 w-3.5 shrink-0 text-[#F2A93B]"
        aria-hidden="true"
      />
      {text}
    </span>
  );
}
