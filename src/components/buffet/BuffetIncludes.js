"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Coffee } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BUFFET_INFO } from "./BuffetInfo";


export default function BuffetIncludes() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const list = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.1 },
    },
  };
  const row = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={list}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-7"
    >
      <motion.h2
        variants={row}
        className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl"
      >
        {fi ? "Mitä buffet sisältää?" : "What's included in the buffet?"}
      </motion.h2>

      <ul className="space-y-3">
        {BUFFET_INFO.features.map((feature) => (
          <motion.li
            key={feature.en}
            variants={row}
            className="flex items-center gap-4 rounded-2xl border border-[#F2A93B]/15 bg-[#1C0D0A]/50 px-4 py-3.5 backdrop-blur-sm"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F2A93B] text-[#2A1206]">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-sans text-base leading-snug text-brand-cream sm:text-lg">
              {feature[lang] || feature.fi}
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.p
        variants={row}
        className="inline-flex items-center gap-3 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-5 py-2.5 font-sans text-[15px] text-brand-cream"
      >
        <Coffee className="h-4 w-4 shrink-0 text-[#F2A93B]" aria-hidden="true" />
        {fi
          ? "Kahvi ja tee sisältyvät aina hintaan."
          : "Coffee and tea are always included with the buffet."}
      </motion.p>
    </motion.div>
  );
}