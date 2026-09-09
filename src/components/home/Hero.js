"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();

  const content = {
    fi: {
      badge: "Perinteitä & Intohimoa",
      title: "Taste The Difference",
      titleFi: "Aitojen Makujen Koti",
      subtitle:
        "Koe aito intialainen makumatka Tampereella. Perinteisessä saviuunissa valmistetut tandoori-annokset, täyteläiset curryt ja päivittäinen lounasbuffet.",
      exploreBtn: "Tutustu Ruokalistaan",
      buffetBtn: "Päivän Buffet",
    },
    en: {
      badge: "Tradition & Passion",
      title: "Taste The Difference",
      titleFi: "Authentic Culinary Heritage",
      subtitle:
        "Experience the vibrant spices and rich culinary traditions of India in the heart of Tampere. Tandoor-grilled specialties, rich curries, and daily lunch buffet.",
      exploreBtn: "Explore Our Menus",
      buffetBtn: "Daily Buffet",
    },
  };

  const t = content[lang] || content.fi;

  return (
    <section className="relative w-full overflow-hidden bg-brand-dark pt-48 pb-20 md:pt-64 md:pb-28">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Dish Arranger (Matching Reference UI Composition) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto mb-12">
          {/* Left Plate */}
          <div className="hidden md:flex justify-end transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-brand-gold/20 shadow-2xl shadow-black/80">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09464.jpg"
                alt="Indian Main Course"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Showcase Plate */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-brand-gold/40 shadow-2xl shadow-brand-gold/10 scale-105">
              <Image
                src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
                alt="Butter Chicken / Murg Makhani"
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Plate */}
          <div className="hidden md:flex justify-start transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-brand-gold/20 shadow-2xl shadow-black/80">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09476.jpg"
                alt="Saffron Biryani"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Hero Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold">
            {t.badge}
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-brand-cream font-bold tracking-tight leading-[1.1]">
            {t.title}
          </h1>

          <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-brand-gold text-brand-darker hover:bg-brand-goldLight text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md shadow-brand-gold/10"
            >
              {t.exploreBtn}
            </Link>

            <Link
              href="/buffet"
              className="px-8 py-3.5 border border-brand-gold/50 text-brand-cream hover:border-brand-gold hover:text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              {t.buffetBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
