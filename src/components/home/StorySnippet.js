"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, Leaf, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function StorySnippet({ showCta = true }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  const content = {
    fi: {
      quote:
        "Tandoori Koti on aitojen makujen tyyssija, jossa vuosisataiset intialaiset mausteperinteet ja hiiligrillin hehku heräävät eloon joka suupalalla.",
      story:
        "Haluamme tuoda tandoori-keittiön aidon taian Kajaaniin. Valmistamme jokaisen annoksen parhaista raaka-aineista perinteisessä saviuunissa ja tarjoilemme ne lämmöllä, joka saa sinut tuntemaan olosi aivan kuin olisit kotona.",
      locationTag: "Kajaani, Suomi",
      caption: "Ravintolasali",
      imageAlt: "Tandoori Kotin ravintolasali",
      cta: "Lue tarinamme",
      points: [
        "Saviuunissa valmistettu",
        "Tuoreet mausteet",
        "Päivittäin vaihtuva buffet",
      ],
    },
    en: {
      quote:
        "Tandoori Koti is a home for authentic flavour, where centuries of Indian spice tradition and the glow of the clay oven come alive in every bite.",
      story:
        "We bring the magic of a real tandoor kitchen to Kajaani. Every dish is made from the best ingredients, in a traditional clay oven, with the warmth that makes you feel at home.",
      locationTag: "Kajaani, Finland",
      caption: "Our dining room",
      imageAlt: "Tandoori Koti dining room",
      cta: "Read our story",
      points: [
        "Cooked in a clay oven",
        "Fresh spices",
        "Daily changing buffet",
      ],
    },
  };

  const t = content[lang] || content.fi;
  const icons = [Flame, Leaf, UtensilsCrossed];

  // Motion is switched off for visitors who prefer reduced motion
  const container = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.15,
        delayChildren: reduce ? 0 : 0.15,
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
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-20 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(55% 60% at 12% 55%, rgba(200,50,30,.28), transparent 70%), radial-gradient(45% 45% at 95% 15%, rgba(242,169,59,.14), transparent 70%), linear-gradient(200deg, #2A100D, #1C0D0A 70%)",
      }}
    >
      {/* Subtle dot pattern, same as the hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Arch-shaped image (an Indian doorway shape) */}
          <motion.div
            initial={{
              opacity: reduce ? 1 : 0,
              x: reduce ? 0 : -45,
              scale: reduce ? 1 : 0.95,
            }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduce ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0"
          >
            {/* Warm glow behind the arch */}
            <motion.div
              aria-hidden="true"
              animate={
                reduce
                  ? undefined
                  : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,169,59,.4), rgba(200,50,30,.2) 45%, transparent 70%)",
              }}
            />

            {/* Dashed outline, echoing the ring around the hero plate */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border-2 border-dashed border-[#F2A93B]/35"
            />

            <div className="group relative h-[460px] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] border-white/30 shadow-2xl shadow-black/60 md:h-[560px]">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788797208/Ravintola_Tandoori_Koti.jpg"
                alt={t.imageAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A]/70 via-transparent to-transparent" />
            </div>

            {/* Location card, same style as the dish card in the hero */}
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : 0.5,
              }}
              className="absolute -bottom-4 left-4 max-w-[240px] rounded-2xl border border-[#F2A93B]/50 bg-[#1C0D0A]/85 px-4 py-3 backdrop-blur-md sm:-right-4 sm:left-auto"
            >
              <b className="block font-serif text-lg text-[#F2A93B]">
                {t.caption}
              </b>
              <span className="font-sans text-sm text-[#D9C6A8]">
                {t.locationTag}
              </span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            {/* Ornament: line, dot and small leaf shapes drawn in */}
            <motion.div variants={item} className="mb-4">
              <svg
                width="200"
                height="28"
                viewBox="0 0 200 28"
                fill="none"
                aria-hidden="true"
                className="text-[#F2A93B]"
              >
                <motion.path
                  initial={{
                    pathLength: reduce ? 1 : 0,
                    opacity: reduce ? 0.75 : 0,
                  }}
                  whileInView={{ pathLength: 1, opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduce ? 0 : 1.2,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  d="M0 14H70M130 14H200"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <motion.path
                  initial={{
                    pathLength: reduce ? 1 : 0,
                    opacity: reduce ? 0.9 : 0,
                  }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduce ? 0 : 1.4,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  d="M85 14C85 18 92 22 100 22C108 22 115 18 115 14C115 10 108 6 100 6C92 6 85 10 85 14Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <motion.circle
                  initial={{ scale: reduce ? 1 : 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 0.4, delay: 0.5 }}
                  cx="100"
                  cy="14"
                  r="3"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            <motion.blockquote
              variants={item}
              className="font-serif text-3xl font-normal leading-snug text-brand-cream sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]"
            >
              <span aria-hidden="true" className="mr-1 text-[#F2A93B]">
                “
              </span>
              {t.quote}
              <span aria-hidden="true" className="ml-1 text-[#F2A93B]">
                ”
              </span>
            </motion.blockquote>

            <motion.p
              variants={item}
              className="mt-7 max-w-[34em] font-sans text-lg leading-relaxed text-[#D9C6A8]"
            >
              {t.story}
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={item} className="mt-8 flex flex-wrap gap-3">
              {t.points.map((label, i) => {
                const Icon = icons[i];
                return (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-4 py-2 font-sans text-[15px] text-brand-cream backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B]"
                  >
                    <Icon
                      className="h-4 w-4 text-[#F2A93B]"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                );
              })}
            </motion.ul>
            {showCta && (
              <motion.div variants={item} className="mt-9">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                >
                  {t.cta}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
