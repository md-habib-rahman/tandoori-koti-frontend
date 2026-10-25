"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHero() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

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
      {/* Background, same treatment as the buffet, menu and contact heroes */}
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
        {/* Breadcrumb */}
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
              {fi ? "Tarinamme" : "Our story"}
            </li>
          </ol>
        </motion.nav>

        <motion.h1
          variants={item}
          className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-6xl lg:text-7xl"
        >
          {fi ? "Tarinamme" : "Our story"}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-[#D9C6A8]"
        >
          {fi
            ? "Aitoa tandoorikeittiön taikaa: parhaista raaka-aineista, perinteisellä saviuunilla ja lämmöllä, joka saa sinut tuntemaan olosi kotoisaksi."
            : "The magic of a real tandoor kitchen: the best ingredients, a traditional clay oven, and a warmth that makes you feel at home."}
        </motion.p>

        {/* Ornament: line, diamond, line */}
        <motion.div
          variants={item}
          className="mt-8 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-16 bg-[#F2A93B]/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#F2A93B]" />
          <span className="h-px w-16 bg-[#F2A93B]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
