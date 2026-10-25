"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useApi } from "@/hooks/useApi";

const SLIDE_MS = 6000; // time each slide stays on screen (long enough to read the text)

const t2 = (fi, en) => ({ fi, en });

// Shown only if the API is unreachable
const FALLBACK = {
  slides: [
    {
      id: 0,
      imageDesktop:
        "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09464.jpg",
      imageMobile: "",
      title: t2(
        "Naan suoraan tandoorin tulesta.",
        "Naan fresh from the tandoor fire.",
      ),
      subtitle: t2(
        "Aitoa intialaista ruokaa Kajaanissa.",
        "Authentic Indian food in Kajaani.",
      ),
      primaryLabel: t2("Varaa pöytä", "Book a table"),
      primaryHref: "/contact#reserve",
      secondaryLabel: t2("Katso lounasbuffet", "See the lunch buffet"),
      secondaryHref: "/buffet",
    },
  ],
  band: {
    buffetTitle: t2("Lounasbuffet", "Lunch buffet"),
    buffetDesc: t2(
      "Ma–Pe, joka päivä vaihtuvat maut ja tuore naan",
      "Mon–Fri, new flavours every day and fresh naan",
    ),
    hoursTitle: t2("Aukioloajat", "Opening hours"),
    hoursFallback: t2(
      "Ma–Pe 10–20, La 11–22, Su 11–20",
      "Mon–Fri 10–20, Sat 11–22, Sun 11–20",
    ),
    orderTitle: t2("Tilaa tai varaa", "Order or book"),
    phone: "+358 44 902 2407",
    hours: [
      [11, 20],
      [10, 20],
      [10, 20],
      [10, 20],
      [10, 20],
      [10, 20],
      [11, 22],
    ],
  },
};

const BG = {
  backgroundImage:
    "radial-gradient(70% 60% at 78% 55%, rgba(200,50,30,.45), transparent 70%), radial-gradient(50% 50% at 90% 90%, rgba(242,169,59,.25), transparent 70%), linear-gradient(160deg, #3B1511, #1C0D0A 65%)",
};

const HERO_H = "h-[82svh] min-h-[600px] md:h-[min(92svh,860px)]";

function getStatus(hours) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour =
    parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10) % 24;
  const day =
    { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd] ?? 1;
  const [openH, closeH] = hours[day];

  if (hour >= openH && hour < closeH)
    return { open: true, time: closeH, today: true };
  if (hour < openH) return { open: false, time: openH, today: true };
  return { open: false, time: hours[(day + 1) % 7][0], today: false };
}

