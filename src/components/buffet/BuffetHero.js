"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Clock, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "../../lib/formatPrice";
import { BUFFET_INFO } from "./BuffetInfo";

export default function BuffetHero() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const buffetPrice = BUFFET_INFO.tiers.find((tier) => tier.featured)?.price;

  const container = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative flex min-h-100 w-full items-center justify-center overflow-hidden md:min-h-125">
      <style>{`
    @keyframes bhShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
    .bh-btn:hover .bh-shine { animation: bhShine .9s ease; }
    @media (prefers-reduced-motion: reduce) { .bh-btn:hover .bh-shine { animation: none !important; } }
  `}</style>

      {/* Background, same treatment as the contact hero */}
      <Image
        src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09463.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center brightness-75 scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand-darker/60 via-brand-darker/40 to-brand-dark" />

      {/* Top padding clears the fixed navbar */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 pt-40 pb-20 text-center sm:px-6 md:pt-52 md:pb-28"
      >
        <motion.nav variants={item} aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center justify-center gap-1.5 font-sans text-[15px] text-[#D9C6A8]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {fi ? "Koti" : "Home"}
              </Link>
            </li>
            <ChevronRight
              className="h-4 w-4 text-[#F2A93B]/60"
              aria-hidden="true"
            />
            <li aria-current="page" className="text-[#F2A93B]">
              {fi ? "Lounasbuffet" : "Lunch buffet"}
            </li>
          </ol>
        </motion.nav>

        <motion.h1
          variants={item}
          className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-6xl lg:text-7xl"
        >
          {fi ? "Lounasbuffet" : "Lunch buffet"}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-[#D9C6A8]"
        >
          {fi
            ? "Runsas intialainen lounasbuffet. Päivittäin vaihtuvat lämpimät tandoori- ja curryannokset, tuore naan-leipä, raikas salaattipöytä sekä kahvi ja tee."
            : "A generous Indian lunch buffet. Daily rotating hot tandoori and curry dishes, fresh naan, a crisp salad bar, and coffee or spiced chai."}
        </motion.p>

        {/* Hours and price */}
        <motion.ul
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <li className="flex items-center gap-2 rounded-full border border-[#F2A93B]/40 bg-[#1C0D0A]/70 px-4 py-2 font-sans text-[15px] text-brand-cream backdrop-blur-sm">
            <Clock className="h-4 w-4 text-[#F2A93B]" aria-hidden="true" />
            {BUFFET_INFO.hours[lang] || BUFFET_INFO.hours.fi}
          </li>
          {buffetPrice && (
            <li className="flex items-center gap-2 rounded-full border border-[#F2A93B]/40 bg-[#1C0D0A]/70 px-4 py-2 font-sans text-[15px] text-brand-cream backdrop-blur-sm">
              <Tag className="h-4 w-4 text-[#F2A93B]" aria-hidden="true" />
              {formatPrice(buffetPrice, lang)}
            </li>
          )}
        </motion.ul>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <a
            href="#weekly-menu"
            className="bh-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F2A93B] px-8 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span
              aria-hidden="true"
              className="bh-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
            />
            <span className="relative">
              {fi ? "Katso viikon lista" : "See this week's menu"}
            </span>
          </a>
          <Link
            href="/contact#reserve"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            {fi ? "Varaa pöytä" : "Book a table"}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
