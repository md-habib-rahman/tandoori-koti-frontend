"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Clock,
  Sparkles,
  Check,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ReservationCta from "@/components/common/ReservationCta";
import InstagramGrid from "@/components/common/InstagramGrid";

const DAY_NAMES = {
  0: { fi: "Sunnuntai", en: "Sunday", key: "sun" },
  1: { fi: "Maanantai", en: "Monday", key: "mon" },
  2: { fi: "Tiistai", en: "Tuesday", key: "tue" },
  3: { fi: "Keskiviikko", en: "Wednesday", key: "wed" },
  4: { fi: "Torstai", en: "Thursday", key: "thu" },
  5: { fi: "Perjantai", en: "Friday", key: "fri" },
  6: { fi: "Lauantai", en: "Saturday", key: "sat" },
};

export default function BuffetPage() {
  const { lang } = useLanguage();
  const carouselRef = useRef(null);

  const [cardsToDisplay, setCardsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMenuData, setHasMenuData] = useState(false);

  useEffect(() => {
    const fetchBuffet = async () => {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

        // Query the buffet endpoint (omitting rigid date params to get full available week data)
        const res = await axios.get(`${baseUrl}/menu/buffet`);
        const rawData = res.data?.data || res.data || {};

        const entries = Array.isArray(rawData)
          ? rawData
          : Object.entries(rawData).map(([key, val]) => ({
              dateKey: key,
              ...(typeof val === "object" ? val : { dishes: val }),
            }));

        if (entries.length > 0) {
          const now = new Date();
          const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

          // Sort entries chronologically
          const sorted = [...entries].sort((a, b) => {
            const dateA = new Date(a.date || a.dateKey || a.createdAt || 0);
            const dateB = new Date(b.date || b.dateKey || b.createdAt || 0);
            return dateA - dateB;
          });

          // Normalize each record into a renderable card
          const formattedCards = sorted.map((item, index) => {
            const rawDateStr = item.date || item.dateKey;
            const parsedDate = rawDateStr ? new Date(rawDateStr) : null;
            const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

            const dayIndex = isValidDate
              ? parsedDate.getDay()
              : item.dayIndex !== undefined
                ? item.dayIndex
                : index + 1;

            const dayInfo = DAY_NAMES[dayIndex] || {
              fi: `Päivä ${index + 1}`,
              en: `Day ${index + 1}`,
              key: `day-${index}`,
            };

            const isoDate = isValidDate
              ? `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`
              : rawDateStr || `day-${index}`;

            const formattedDate = isValidDate
              ? parsedDate.toLocaleDateString("fi-FI", {
                  day: "2-digit",
                  month: "2-digit",
                })
              : "";

            return {
              id: item.id || item._id || isoDate,
              key: dayInfo.key || `day-${index}`,
              fi: dayInfo.fi,
              en: dayInfo.en,
              formattedDate,
              isoDate,
              isToday: isoDate === todayStr,
              dishes: item.dishes || (Array.isArray(item) ? item : []),
            };
          });

          setCardsToDisplay(formattedCards);
          setHasMenuData(true);
        } else {
          setHasMenuData(false);
          setCardsToDisplay([]);
        }
      } catch (err) {
        console.error("Error loading buffet menu:", err);
        setHasMenuData(false);
        setCardsToDisplay([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBuffet();
  }, []);

  // Center/scroll to today's card once loaded
  useEffect(() => {
    if (carouselRef.current && hasMenuData) {
      const todayEl = carouselRef.current.querySelector("[data-today='true']");
      if (todayEl) {
        todayEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [hasMenuData, cardsToDisplay]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const content = {
    fi: {
      badge: "ARKISIN 10:30 – 14:30",
      title: "Lounasbuffet",
      subtitle:
        "Kajaanin kattavin intialainen lounasbuffet. Tarjolla on päivittäin vaihtuva valikoima lämpimiä tandoori- ja curryruokia, tuoretta naan-leipää, raikas salaattipöytä sekä kahvia ja teetä.",
      todayTag: "TÄNÄÄN",
      nextWeekTag: "ENSI VIIKON MENU",
      noMenu:
        "Lounasbuffet-listaa ei ole saatavilla juuri nyt. Tarkista hetken kuluttua uudelleen.",
      allInclusiveTag: "KAIKKI SISÄLTYY HINTAAN",
      allInclusiveTitle: "Mitä Buffet Sisältää?",
      pricingTitle: "Lounaan Hinnasto",
      prices: [
        {
          name: "Lounasbuffet",
          price: "13.90 €",
          desc: "Sisältää kaikki lämpimät ruoat, salaattipöydän, tuoreen naan-leivän, kahvin ja jälkiruoan.",
        },
        {
          name: "Lapset (5–112 v)",
          price: "8.90 €",
          desc: "Monipuolinen ja miedosti maustettu valikoima perheen pienimmille.",
        },
        {
          name: "Lounas Takeaway",
          price: "12.50 €",
          desc: "Valitse suosikkisi mukaan otettavaan lounasrasiaan.",
        },
      ],
      features: [
        "Uunituore naan-leipä suoraan saviuunista",
        "Raikas salaattipöytä ja viileä raita",
        "Aromaattinen basmatiriisi & päivän lämmin keitto",
        "Makea jälkiruoka tai mangolassi",
        "Reilu kahvi ja haudutettu intialainen tee",
      ],
    },
    en: {
      badge: "WEEKDAYS 10:30 – 14:30",
      title: "Lunch Buffet",
      subtitle:
        "Kajaani's favorite Indian lunch experience. Daily rotating hot curries, tandoor-baked naan, fresh salad bar, and brewed coffee or spiced chai.",
      todayTag: "TODAY",
      nextWeekTag: "NEXT WEEK'S MENU",
      noMenu:
        "No Buffet menu available at this moment. Check back in a few moments.",
      allInclusiveTag: "ALL-INCLUSIVE EXPERIENCE",
      allInclusiveTitle: "What's Included in the Buffet?",
      pricingTitle: "Lunch Pricing",
      prices: [
        {
          name: "Lunch Buffet",
          price: "13.90 €",
          desc: "Full access to all hot dishes, salad bar, fresh naan, tea, coffee & dessert.",
        },
        {
          name: "Children (5–12 yrs)",
          price: "8.90 €",
          desc: "A varied, mild selection suitable for younger guests.",
        },
        {
          name: "Lunch Takeaway Box",
          price: "12.50 €",
          desc: "Pack your favorite curries and sides to go.",
        },
      ],
      features: [
        "Freshly baked naan straight from the clay oven",
        "Crisp, vibrant salad bar and chilled raita",
        "Fragrant basmati rice & daily warm soup",
        "Sweet dessert or house mango specialty",
        "Brewed coffee and spiced Indian chai",
      ],
    },
  };

  const t = content[lang] || content.en;
  const isWeekendNow = new Date().getDay() === 0 || new Date().getDay() === 6;

  return (
    <div className="w-full bg-brand-dark text-brand-cream overflow-hidden">
      {/* ----------------- HERO BANNER ----------------- */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09463.jpg"
          alt="Outdoor dining table"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/60 via-brand-darker/40 to-brand-dark" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-widest font-semibold"
          >
            <Clock className="w-3.5 h-3.5" />
            {t.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-brand-cream font-bold tracking-tight"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-brand-muted font-sans leading-relaxed max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ----------------- HORIZONTAL CAROUSEL SECTION ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative">
        <div className="flex items-center justify-between gap-4 mb-6 max-w-6xl mx-auto">
          <div>
            {isWeekendNow && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-gold/15 border border-brand-gold/30 text-[11px] uppercase tracking-wider text-brand-gold font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {t.nextWeekTag}
              </span>
            )}
          </div>

          {hasMenuData && cardsToDisplay.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full border border-brand-gold/30 bg-brand-card/80 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-darker transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full border border-brand-gold/30 bg-brand-card/80 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-darker transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="py-20 text-center text-xs text-brand-muted font-sans tracking-wide">
            Loading buffet schedule...
          </div>
        )}

        {!loading && !hasMenuData && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto my-12 p-8 rounded-3xl bg-brand-card/60 border border-brand-gold/25 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="font-serif text-lg md:text-xl text-brand-cream">
              {t.noMenu}
            </p>
          </motion.div>
        )}

        {!loading && hasMenuData && (
          <div
            ref={carouselRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none pt-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cardsToDisplay.map((day) => {
              const dayTitle = lang === "fi" ? day.fi : day.en;

              return (
                <div
                  key={day.id}
                  data-today={day.isToday}
                  className={`shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-center flex flex-col rounded-3xl p-6 transition-all duration-300 relative ${
                    day.isToday
                      ? "bg-brand-card border-2 border-brand-gold shadow-2xl shadow-brand-gold/15 scale-[1.02]"
                      : "bg-brand-card/60 border border-brand-gold/20 hover:border-brand-gold/40"
                  }`}
                >
                  {day.isToday && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand-gold text-brand-darker font-sans text-[10px] font-bold uppercase tracking-widest shadow-md">
                      {t.todayTag}
                    </div>
                  )}

                  <div className="border-b border-brand-gold/15 pb-4 mb-5">
                    <div className="flex items-baseline justify-between">
                      <h2
                        className={`font-serif text-2xl font-bold tracking-wide ${
                          day.isToday ? "text-brand-gold" : "text-brand-cream"
                        }`}
                      >
                        {dayTitle}
                      </h2>
                      {day.formattedDate && (
                        <span className="font-sans text-xs text-brand-gold/80 font-semibold tracking-wider">
                          {day.formattedDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {day.dishes.length === 0 ? (
                      <p className="text-xs text-brand-muted italic py-6 text-center">
                        Menu for this day is being prepared.
                      </p>
                    ) : (
                      day.dishes.map((dish, dIdx) => (
                        <div key={dIdx} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                day.isToday
                                  ? "bg-brand-gold"
                                  : "bg-brand-gold/50"
                              }`}
                            />
                            <div>
                              <h3 className="font-serif text-sm font-bold text-brand-cream leading-snug">
                                {lang === "fi"
                                  ? dish.nameFi || dish.name
                                  : dish.nameEn || dish.name}
                              </h3>
                            </div>
                          </div>
                          {(dish.preparationFi ||
                            dish.preparationEn ||
                            dish.preparation) && (
                            <p className="text-[11px] sm:text-xs text-brand-muted font-sans pl-3.5 leading-relaxed">
                              {lang === "fi"
                                ? dish.preparationFi || dish.preparation
                                : dish.preparationEn || dish.preparation}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ----------------- INCLUSIONS & PRICING MATRIX ----------------- */}
      <section className="py-20 bg-brand-darker border-y border-brand-gold/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
              {t.allInclusiveTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-cream font-bold leading-tight">
              {t.allInclusiveTitle}
            </h2>

            <div className="space-y-3 pt-2">
              {t.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-gold" />
                  </div>
                  <span className="text-sm font-sans text-brand-cream">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs text-brand-muted">
              <Coffee className="w-4 h-4 text-brand-gold" />
              <span>
                {lang === "fi"
                  ? "Kahvi ja tee sisältyvät aina hintaan."
                  : "Coffee and tea always included with buffet."}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-brand-gold mb-2">
              {t.pricingTitle}
            </h3>

            <div className="space-y-3">
              {t.prices.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-brand-card/70 border border-brand-gold/20 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-brand-cream">
                      {tier.name}
                    </h4>
                    <p className="text-xs text-brand-muted font-sans mt-0.5 max-w-xs">
                      {tier.desc}
                    </p>
                  </div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-brand-gold shrink-0">
                    {tier.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SHARED FOOTER BLOCKS ----------------- */}
      <ReservationCta />
      <InstagramGrid />
    </div>
  );
}
