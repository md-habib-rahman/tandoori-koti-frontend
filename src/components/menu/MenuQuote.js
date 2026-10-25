"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MenuQuote() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const quote = fi
    ? "Tandoori Koti tarjoaa ensiluokkaisen makumatkan, jossa jokainen suupala tuo lautasellesi aitoja intialaisia mausteita ja uunin lämpöä."
    : "Tandoori Koti offers a first-class journey of flavour, where every bite brings authentic Indian spices and the warmth of the clay oven to your plate.";

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#F2A93B]/15 px-4 py-20 text-center sm:px-6 md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(60% 80% at 50% 50%, rgba(200,50,30,.3), transparent 70%), linear-gradient(180deg, #1C0D0A, #2A100D 50%, #1C0D0A)",
      }}
    >
      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-4xl space-y-8"
      >
        <blockquote className="font-serif text-3xl font-normal leading-snug text-brand-cream sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
          <span aria-hidden="true" className="mr-1 text-[#F2A93B]">“</span>
          {quote}
          <span aria-hidden="true" className="ml-1 text-[#F2A93B]">”</span>
        </blockquote>

        <div className="flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-[#F2A93B]/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#F2A93B]" />
          <span className="h-px w-16 bg-[#F2A93B]/40" />
        </div>
      </motion.div>
    </section>
  );
}