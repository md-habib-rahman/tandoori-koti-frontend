"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock, Phone, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "+358 44 902 2407";

export default function ReservationCta() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const container = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const facts = [
    {
      icon: UtensilsCrossed,
      text: fi ? "Lounasbuffet ma–pe" : "Lunch buffet Mon–Fri",
    },
    {
      icon: Clock,
      text: fi
        ? "Ma–Pe 10–20, La 11–22, Su 11–20"
        : "Mon–Fri 10–20, Sat 11–22, Sun 11–20",
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(60% 70% at 50% 50%, rgba(200,50,30,.3), transparent 70%), linear-gradient(180deg, #1C0D0A, #2A100D 50%, #1C0D0A)",
      }}
    >
      <style>{`
        @keyframes rcShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .rc-btn:hover .rc-shine { animation: rcShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .rc-btn:hover .rc-shine { animation: none !important; } }
      `}</style>

      {/* Background photo, warmed and kept faint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0D0A] via-[#3B1511]/50 to-[#1C0D0A]" />

      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Pulsing glow behind the content */}
      <motion.div
        aria-hidden="true"
        animate={
          reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,169,59,.35), rgba(200,50,30,.15) 50%, transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <motion.h2
          variants={item}
          className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl"
        >
          {fi ? "Varaa pöytäsi verkossa" : "Book your table online"}
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-[#D9C6A8]"
        >
          {fi
            ? "Varmista paikkasi unohtumattomalle illalliselle tai nauti päivittäisestä runsaasta lounasbuffetista."
            : "Reserve your table for an unforgettable dinner, or drop in for our daily lunch buffet."}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="/contact#reserve"
            className="rc-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-8 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span
              aria-hidden="true"
              className="rc-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
            />
            <span className="relative">
              {fi ? "Varaa pöytä" : "Book a table"}
            </span>
            <ArrowUpRight className="relative h-4 w-4" aria-hidden="true" />
          </Link>

          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE}
          </a>
        </motion.div>

        <motion.ul
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {facts.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-4 py-2 font-sans text-[15px] text-brand-cream backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-[#F2A93B]" aria-hidden="true" />
              {text}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
