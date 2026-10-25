"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Helsinki opening hours: [open, close] by weekday (0 = Sunday)
const HOURS = {
  0: [11, 20],
  1: [10, 20],
  2: [10, 20],
  3: [10, 20],
  4: [10, 20],
  5: [10, 20],
  6: [11, 22],
};

const PHONE = "+358 44 902 2407";
const SLIDE_MS = 3000; // time each image stays on screen

// Replace names/descriptions/prices with the real dishes shown in each photo
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
    fi: { name: "Murg Makhani", desc: "Tandoorikana voikastikkeessa, 17,50 €" },
    en: {
      name: "Murg Makhani",
      desc: "Tandoori chicken in butter sauce, €17.50",
    },
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09464.jpg",
    fi: { name: "Pääruoka", desc: "Talon curry tuoreella naanilla" },
    en: { name: "Main course", desc: "House curry with fresh naan" },
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09476.jpg",
    fi: { name: "Saffraanibiryani", desc: "Tuoksuva riisiannos mausteilla" },
    en: { name: "Saffron biryani", desc: "Fragrant spiced rice dish" },
  },
];

function getStatus() {
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
  const [openH, closeH] = HOURS[day];

  if (hour >= openH && hour < closeH)
    return { open: true, time: closeH, today: true };
  if (hour < openH) return { open: false, time: openH, today: true };
  return { open: false, time: HOURS[(day + 1) % 7][0], today: false };
}

