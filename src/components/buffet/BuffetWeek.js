"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import BuffetDayCard from "./BuffetDayCard";
import useBuffetMenu from "./useBuffetMenu";

const TEXT = {
  fi: {
    eyebrow: "Tuoreena joka päivä",
    title: "Viikon lounaslista",
    nextWeek: "Ensi viikon lista",
    noMenu:
      "Lounasbuffet-listaa ei ole saatavilla juuri nyt. Tarkista hetken kuluttua uudelleen.",
    error: "Lounaslistan lataaminen epäonnistui.",
    retry: "Yritä uudelleen",
    left: "Vieritä vasemmalle",
    right: "Vieritä oikealle",
  },
  en: {
    eyebrow: "Fresh every day",
    title: "This week's lunch menu",
    nextWeek: "Next week's menu",
    noMenu:
      "No buffet menu is available right now. Please check back in a moment.",
    error: "We couldn't load the lunch menu.",
    retry: "Try again",
    left: "Scroll left",
    right: "Scroll right",
  },
};

const FADE_MASK =
  "linear-gradient(90deg, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%)";

function Skeleton() {
  return (
    <div
      className="-mx-4 flex gap-6 overflow-hidden px-4 pt-6 pb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="relative w-[300px] shrink-0 animate-pulse overflow-hidden rounded-3xl border border-[#F2A93B]/15 bg-linear-to-b from-[#2A1410]/80 to-[#1C0D0A]/80 p-7 sm:w-[340px] md:w-[360px]"
        >
          <div className="mb-6 h-7 w-1/3 rounded-full bg-[#F2A93B]/15" />
          <div className="mb-6 h-px w-full bg-[#F2A93B]/10" />
          <div className="space-y-4">
            <div className="h-5 w-4/5 rounded-full bg-[#F2A93B]/10" />
            <div className="h-5 w-3/5 rounded-full bg-[#F2A93B]/10" />
            <div className="h-5 w-4/5 rounded-full bg-[#F2A93B]/10" />
            <div className="h-5 w-2/3 rounded-full bg-[#F2A93B]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Message({ children, action }) {
  return (
    <div className="relative mx-auto my-8 max-w-2xl overflow-hidden rounded-3xl border border-[#F2A93B]/25 bg-linear-to-b from-[#2A1410]/80 to-[#1C0D0A]/80 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#F2A93B]/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative space-y-5">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#F2A93B]/40 bg-[#F2A93B]/10 text-[#F2A93B]">
          <AlertCircle className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="font-serif text-xl leading-snug text-brand-cream">
          {children}
        </p>
        {action}
      </div>
    </div>
  );
}

export default function BuffetWeek() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const t = TEXT[lang] || TEXT.fi;
  const carouselRef = useRef(null);

  const { days, loading, error, isWeekend, refetch } = useBuffetMenu();
  const hasData = days.length > 0;

  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
    active: 0,
  });

  const updateScrollState = useCallback(() => {
    const box = carouselRef.current;
    if (!box) return;
    const { scrollLeft, scrollWidth, clientWidth } = box;
    const mid = scrollLeft + clientWidth / 2;

    let active = 0;
    let best = Infinity;
    Array.from(box.children).forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (d < best) {
        best = d;
        active = i;
      }
    });

    const next = {
      canLeft: scrollLeft > 4,
      canRight: scrollLeft < scrollWidth - clientWidth - 4,
      active,
    };
    setScrollState((prev) =>
      prev.canLeft === next.canLeft &&
      prev.canRight === next.canRight &&
      prev.active === next.active
        ? prev
        : next,
    );
  }, []);

  // Center today's card inside the carousel. Scrolls only the carousel, never the page.
  useEffect(() => {
    const box = carouselRef.current;
    if (!box || !hasData) return;
    const todayEl = box.querySelector("[data-today='true']");
    if (todayEl) {
      box.scrollTo({
        left: todayEl.offsetLeft - (box.clientWidth - todayEl.clientWidth) / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    }
    updateScrollState();
  }, [hasData, days, reduce, updateScrollState]);

  // Keep arrows, counter and progress in sync
  useEffect(() => {
    const box = carouselRef.current;
    if (!box || !hasData) return;
    box.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      box.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [hasData, updateScrollState]);

  const scroll = (direction) => {
    const box = carouselRef.current;
    if (!box) return;
    const amount = Math.min(box.clientWidth * 0.8, 380);
    box.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const showControls = hasData && days.length > 1;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      id="weekly-menu"
      className="relative w-full scroll-mt-16 overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(50% 45% at 90% 10%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 45% at 5% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
      }}
    >
      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Hairline gold divider at the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F2A93B]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col gap-8 md:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4">
            <span className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#F2A93B]">
              <span className="h-px w-8 bg-[#F2A93B]/70" aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h2 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
              {t.title}
            </h2>
            {isWeekend && hasData && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2A93B]/50 bg-[#F2A93B]/10 px-4 py-1.5 font-sans text-sm font-semibold text-[#F2A93B]">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {t.nextWeek}
              </span>
            )}
          </div>

          {showControls && (
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-4">
                <span
                  className="font-serif text-lg tabular-nums text-[#D9C6A8]"
                  aria-hidden="true"
                >
                  <span className="text-2xl font-bold text-[#F2A93B]">
                    {pad(scrollState.active + 1)}
                  </span>
                  <span className="mx-1.5 text-[#D9C6A8]/50">/</span>
                  {pad(days.length)}
                </span>
                <div className="flex items-center gap-2">
                  {[
                    {
                      dir: "left",
                      Icon: ChevronLeft,
                      label: t.left,
                      disabled: !scrollState.canLeft,
                    },
                    {
                      dir: "right",
                      Icon: ChevronRight,
                      label: t.right,
                      disabled: !scrollState.canRight,
                    },
                  ].map(({ dir, Icon, label, disabled }) => (
                    <button
                      key={dir}
                      type="button"
                      onClick={() => scroll(dir)}
                      disabled={disabled}
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-[#F2A93B]/40 bg-[#1C0D0A]/70 text-[#F2A93B] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#F2A93B] hover:text-[#2A1206] hover:shadow-lg hover:shadow-[#F2A93B]/25 active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div
                className="h-0.5 w-full overflow-hidden rounded-full bg-[#F2A93B]/15 md:w-56"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-[#F2A93B] transition-all duration-500 ease-out"
                  style={{
                    width: `${((scrollState.active + 1) / days.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {loading && <Skeleton />}

        {!loading && error && (
          <Message
            action={
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center justify-center rounded-full bg-[#F2A93B] px-8 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {t.retry}
              </button>
            }
          >
            {t.error}
          </Message>
        )}

        {!loading && !error && !hasData && <Message>{t.noMenu}</Message>}

        {!loading && hasData && (
          // `relative` makes offsetLeft measure from the carousel, which the centering code relies on
          <div
            ref={carouselRef}
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
            className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 items-stretch gap-6 overflow-x-auto px-4 pt-6 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {days.map((day, i) => (
              <BuffetDayCard key={day.id} day={day} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
