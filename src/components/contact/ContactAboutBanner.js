"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Teaser that links to the About page.
//   <ContactAboutBanner t={t} />
// `t` needs: aboutBannerHeading, aboutBannerDesc, aboutBannerBtn
// (aboutBannerTag is no longer shown: the small uppercase label was removed from the design)
export default function ContactAboutBanner({ t }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const container = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.13,
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

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#F2A93B]/15 py-20 md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(55% 60% at 90% 50%, rgba(200,50,30,.28), transparent 70%), radial-gradient(40% 45% at 5% 10%, rgba(242,169,59,.12), transparent 70%), linear-gradient(170deg, #2A100D, #1C0D0A 70%)",
      }}
    >
      {/* Dot pattern, same as the other sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Text */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 lg:col-span-6"
        >
          {/* Small diamond divider */}
          <motion.div
            variants={item}
            className="flex items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-[#F2A93B]/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#F2A93B]" />
            <span className="h-px w-12 bg-[#F2A93B]/40" />
          </motion.div>

          <motion.h2
            variants={item}
            className="font-serif text-4xl leading-[1.1] font-bold tracking-tight whitespace-pre-line text-brand-cream sm:text-5xl lg:text-6xl"
          >
            {t.aboutBannerHeading}
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-md font-sans text-lg leading-relaxed text-[#D9C6A8]"
          >
            {t.aboutBannerDesc}
          </motion.p>

          <motion.div variants={item} className="pt-2">
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              {t.aboutBannerBtn}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{
            opacity: reduce ? 1 : 0,
            x: reduce ? 0 : 45,
            scale: reduce ? 1 : 0.96,
          }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:col-span-6 lg:mr-0 lg:ml-auto"
        >
          {/* Warm glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(242,169,59,.3), rgba(200,50,30,.18) 45%, transparent 70%)",
            }}
          />
          {/* Dashed outline */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 sm:block"
          />

          <div className="group relative h-72 overflow-hidden rounded-3xl border-[5px] border-white/25 shadow-2xl shadow-black/60 sm:h-80">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
              alt={
                fi
                  ? "Tandoori Kotin keittiön annos"
                  : "A dish from the Tandoori Koti kitchen"
              }
              fill
              unoptimized
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A]/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
