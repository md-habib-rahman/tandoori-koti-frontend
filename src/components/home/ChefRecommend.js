"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

const CHEF_PICKS = [
  {
    id: "butter-chicken",
    nameEn: "Murg Makhani (Butter Chicken)",
    nameFi: "Murg Makhani (Voikana)",
    descEn:
      "Char-grilled tandoori chicken simmered in a silky tomato, cashew cream, and churned butter sauce.",
    descFi:
      "Tandoorigrillattua kanaa haudutettuna pehmeässä tomaatti-, cashewkerma- ja voikastikkeessa.",
    price: "17.50",
    tagEn: "House Signature",
    tagFi: "Talon Suosikki",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "sizzler",
    nameEn: "Tandoori Mix Tikka Sizzler",
    nameFi: "Tandoori Mix Tikka Sizzler",
    descEn:
      "Marinated chicken tikka, lamb tikka, and cottage cheese roasted over live coals, served on a sizzling hot plate.",
    descFi:
      "Marinoitua kanaa, lammasta ja tuorejuustoa grillattuna tandoorissa, tarjoiltuna tirisevällä valurautapannulla.",
    price: "20.50",
    tagEn: "Sizzling Special",
    tagFi: "Tirisevä Erikoisuus",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/1f/16/81/37/chicken-tikka-sizzler.jpg",
    thumb:
      "https://media-cdn.tripadvisor.com/media/photo-s/1f/16/81/37/chicken-tikka-sizzler.jpg",
  },
  {
    id: "palak-paneer",
    nameEn: "Palak Paneer",
    nameFi: "Palak Paneer",
    descEn:
      "Fresh house-made cottage cheese cubes steeped in a rich, slow-simmered garlic spinach gravy.",
    descFi:
      "Talon tuorejuustokuutioita haudutettuna miedosti maustetussa, täyteläisessä valkosipulipinaatissa.",
    price: "15.50",
    tagEn: "Vegetarian Delicacy",
    tagFi: "Kasvisherkku",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "lamb-rogan",
    nameEn: "Mutton Rogan Josh",
    nameFi: "Mutton Rogan Josh",
    descEn:
      "Tender lamb chunks braised with Kashmiri red chilies, roasted cloves, green cardamom, and rich onion gravy.",
    descFi:
      "Mureaa lammasta haudutettuna kashmirilaisessa chili-, kardemumma- ja aromaattisessa yrttikastikkeessa.",
    price: "18.90",
    tagEn: "Kashmiri Classic",
    tagFi: "Kashmiri-Klassikko",
    image:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=200&q=80",
  },
];

export default function ChefRecommend() {
  const { lang } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeDish = CHEF_PICKS[selectedIndex];

  return (
    <section className="relative w-full py-24 md:py-32 bg-brand-darker border-t border-brand-gold/15 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09469.jpg"
          alt="Culinary background"
          fill
          priority
          unoptimized
          className="object-cover object-right opacity-50"
        />
        {/* Dark Gradient Overlay to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-darker/10 to-brand-darker" />
      </div>

      {/* Ambient Radial Glow */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />
      {/* Ambient Backdrop Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
        {/* Section Header with Staggered Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold">
            {lang === "fi"
              ? "KOKIN ERIKOISUUDET"
              : "CHEF'S SIGNATURE SELECTION"}
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-cream font-bold tracking-tight">
            {lang === "fi" ? "Keittiömestarin Suositus" : "Our Chef Recommend"}
          </h2>

          <p className="text-sm md:text-base text-brand-muted font-sans leading-relaxed">
            {lang === "fi"
              ? "Tarkoin valitut nimikkoannoksemme heijastavat intialaisen keittiön aidoimpia vivahteita ja tandooriuunimme parasta antia."
              : "Carefully selected signature recipes capturing the depth, aroma, and fiery perfection of traditional Indian tandoor cooking."}
          </p>
        </motion.div>

        {/* Interactive Showcase: Featured Plate & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Center: Animated Circular Hero Plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
            className="lg:col-span-7 flex justify-center"
          >
            <div className="relative">
              {/* Outer Golden Halo Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-brand-gold/30 pointer-events-none"
              />

              {/* Main Showcase Plate with Gentle Levitation */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-gold/40 shadow-2xl shadow-black"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDish.id}
                    initial={{ opacity: 0, scale: 1.1, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotate: 8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeDish.image}
                      alt={activeDish.nameEn}
                      fill
                      unoptimized
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Active Dish Information & Order CTA */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-brand-gold bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-full font-semibold">
                  {lang === "fi" ? activeDish.tagFi : activeDish.tagEn}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-brand-cream font-bold">
                  {lang === "fi" ? activeDish.nameFi : activeDish.nameEn}
                </h3>

                <p className="text-sm sm:text-base text-brand-muted font-sans leading-relaxed">
                  {lang === "fi" ? activeDish.descFi : activeDish.descEn}
                </p>

                <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-2xl font-serif font-bold text-brand-gold">
                    €{activeDish.price}
                  </span>
                  <Link
                    href="/menu"
                    className="px-6 py-2.5 bg-brand-gold text-brand-darker hover:bg-brand-goldLight text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md shadow-brand-gold/10"
                  >
                    {lang === "fi" ? "Koko Menu" : "View Full Menu"}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Selector (Matching Reference Card Row) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-brand-gold/25 bg-brand-card/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CHEF_PICKS.map((dish, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <motion.button
                  key={dish.id}
                  onClick={() => setSelectedIndex(idx)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-3 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 text-center ${
                    isSelected
                      ? "bg-brand-gold/15 border border-brand-gold shadow-lg shadow-brand-gold/10"
                      : "border border-transparent hover:border-brand-gold/30 hover:bg-brand-darker/60"
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-brand-gold/40 shadow-md">
                    <Image
                      src={dish.thumb}
                      alt={dish.nameEn}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-serif font-bold truncate ${isSelected ? "text-brand-gold" : "text-brand-cream"}`}
                    >
                      {lang === "fi" ? dish.nameFi : dish.nameEn}
                    </p>
                    <span className="text-[11px] text-brand-muted font-sans font-medium">
                      €{dish.price}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 h-1 w-10 bg-brand-gold rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
