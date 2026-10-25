"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BUFFET_INFO } from "./BuffetInfo";
import { formatPrice } from "../../lib/formatPrice";

export default function BuffetPricing() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const list = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const card = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={list}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-6"
    >
      <motion.h3
        variants={card}
        className="font-serif text-3xl font-bold text-[#F2A93B] sm:text-4xl"
      >
        {fi ? "Lounaan hinnasto" : "Lunch pricing"}
      </motion.h3>

      <ul className="space-y-4">
        {BUFFET_INFO.tiers.map((tier) => (
          <motion.li
            key={tier.id}
            variants={card}
            whileHover={reduce ? undefined : { x: 4 }}
            className={`flex items-center justify-between gap-4 rounded-3xl border p-5 backdrop-blur-sm transition-colors duration-300 sm:p-6 ${
              tier.featured
                ? "border-[#F2A93B]/55 bg-[#3B1511]/75 shadow-xl shadow-black/40"
                : "border-[#F2A93B]/20 bg-[#1C0D0A]/60 hover:border-[#F2A93B]/45"
            }`}
          >
            <div className="min-w-0">
              <h4 className="font-serif text-xl font-bold text-brand-cream sm:text-2xl">
                {tier.name[lang] || tier.name.fi}
              </h4>
              <p className="mt-1.5 max-w-sm font-sans text-[15px] leading-relaxed text-[#D9C6A8]">
                {tier.desc[lang] || tier.desc.fi}
              </p>
            </div>
            <span className="shrink-0 font-serif text-3xl font-bold text-[#F2A93B] sm:text-4xl">
              {formatPrice(tier.price, lang)}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
