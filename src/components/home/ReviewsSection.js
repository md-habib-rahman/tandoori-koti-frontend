"use client";

import { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useReviews from "@/hooks/useReviews";

// Save as: src/components/home/ReviewsSection.js  (replaces your current one)

const ROTATE_MS = 6000; // how long each review stays in focus before the next one comes in

const SOURCE_LABELS = { GOOGLE: "Google", FACEBOOK: "Facebook", OTHER: "" };

function Stars({ count, className = "h-4 w-4" }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${count} / 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < count ? "fill-[#F2A93B] text-[#F2A93B]" : "text-[#F2A93B]/30"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

// True on screens >= lg (1024px). On smaller screens only one card is rendered.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

// forwardRef is required: AnimatePresence mode="popLayout" needs the DOM node of the exiting card.
// The outer motion.div is the grid item and carries the animation (position, enter, exit).
// The inner figure carries the look and the "lift" for the focused card, so Tailwind's
// translate is never overridden by Framer Motion's inline transform.
const ReviewCard = forwardRef(function ReviewCard(
  { review, focused, variants, direction, transition },
  ref,
) {
  const source = SOURCE_LABELS[review.source] ?? "";

  return (
    <motion.div
      ref={ref}
      layout
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="flex"
    >
      <figure
        className={`flex min-w-0 flex-1 flex-col rounded-3xl border p-7 backdrop-blur-sm transition-[transform,opacity,background-color,border-color,box-shadow] duration-500 sm:p-8 ${
          focused
            ? "border-[#F2A93B]/55 bg-[#3B1511]/75 shadow-xl shadow-black/50 lg:-translate-y-4"
            : "border-[#F2A93B]/20 bg-[#1C0D0A]/60 lg:opacity-80"
        }`}
      >
        <Quote className="mb-5 h-9 w-9 text-[#F2A93B]/60" aria-hidden="true" />

        <blockquote className="line-clamp-8 flex-1 font-serif text-lg leading-relaxed text-brand-cream sm:text-xl">
          {review.text}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-4 border-t border-dashed border-[#F2A93B]/30 pt-5">
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F2A93B] font-serif text-xl font-bold text-[#2A1206]"
          >
            {review.authorName.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-sans text-base font-semibold text-brand-cream">
              {review.authorName}
            </span>
            <span className="mt-1 flex items-center gap-2">
              <Stars count={review.rating} />
              {source && (
                <span className="font-sans text-sm text-[#D9C6A8]">
                  {source}
                </span>
              )}
            </span>
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
});

function Skeleton() {
  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{ backgroundImage: "linear-gradient(180deg, #1C0D0A, #170A08)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 h-12 w-2/3 animate-pulse rounded-full bg-[#F2A93B]/10" />
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-72 animate-pulse rounded-3xl border border-[#F2A93B]/15 bg-[#1C0D0A]/60 ${
                i > 0 ? "hidden lg:block" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ReviewsSection() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const fi = lang === "fi";
  const { reviews, summary, loading, error } = useReviews();

  const n = reviews.length;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = the next review slides in from the right
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  // People who prefer less motion start with the rotation paused and can start it themselves
  useEffect(() => {
    if (reduce) setUserPaused(true);
  }, [reduce]);

  // Do not rotate while the browser tab is in the background
  useEffect(() => {
    const onChange = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const go = useCallback(
    (step) => {
      if (n < 2) return;
      setDirection(step > 0 ? 1 : -1);
      setActive((i) => (i + step + n) % n);
    },
    [n],
  );

  const goTo = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  // Rotate to the next review. The timer restarts after every change, so a manual click gets a full turn.
  const running =
    n > 1 && !userPaused && !hovered && !focusInside && pageVisible;
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => go(1), ROTATE_MS);
    return () => clearTimeout(id);
  }, [running, active, go]);

  if (loading) return <Skeleton />;
  // Nothing to show (or the API is down): leave the section out instead of showing an empty block
  if (error || n === 0) return null;

  // Which reviews are visible: the one in focus in the middle, its neighbours on both sides (desktop only).
  // With fewer than 3 reviews the layout shrinks to fit. On phones only the focused review is rendered.
  const offsets = !isDesktop
    ? [0]
    : n >= 3
      ? [-1, 0, 1]
      : n === 2
        ? [0, 1]
        : [0];
  const slots = offsets.map((offset) => ({
    offset,
    review: reviews[(active + offset + n) % n],
  }));

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: reduce ? 0 : dir * 70,
      scale: reduce ? 1 : 0.95,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({
      opacity: 0,
      x: reduce ? 0 : dir * -70,
      scale: reduce ? 1 : 0.95,
    }),
  };
  const transition = { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] };

  const rating = summary?.googleRating;
  const count = summary?.googleReviewCount;
  const googleUrl = summary?.googleReviewsUrl;

  const circleButton =
    "grid h-11 w-11 place-items-center rounded-full border border-[#F2A93B]/40 bg-[#1C0D0A]/70 text-[#F2A93B] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F2A93B] hover:text-[#2A1206] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]";

  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(55% 55% at 50% 0%, rgba(200,50,30,.26), transparent 70%), radial-gradient(40% 40% at 95% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading and rating summary */}
        <div className="mb-14 space-y-8 text-center">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {fi ? "Mitä vieraamme sanovat" : "What our guests say"}
          </h2>

          {typeof rating === "number" && (
            <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-7 py-3 backdrop-blur-sm">
              <span className="font-serif text-4xl font-bold text-[#F2A93B]">
                {fi ? String(rating).replace(".", ",") : rating}
              </span>
              <Stars count={Math.round(rating)} className="h-5 w-5" />
              <span className="font-sans text-[15px] text-[#D9C6A8]">
                {typeof count === "number"
                  ? fi
                    ? `${count} arvostelua Googlessa`
                    : `${count} reviews on Google`
                  : fi
                    ? "Google-arvosana"
                    : "Google rating"}
              </span>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={fi ? "Vieraiden arvostelut" : "Guest reviews"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={(e) => {
            // Only keyboard focus pauses the rotation; a mouse click on a button should not
            if (e.target.matches?.(":focus-visible")) setFocusInside(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget))
              setFocusInside(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          {/* One grid, one AnimatePresence: cards that stay slide to their new column,
              one leaves, one enters. "relative" is required by popLayout. */}
          <div
            aria-live={running ? "off" : "polite"}
            className={`relative grid grid-cols-1 items-stretch gap-6 lg:gap-8 ${
              n >= 3
                ? "lg:grid-cols-3"
                : n === 2
                  ? "lg:grid-cols-2"
                  : "lg:mx-auto lg:max-w-xl"
            }`}
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              {slots.map(({ offset, review }) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  focused={offset === 0}
                  variants={variants}
                  direction={direction}
                  transition={transition}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          {n > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={fi ? "Edellinen arvostelu" : "Previous review"}
                className={circleButton}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2.5">
                {reviews.map((review, i) => (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${fi ? "Näytä arvostelu" : "Show review"} ${i + 1}`}
                    aria-current={i === active}
                    className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B] ${
                      i === active
                        ? "w-8 bg-[#F2A93B]"
                        : "w-2.5 bg-brand-cream/35 hover:bg-brand-cream/60"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label={fi ? "Seuraava arvostelu" : "Next review"}
                className={circleButton}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={
                  userPaused
                    ? fi
                      ? "Jatka automaattista vaihtoa"
                      : "Resume rotation"
                    : fi
                      ? "Keskeytä automaattinen vaihto"
                      : "Pause rotation"
                }
                className={circleButton}
              >
                {userPaused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Link to all reviews (only when the restaurant has set one) */}
        {googleUrl && (
          <div className="mt-14 text-center">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              {fi
                ? "Lue lisää arvosteluja Googlessa"
                : "Read more reviews on Google"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
