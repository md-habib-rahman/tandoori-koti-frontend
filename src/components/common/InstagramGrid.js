"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useInstagramPhotos from "@/hooks/useInstagramPhotos";


// Save as: src/components/common/InstagramGrid.js  (replaces your current one)

const INSTAGRAM_HANDLE = "tandoorikoti";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

// With all six photos: one large tile and five small ones. With fewer, every tile is the same size.
const UNIFORM_COLUMNS = {
  1: "grid-cols-1 mx-auto max-w-md",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-5",
};

function tileClasses(index, total, bento) {
  if (bento) {
    if (index === 0) return "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto";
    if (index === total - 1) return "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square";
    return "aspect-square";
  }
  // On phones an odd photo out gets the full width instead of leaving a gap
  const oddOneOut = total > 1 && total % 2 === 1 && index === total - 1;
  return `aspect-square ${oddOneOut ? "col-span-2 !aspect-[2/1] md:col-span-1 md:!aspect-square" : ""}`;
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="aspect-square animate-pulse rounded-2xl border border-white/10 bg-[#3B1511]/60" />
      ))}
    </div>
  );
}

export default function InstagramGrid() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const { photos, loading, error } = useInstagramPhotos();

  // No photos (or the API is down): leave the section out instead of showing an empty block
  if (!loading && (error || photos.length === 0)) return null;

  const total = photos.length;
  const bento = total === 6;

  const grid = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.1 },
    },
  };
  const tile = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(50% 45% at 92% 15%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 45% at 5% 90%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #170A08, #1C0D0A)",
      }}
    >
      <style>{`
        @keyframes igShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .ig-btn:hover .ig-shine { animation: igShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .ig-btn:hover .ig-shine { animation: none !important; } }
      `}</style>

      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 space-y-4 text-center"
        >
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {fi ? "Seuraa meitä Instagramissa" : "Follow along on Instagram"}
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-serif text-2xl text-[#F2A93B] transition-colors hover:text-[#FFBD57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <InstagramIcon className="h-6 w-6" />@{INSTAGRAM_HANDLE}
          </a>
        </motion.div>

        {loading ? (
          <Skeleton />
        ) : (
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className={`grid gap-3 md:gap-4 ${bento ? "grid-cols-2 md:grid-cols-3" : UNIFORM_COLUMNS[total] || UNIFORM_COLUMNS[5]}`}
          >
            {photos.map((photo, idx) => {
              const large = bento && idx === 0;
              const alt =
                (fi ? photo.altFi || photo.altEn : photo.altEn || photo.altFi) ||
                (fi ? "Kuva Tandoori Kotin Instagramista" : "Photo from Tandoori Koti's Instagram");

              return (
                <motion.a
                  key={photo.id}
                  variants={tile}
                  href={photo.postUrl || INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${alt} (Instagram)`}
                  className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#3B1511] shadow-lg shadow-black/40 transition duration-500 hover:border-[#F2A93B]/60 hover:shadow-[#F2A93B]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B] ${tileClasses(idx, total, bento)}`}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={alt}
                    fill
                    unoptimized
                    sizes={large ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                    className="object-cover transition duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {/* Warm overlay that lifts on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A]/70 via-transparent to-[#3B1511]/20 transition-opacity duration-500 group-hover:opacity-60" />

                  {/* Instagram badge appears on hover */}
                  <span className="absolute right-3 bottom-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#F2A93B] text-[#2A1206] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}

        {/* Follow button */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-8 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span
              aria-hidden="true"
              className="ig-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
            />
            <span className="relative">{fi ? "Katso lisää Instagramissa" : "See more on Instagram"}</span>
            <ArrowUpRight className="relative h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}