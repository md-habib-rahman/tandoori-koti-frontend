"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactHero({ badge, title }) {
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
      {/* Background, same as the buffet hero */}
      <Image
        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80"
        alt="Outdoor dining table"
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
              {title}
            </li>
          </ol>
        </motion.nav>

        {badge && (
          <motion.span
            variants={item}
            className="block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#F2A93B]"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          variants={item}
          className="mt-4 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
      </motion.div>
    </section>
  );
}