export default function Hero() {
  const { lang } = useLanguage();
  const { request } = useApi();
  const [data, setData] = useState(null); // null = loading
  const [status, setStatus] = useState(null);
  const [index, setIndex] = useState(0); // position in the track (last item is a clone of the first)
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const slides = data?.slides ?? [];
  const band = data?.band ?? FALLBACK.band;
  const count = slides.length;
  const current = count ? index % count : 0;
  const track = count > 1 ? [...slides, slides[0]] : slides; // clone lets the last slide glide into the first

  // Load slides + band from the backend
  useEffect(() => {
    let off = false;
    request({ url: "/hero" })
      .then((d) => {
        if (off) return;
        setData(
          d?.slides?.length
            ? { slides: d.slides, band: d.band ?? FALLBACK.band }
            : FALLBACK,
        );
      })
      .catch(() => !off && setData(FALLBACK));
    return () => {
      off = true;
    };
  }, [request]);

  // Open/closed status (client only, avoids hydration mismatch)
  useEffect(() => {
    setStatus(getStatus(band.hours));
  }, [band.hours]);

  // Advance one slide every SLIDE_MS
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => i + 1), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  // After gliding onto the clone, jump back to the real first slide without animation
  useEffect(() => {
    if (count < 2 || index !== count) return;
    const id = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 800);
    return () => clearTimeout(id);
  }, [index, count]);

  // Turn the slide transition back on after the silent jump
  useEffect(() => {
    if (animate) return;
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [animate]);

  const ui = {
    fi: {
      showImage: "Näytä kuva",
      openNow: (t) => `Auki nyt, sulkeutuu klo ${t}:00`,
      closed: (t, today) =>
        `Suljettu, avaamme ${today ? "tänään" : "huomenna"} klo ${t}:00`,
    },
    en: {
      showImage: "Show image",
      openNow: (t) => `Open now, closes at ${t}:00`,
      closed: (t, today) =>
        `Closed, opens ${today ? "today" : "tomorrow"} at ${t}:00`,
    },
  };
  const t = ui[lang] || ui.fi;
  const pick = (obj) => obj?.[lang] || obj?.fi || "";

  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  // Loading shell keeps the layout stable
  if (!data) {
    return (
      <section
        className="relative w-full overflow-hidden bg-brand-dark"
        style={BG}
        aria-busy="true"
      >
        <div className={HERO_H} />
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-dark"
      style={BG}
    >
      {/* Animation definitions (self-contained, no extra packages) */}
      <style>{`
        @keyframes heroUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        @keyframes heroShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .hero-up { animation: heroUp .9s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0s); }
        .hero-btn:hover .hero-shine { animation: heroShine .9s ease; }
        @media (prefers-reduced-motion: reduce) {
          .hero-up, .hero-btn:hover .hero-shine { animation: none !important; }
        }
      `}</style>

      {/* Slider area */}
      <div
        className={`relative ${HERO_H}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Image track: desktop and mobile versions swap with <picture> */}
        <div
          className={`absolute inset-0 flex ease-in-out motion-reduce:transition-none ${
            animate ? "transition-transform duration-700" : "transition-none"
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {track.map((s, i) => {
            const isClone = count > 1 && i === count;
            return (
              <div
                key={i}
                className="relative h-full w-full shrink-0"
                aria-hidden={isClone}
              >
                <picture>
                  {s.imageDesktop && (
                    <source
                      media="(min-width: 768px)"
                      srcSet={s.imageDesktop}
                    />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imageMobile || s.imageDesktop}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    decoding="async"
                  />
                </picture>
              </div>
            );
          })}
        </div>

        {/* Readability overlay: from the bottom on mobile, from the left on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C0D0A] via-[#1C0D0A]/60 to-[#1C0D0A]/10 md:bg-gradient-to-r md:from-[#1C0D0A]/90 md:via-[#1C0D0A]/55 md:to-transparent"
        />

        {/* Text: re-keyed so it animates in on every slide change */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 pt-32 sm:px-6 md:items-center md:pb-40 md:pt-44 lg:px-8">
          <div key={current} className="max-w-2xl">
            <h1
              className="hero-up mb-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-6xl lg:text-7xl"
              style={{ "--d": "0.05s" }}
            >
              {pick(slide.title)}
            </h1>

            <p
              className="hero-up mb-8 max-w-[30em] font-sans text-lg leading-relaxed text-[#D9C6A8]"
              style={{ "--d": "0.2s" }}
            >
              {pick(slide.subtitle)}
            </p>

            <div className="flex flex-wrap gap-3.5">
              {slide.primaryHref && (
                <Link
                  href={slide.primaryHref}
                  style={{ "--d": "0.35s" }}
                  className="hero-up hero-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F2A93B] px-7 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                >
                  <span
                    aria-hidden="true"
                    className="hero-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
                  />
                  <span className="relative">{pick(slide.primaryLabel)}</span>
                </Link>
              )}

              {slide.secondaryHref && (
                <Link
                  href={slide.secondaryHref}
                  style={{ "--d": "0.5s" }}
                  className="hero-up inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                >
                  {pick(slide.secondaryLabel)}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2.5 md:bottom-[7.5rem]">
            {slides.map((s, i) => (
              <button
                key={s.id ?? i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t.showImage} ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B] ${
                  i === current
                    ? "w-8 bg-[#F2A93B]"
                    : "w-2.5 bg-brand-cream/35 hover:bg-brand-cream/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info bar (static, edited in the dashboard) */}
      <div className="relative z-10 border-t border-[#F2A93B]/30 bg-[#1C0D0A]/80 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 font-sans sm:px-6 md:grid-cols-3 md:gap-6 lg:px-8">
          <div>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {pick(band.buffetTitle)}
            </h2>
            <p className="text-[15px] text-brand-cream">
              {pick(band.buffetDesc)}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {pick(band.hoursTitle)}
            </h2>
            <p className="flex items-center gap-2 text-[15px] font-semibold text-brand-cream">
              {status ? (
                <>
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      status.open
                        ? "animate-pulse bg-[#7BD36B] shadow-[0_0_0_4px_rgba(123,211,107,.25)]"
                        : "bg-[#E06A55] shadow-[0_0_0_4px_rgba(224,106,85,.25)]"
                    }`}
                  />
                  {status.open
                    ? t.openNow(status.time)
                    : t.closed(status.time, status.today)}
                </>
              ) : (
                <span className="font-normal">{pick(band.hoursFallback)}</span>
              )}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {pick(band.orderTitle)}
            </h2>
            <a
              href={`tel:${band.phone.replace(/\s/g, "")}`}
              className="text-[15px] text-brand-cream transition-colors hover:text-[#F2A93B]"
            >
              {band.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
