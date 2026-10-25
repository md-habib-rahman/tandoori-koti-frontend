"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "../../lib/formatPrice";

// One editorial block: a framed photo on one side, a short intro and dish list on the other.
// Set `reverse` to flip the sides.
export default function MenuShowcaseBlock({ section, reverse = true }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const pick = (o) => o[lang] || o.fi;
  const side = reverse ? 1 : -1; // which side the photo slides in from

  const list = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const row = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
      {/* Photo */}
      <motion.div
        initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : side * 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 ${
          reverse ? "lg:order-2" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-8 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(242,169,59,.3), rgba(200,50,30,.18) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -inset-3 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 sm:block"
        />
        <div className="group relative h-[400px] overflow-hidden rounded-3xl border-[5px] border-white/25 shadow-2xl shadow-black/60 sm:h-[480px]">
          <Image
            src={section.image}
            alt={pick(section.alt)}
            fill
            unoptimized
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A]/60 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Text and dishes */}
      <div className={`space-y-7 lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <span className="inline-flex rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-4 py-1.5 font-sans text-sm font-semibold text-[#F2A93B]">
            {pick(section.tag)}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl">
            {pick(section.title)}
          </h2>
          <p className="max-w-xl font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {pick(section.desc)}
          </p>
        </motion.div>

        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-1 rounded-3xl border border-[#F2A93B]/20 bg-[#1C0D0A]/60 p-3 backdrop-blur-sm sm:p-4"
        >
          {section.items.map((item) => (
            <motion.li
              key={item.name.en}
              variants={row}
              whileHover={reduce ? undefined : { x: 4 }}
              className={`rounded-2xl border p-3 transition-colors duration-300 sm:p-4 ${
                item.featured
                  ? "border-[#F2A93B]/50 bg-[#3B1511]/70 shadow-md shadow-black/30"
                  : "border-transparent hover:border-[#F2A93B]/25 hover:bg-[#3B1511]/30"
              }`}
            >
              <div className="flex items-end gap-3">
                <h3 className="font-serif text-lg font-bold leading-snug text-brand-cream sm:text-xl">
                  {pick(item.name)}
                </h3>
                {item.featured && (
                  <span className="mb-0.5 hidden shrink-0 items-center gap-1 rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-2.5 py-0.5 font-sans text-xs font-semibold text-[#F2A93B] sm:inline-flex">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    {fi ? "Suosikki" : "Favourite"}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="mb-1.5 min-w-4 flex-1 border-b border-dotted border-[#F2A93B]/35"
                />
                <span className="shrink-0 font-serif text-lg font-bold text-[#F2A93B] sm:text-xl">
                  {formatPrice(item.price, lang)}
                </span>
              </div>
              <p className="mt-1.5 max-w-[34em] font-sans text-[15px] leading-relaxed text-[#D9C6A8] sm:text-base">
                {pick(item.desc)}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
