"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function StorySnippet() {
  const { lang } = useLanguage();

  const content = {
    fi: {
      tag: "PERINTEITÄ & TUNNELMAA",
      quote:
        "Tandoori Koti on aitojen makujen tyyssija, jossa vuosisataiset intialaiset mausteperinteet ja hiiligrillin hehku heräävät eloon joka suupalalla.",
      story:
        "Haluamme tuoda Tampereelle aitoa tandoorikeittiön taikaa. Valmistamme jokaisen annoksen parhaista raaka-aineista, perinteisellä saviuunilla ja lämmöllä, joka saa sinut tuntemaan olosi kotoisaksi.",
      locationTag: "Tampere, Finland",
      caption: "Tandoori Koti Dining Room",
    },
    en: {
      tag: "HERITAGE & AMBIENCE",
      quote:
        "Tandoori Koti is a premium taste that yearns to be savored, bringing centuries of authentic Indian spicecraft and clay-oven warmth to every bite.",
      story:
        "We craft our dishes using time-honored Indian traditions, roasting fresh naan and tandoori meats over live heat, pairing bold aromatic spices with an intimate dining experience.",
      locationTag: "Kajani, Finland",
      caption: "Tandoori Koti Dining Room",
    },
  };

  const t = content[lang] || content.fi;

  return (
    <section className="relative w-full py-20 md:py-32 bg-brand-dark border-t border-brand-gold/10 overflow-hidden">
      {/* Animated Ambient Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Animated Vertical Mood Interior */}
          <motion.div
            initial={{ opacity: 0, x: -45, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md h-[460px] md:h-[540px] rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl shadow-black/90 group">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788797208/Ravintola_Tandoori_Koti.jpg"
                alt="Tandoori Koti Restaurant Ambience"
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/20 to-transparent" />

              {/* Floating Glassmorphic Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-brand-darker/70 backdrop-blur-md border border-brand-gold/20"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
                  {t.locationTag}
                </span>
                <p className="font-serif text-base sm:text-lg text-brand-cream mt-0.5">
                  {t.caption}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Staggered Narrative Typography & Animated Filigree */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 space-y-7"
          >
            <motion.p
              variants={textItemVariants}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold"
            >
              {t.tag}
            </motion.p>

            <motion.blockquote
              variants={textItemVariants}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cream leading-snug font-normal"
            >
              "{t.quote}"
            </motion.blockquote>

            <motion.p
              variants={textItemVariants}
              className="text-sm sm:text-base text-brand-muted font-sans leading-relaxed max-w-xl"
            >
              {t.story}
            </motion.p>

            {/* SVG Filigree with Animated Path Draw */}
            <motion.div variants={textItemVariants} className="pt-2">
              <svg
                width="220"
                height="32"
                viewBox="0 0 200 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-gold"
              >
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  d="M0 14H60M140 14H200"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  cx="100"
                  cy="14"
                  r="3"
                  fill="currentColor"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
                  d="M85 14C85 18 92 22 100 22C108 22 115 18 115 14C115 10 108 6 100 6C92 6 85 10 85 14Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  d="M72 14C72 16 76 18 80 18C84 18 88 16 88 14"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  d="M112 14C112 16 116 18 120 18C124 18 128 16 128 14"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
