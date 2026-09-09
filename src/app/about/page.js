"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ChefRecommend from "@/components/home/ChefRecommend";
import ReservationCta from "@/components/common/ReservationCta";
import InstagramGrid from "@/components/common/InstagramGrid";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
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

export default function AboutPage() {
  const { lang } = useLanguage();

  const content = {
    fi: {
      badge: "TARINAMME & FILOSOFIAMME",
      title: "Good food and Great vibes",
      subtitle:
        "Tandoori Koti syntyi intohimosta aitoon intialaiseen ruokakulttuuriin, tulisiin hiiligrilleihin ja lämpimään vieraanvaraisuuteen Tampereen sydämessä.",
      p1: "Meille ruoanlaitto on kunnianosoitus vuosisatoja vanhoille resepteille. Jokainen curry haudutetaan hitaasti omassa mausteliemessään, ja tandoorileivät sekä vartaat paistetaan perinteisessä saviuunissa juuri oikean hiiltyneen maun saavuttamiseksi.",
      p2: "Uskomme, että paras ateria syntyy paitsi ensiluokkaisista raaka-aineista, myös tunnelmasta: viihtyisästä miljööstä, jaetusta ilosta ja aidosta välittämisestä.",
      stats: [
        { label: "Vuotta Kokemusta", value: "15+" },
        { label: "Aitoja Reseptejä", value: "70+" },
        { label: "Päivittäinen Buffet", value: "100%" },
      ],
    },
    en: {
      badge: "OUR HERITAGE & PHILOSOPHY",
      title: "Good food and Great vibes",
      subtitle:
        "Tandoori Koti was born from an unwavering passion for authentic Indian cuisine, live charcoal tandoor ovens, and warm, memorable hospitality in Tampere.",
      p1: "Cooking to us is a celebration of time honored spicecraft. Every curry is slow simmered in small batches, while our signature naan and skewers are roasted inside a traditional clay tandoor to achieve that irreplaceable smoky depth.",
      p2: "We believe dining is an experience where authentic flavor meets an inviting ambience warm lighting, comforting spices, and a table shared with friends.",
      stats: [
        { label: "Years of Culinary Heritage", value: "15+" },
        { label: "Authentic Recipes", value: "70+" },
        { label: "Fresh Daily Buffet", value: "100%" },
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <div className="w-full bg-brand-dark text-brand-cream overflow-hidden">
      {/* ----------------- SECTION 1: ABOUT HERO ----------------- */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-32">
        {/* Ambient Glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-gold/15 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 space-y-16">
          {/* Header Typography */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <motion.span
              variants={textItemVariants}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold inline-block"
            >
              {t.badge}
            </motion.span>

            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-brand-cream font-bold tracking-tight leading-[1.1]"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={textItemVariants}
              className="text-base sm:text-lg text-brand-muted font-sans leading-relaxed max-w-2xl mx-auto pt-2"
            >
              {t.subtitle}
            </motion.p>
          </motion.div>

          {/* Center Showcase Plate (Matching About.jpg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, type: "spring", stiffness: 90 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer Decorative Halo Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-brand-gold/25 pointer-events-none"
              />

              {/* Levitation Plate Frame */}
              <motion.div
                animate={{ y: [-7, 7, -7] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-gold/40 shadow-2xl shadow-black"
              >
                <Image
                  src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09464.jpg"
                  alt="Tandoori Koti Culinary Art"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Narrative Paragraphs & Brand Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 text-sm md:text-base text-brand-muted leading-relaxed font-sans"
          >
            <p className="bg-brand-card/60 p-6 rounded-2xl border border-brand-gold/15 backdrop-blur-xs">
              {t.p1}
            </p>
            <p className="bg-brand-card/60 p-6 rounded-2xl border border-brand-gold/15 backdrop-blur-xs">
              {t.p2}
            </p>
          </motion.div>

          {/* Metric Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 border-t border-brand-gold/15"
          >
            {t.stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-gold">
                  {stat.value}
                </span>
                <p className="text-[11px] sm:text-xs text-brand-muted uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- SECTION 2: CHEF RECOMMEND ----------------- */}
      <ChefRecommend />

      {/* ----------------- SECTION 3: RESERVATION CTA ----------------- */}
      <ReservationCta />

      {/* ----------------- SECTION 4: SOCIAL AMBIENCE GALLERY --------- */}
      <InstagramGrid />
    </div>
  );
}