export default function Hero() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState(null);
  const [index, setIndex] = useState(0); // position in the track (last item is a clone of the first)
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const count = SLIDES.length;
  const current = index % count;
  const track = [...SLIDES, SLIDES[0]]; // clone lets the last slide glide into the first

  // Open/closed status (client only, avoids hydration mismatch)
  useEffect(() => {
    setStatus(getStatus());
  }, []);

  // Advance one slide every SLIDE_MS
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => i + 1), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

  // After gliding onto the clone, jump back to the real first slide without animation
  useEffect(() => {
    if (index !== count) return;
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

  const content = {
    fi: {
      title: "Naan suoraan tandoorin tulesta.",
      subtitle:
        "Aitoa intialaista ruokaa Kajaanissa: savuisia tandoori-annoksia, täyteläisiä curryja ja päivittäin vaihtuva lounasbuffet.",
      reserveBtn: "Varaa pöytä",
      buffetBtn: "Katso lounasbuffet",
      rating: "4,6 Google-arvioissa",
      showImage: "Näytä kuva",
      buffetTitle: "Lounasbuffet",
      buffetDesc: "Ma–Pe, joka päivä vaihtuvat maut ja tuore naan",
      hoursTitle: "Aukioloajat",
      openNow: (t) => `Auki nyt, sulkeutuu klo ${t}:00`,
      closed: (t, today) =>
        `Suljettu, avaamme ${today ? "tänään" : "huomenna"} klo ${t}:00`,
      hoursFallback: "Ma–Pe 10–20, La 11–22, Su 11–20",
      orderTitle: "Tilaa tai varaa",
    },
    en: {
      title: "Naan fresh from the tandoor fire.",
      subtitle:
        "Authentic Indian food in Kajaani: smoky tandoori specialties, rich curries and a daily changing lunch buffet.",
      reserveBtn: "Book a table",
      buffetBtn: "See the lunch buffet",
      rating: "4.6 on Google",
      showImage: "Show image",
      buffetTitle: "Lunch buffet",
      buffetDesc: "Mon–Fri, new flavours every day and fresh naan",
      hoursTitle: "Opening hours",
      openNow: (t) => `Open now, closes at ${t}:00`,
      closed: (t, today) =>
        `Closed, opens ${today ? "today" : "tomorrow"} at ${t}:00`,
      hoursFallback: "Mon–Fri 10–20, Sat 11–22, Sun 11–20",
      orderTitle: "Order or book",
    },
  };

  const t = content[lang] || content.fi;
  const dish = SLIDES[current][lang] || SLIDES[current].fi;

  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-dark"
      style={{
        backgroundImage:
          "radial-gradient(70% 60% at 78% 55%, rgba(200,50,30,.45), transparent 70%), radial-gradient(50% 50% at 90% 90%, rgba(242,169,59,.25), transparent 70%), linear-gradient(160deg, #3B1511, #1C0D0A 65%)",
      }}
    >
      {/* Animation definitions (self-contained, no extra packages) */}
      <style>{`
        @keyframes heroUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        @keyframes heroScale { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
        @keyframes heroTag { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: none; } }
        @keyframes heroSpin { to { transform: rotate(360deg); } }
        @keyframes heroShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        @keyframes heroFloat { 50% { transform: translateY(-8px); } }
        .hero-up { animation: heroUp .9s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0s); }
        .hero-scale { animation: heroScale 1s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0s); }
        .hero-tag { animation: heroTag .6s cubic-bezier(.22,1,.36,1) both; }
        .hero-ring { animation: heroSpin 45s linear infinite; }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
        .hero-btn:hover .hero-shine { animation: heroShine .9s ease; }
        @media (prefers-reduced-motion: reduce) {
          .hero-up, .hero-scale, .hero-tag, .hero-ring, .hero-float,
          .hero-btn:hover .hero-shine { animation: none !important; }
        }
      `}</style>

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-32 pb-12 sm:px-6 md:grid-cols-[1.05fr_.95fr] md:gap-10 md:pt-44 md:pb-40 lg:px-8">
        {/* Text */}
        <div className="order-2 md:order-1">
          <h1
            className="hero-up mb-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-brand-cream sm:text-6xl lg:text-7xl"
            style={{ "--d": "0.1s" }}
          >
            {t.title}
          </h1>

          <p
            className="hero-up mb-8 max-w-[30em] font-sans text-lg leading-relaxed text-[#D9C6A8]"
            style={{ "--d": "0.3s" }}
          >
            {t.subtitle}
          </p>

          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/contact#reserve"
              style={{ "--d": "0.5s" }}
              className="hero-up hero-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F2A93B] px-7 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              <span
                aria-hidden="true"
                className="hero-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
              />
              <span className="relative">{t.reserveBtn}</span>
            </Link>

            <Link
              href="/buffet"
              style={{ "--d": "0.65s" }}
              className="hero-up inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              {t.buffetBtn}
            </Link>
          </div>

          <div
            className="hero-up mt-8 flex items-center gap-3.5 font-sans text-[15px] text-[#D9C6A8]"
            style={{ "--d": "0.85s" }}
          >
            <span
              aria-hidden="true"
              className="text-lg tracking-widest text-[#F2A93B]"
            >
              ★★★★★
            </span>
            {/* Replace with the restaurant's real Google rating, or remove */}
            <span>{t.rating}</span>
          </div>
        </div>

        {/* Sliding plate */}
        <div
          className="hero-scale order-1 mx-auto flex w-full max-w-[340px] flex-col items-center md:order-2 md:max-w-none"
          style={{ "--d": "0.2s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-float relative grid w-full max-w-[520px] place-items-center">
            <div
              className="absolute aspect-square w-[120%] animate-pulse rounded-full blur-[10px] motion-reduce:animate-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,169,59,.5), rgba(200,50,30,.25) 40%, transparent 68%)",
              }}
            />

            {/* Slowly rotating dashed ring */}
            <div
              aria-hidden="true"
              className="hero-ring absolute -inset-3 rounded-full border-2 border-dashed border-[#F2A93B]/35"
            />

            {/* Circle window: only the images slide inside it */}
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-[6px] border-white/30 shadow-2xl shadow-black/60">
              <div
                className={`flex h-full w-full ease-in-out motion-reduce:transition-none ${
                  animate
                    ? "transition-transform duration-700"
                    : "transition-none"
                }`}
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {track.map((slide, i) => {
                  const isClone = i === count;
                  const name = (slide[lang] || slide.fi).name;
                  return (
                    <div
                      key={i}
                      className="relative h-full w-full shrink-0"
                      aria-hidden={isClone}
                    >
                      <Image
                        src={slide.src}
                        alt={isClone ? "" : name}
                        fill
                        priority={i === 0}
                        unoptimized
                        sizes="(min-width: 768px) 520px, 340px"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dish label updates with each slide */}
            <div
              key={current}
              className="hero-tag absolute -bottom-2 left-0 max-w-[230px] rounded-2xl border border-[#F2A93B]/50 bg-[#1C0D0A]/85 px-4 py-3 backdrop-blur-md md:bottom-[2%] md:left-[-2%]"
            >
              <b className="block font-serif text-lg text-[#F2A93B]">
                {dish.name}
              </b>
              <span className="font-sans text-sm text-[#D9C6A8]">
                {dish.desc}
              </span>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center gap-2.5">
            {SLIDES.map((s, i) => (
              <button
                key={i}
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
        </div>
      </div>

      {/* Info bar */}
      <div className="relative z-10 border-t border-[#F2A93B]/30 bg-[#1C0D0A]/80 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 font-sans sm:px-6 md:grid-cols-3 md:gap-6 lg:px-8">
          <div className="hero-up" style={{ "--d": "1s" }}>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {t.buffetTitle}
            </h2>
            <p className="text-[15px] text-brand-cream">{t.buffetDesc}</p>
          </div>

          <div className="hero-up" style={{ "--d": "1.15s" }}>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {t.hoursTitle}
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
                <span className="font-normal">{t.hoursFallback}</span>
              )}
            </p>
          </div>

          <div className="hero-up" style={{ "--d": "1.3s" }}>
            <h2 className="font-serif text-lg text-[#F2A93B]">
              {t.orderTitle}
            </h2>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-[15px] text-brand-cream transition-colors hover:text-[#F2A93B]"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
