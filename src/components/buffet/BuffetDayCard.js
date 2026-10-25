"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

// One day in the weekly carousel. `index` staggers the entrance.
export default function BuffetDayCard({ day, index = 0 }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleDishes = day.dishes.slice(0, visibleCount);
  const hasMore = visibleCount < day.dishes.length;

  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const loadMoreText = fi ? "Näytä lisää" : "Load More";
  const showLessText = fi ? "Näytä vähemmän" : "Show Less";

  const dishName = (d) => (fi ? d.nameFi || d.name : d.nameEn || d.name);
  const dishDesc = (d) =>
    fi ? d.preparationFi || d.preparation : d.preparationEn || d.preparation;

  return (
    <motion.article
      data-today={day.isToday}
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.7,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className={`relative flex w-[300px] shrink-0 snap-center flex-col rounded-3xl p-6 backdrop-blur-sm sm:w-[340px] md:w-[360px] ${
        day.isToday
          ? "border-2 border-[#F2A93B] bg-[#3B1511]/85 shadow-2xl shadow-[#F2A93B]/15"
          : "border border-[#F2A93B]/20 bg-[#1C0D0A]/60 transition-colors duration-300 hover:border-[#F2A93B]/50"
      }`}
    >
      {day.isToday && (
        <span className="absolute -top-3.5 right-6 rounded-full bg-[#F2A93B] px-4 py-1 font-sans text-sm font-bold text-[#2A1206] shadow-md">
          {fi ? "Tänään" : "Today"}
        </span>
      )}

      {/* Day and date */}
      <header className="mb-5 flex items-baseline justify-between gap-3 border-b border-dashed border-[#F2A93B]/30 pb-4">
        <h3
          className={`font-serif text-2xl font-bold ${
            day.isToday ? "text-[#F2A93B]" : "text-brand-cream"
          }`}
        >
          {fi ? day.fi : day.en}
        </h3>
        {day.formattedDate && (
          <span className="rounded-full border border-[#F2A93B]/35 px-3 py-0.5 font-sans text-sm font-medium text-[#D9C6A8]">
            {day.formattedDate}
          </span>
        )}
      </header>

      {/* Dishes */}
      {/* <div className="flex-1">
        {day.dishes.length === 0 ? (
          <p className="py-6 text-center font-sans text-base text-[#D9C6A8] italic">
            {fi
              ? "Päivän lista valmistellaan."
              : "Menu for this day is being prepared."}
          </p>
        ) : (
          <ul className="space-y-4">
            {day.dishes.map((dish, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-2 h-2 w-2 shrink-0 rotate-45 ${
                    day.isToday ? "bg-[#F2A93B]" : "bg-[#F2A93B]/55"
                  }`}
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-lg leading-snug font-bold text-brand-cream">
                    {dishName(dish)}
                  </h4>
                  {dishDesc(dish) && (
                    <p className="mt-1 font-sans text-[15px] leading-relaxed text-[#D9C6A8]">
                      {dishDesc(dish)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Dishes */}
      <div className="flex-1">
        {day.dishes.length === 0 ? (
          <p className="py-6 text-center font-sans text-base text-[#D9C6A8] italic">
            {fi
              ? "Päivän lista valmistellaan."
              : "Menu for this day is being prepared."}
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {visibleDishes.map((dish) => (
                <li key={dish.id} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-2 w-2 shrink-0 rotate-45 ${
                      day.isToday ? "bg-[#F2A93B]" : "bg-[#F2A93B]/55"
                    }`}
                  />

                  <div className="min-w-0">
                    <h4 className="font-serif text-lg leading-snug font-bold text-brand-cream">
                      {dishName(dish)}
                    </h4>

                    {dishDesc(dish) && (
                      <p className="mt-1 font-sans text-[15px] leading-relaxed text-[#D9C6A8]">
                        {dishDesc(dish)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {day.dishes.length > 5 && (
              <div className="mt-6 flex justify-center">
                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 5)}
                    className="rounded-full border border-[#F2A93B]/40 px-5 py-2 font-sans text-sm font-semibold text-[#F2A93B] transition-colors hover:bg-[#F2A93B]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                  >
                    {loadMoreText} ({day.dishes.length - visibleCount})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(5)}
                    className="rounded-full border border-[#F2A93B]/40 px-5 py-2 font-sans text-sm font-semibold text-[#F2A93B] transition-colors hover:bg-[#F2A93B]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                  >
                    {showLessText}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </motion.article>
  );
}
