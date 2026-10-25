"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import useChefPicks from "@/hooks/useChefPicks";
import ServingBadge from "@/components/common/ServingBadge";

// Loading placeholder with the same layout, so the page does not jump when the dishes arrive
function Skeleton() {
  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(55% 55% at 25% 55%, rgba(200,50,30,.3), transparent 70%), linear-gradient(170deg, #2A100D, #1C0D0A 70%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="mx-auto h-12 w-3/4 animate-pulse rounded-full bg-[#F2A93B]/10" />
          <div className="mx-auto h-5 w-full animate-pulse rounded-full bg-[#F2A93B]/10" />
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex justify-center lg:col-span-7">
            <div className="h-72 w-72 animate-pulse rounded-full bg-[#F2A93B]/10 sm:h-80 sm:w-80 md:h-96 md:w-96" />
          </div>
          <div className="space-y-4 lg:col-span-5">
            <div className="h-8 w-40 animate-pulse rounded-full bg-[#F2A93B]/10" />
            <div className="h-10 w-3/4 animate-pulse rounded-full bg-[#F2A93B]/10" />
            <div className="h-5 w-full animate-pulse rounded-full bg-[#F2A93B]/10" />
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-[#F2A93B]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ChefRecommend() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const { picks, loading, error } = useChefPicks();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fi = lang === "fi";

  if (loading) return <Skeleton />;

  // No recommendations (or the API is down): leave the section out instead of showing an empty block
  if (error || picks.length === 0) return null;

  const activeDish = picks[Math.min(selectedIndex, picks.length - 1)];

  const name = (d) => (fi ? d.nameFi || d.nameEn : d.nameEn || d.nameFi);
  const description = (d) =>
    fi
      ? d.preparationFi || d.preparationEn
      : d.preparationEn || d.preparationFi;
  // Badge text chosen by the staff, or the dish's category when none was entered
  const tag = (d) =>
    fi
      ? d.chefTagFi || d.categoryFi || d.categoryEn
      : d.chefTagEn || d.categoryEn || d.categoryFi;
  const money = (p) => {
    const s = Number(p).toFixed(2);
    return fi ? `${s.replace(".", ",")} €` : `€${s}`;
  };

  const info = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const infoItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(55% 55% at 25% 55%, rgba(200,50,30,.3), transparent 70%), radial-gradient(40% 40% at 95% 90%, rgba(242,169,59,.14), transparent 70%), linear-gradient(170deg, #2A100D, #1C0D0A 70%)",
      }}
    >
      <style>{`
        @keyframes chShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .ch-btn:hover .ch-shine { animation: chShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .ch-btn:hover .ch-shine { animation: none !important; } }
      `}</style>

      {/* Chef background photo, warmed and darkened so text stays readable */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09469.jpg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-right opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0D0A] via-[#1C0D0A]/40 to-[#1C0D0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B1511]/60 via-transparent to-transparent" />
      </div>

      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl space-y-4 text-center"
        >
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream md:text-5xl lg:text-6xl">
            {fi ? "Keittiömestarin suositus" : "The chef’s recommendations"}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {fi
              ? "Tarkoin valitut nimikkoannoksemme heijastavat intialaisen keittiön aidoimpia vivahteita ja tandooriuunimme parasta antia."
              : "Signature dishes chosen for the depth, aroma and fire of traditional Indian tandoor cooking."}
          </p>
        </motion.div>

        {/* Showcase */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Plate */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduce ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center lg:col-span-7"
          >
            <div className="relative">
              {/* Warm glow */}
              <motion.div
                aria-hidden="true"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.08, 1], opacity: [0.6, 0.95, 0.6] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-16 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,169,59,.45), rgba(200,50,30,.22) 42%, transparent 68%)",
                }}
              />

              {/* Rotating dashed ring */}
              <motion.div
                aria-hidden="true"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -inset-4 rounded-full border-2 border-dashed border-[#F2A93B]/35 sm:-inset-6"
              />

              {/* Plate with gentle float */}
              <motion.div
                animate={reduce ? undefined : { y: [-6, 6, -6] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-72 w-72 overflow-hidden rounded-full border-[6px] border-white/30 shadow-2xl shadow-black/60 sm:h-80 sm:w-80 md:h-96 md:w-96"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDish.id}
                    initial={{
                      opacity: reduce ? 1 : 0,
                      scale: reduce ? 1 : 1.1,
                      rotate: reduce ? 0 : -8,
                    }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{
                      opacity: reduce ? 1 : 0,
                      scale: reduce ? 1 : 0.95,
                      rotate: reduce ? 0 : 8,
                    }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeDish.imageUrl}
                      alt={name(activeDish)}
                      fill
                      unoptimized
                      sizes="(min-width: 768px) 384px, 288px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Dish details */}
          <div
            className="text-center lg:col-span-5 lg:text-left"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish.id}
                variants={info}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: reduce ? 1 : 0,
                  x: reduce ? 0 : -20,
                  transition: { duration: reduce ? 0 : 0.25 },
                }}
                className="space-y-5"
              >
                {tag(activeDish) && (
                  <motion.span
                    variants={infoItem}
                    className="inline-flex rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-4 py-1.5 font-sans text-sm font-semibold text-[#F2A93B] backdrop-blur-md"
                  >
                    {tag(activeDish)}
                  </motion.span>
                )}

                <motion.h3
                  variants={infoItem}
                  className="font-serif text-3xl font-bold leading-tight text-brand-cream sm:text-4xl"
                >
                  {name(activeDish)}
                </motion.h3>

                {description(activeDish) && (
                  <motion.p
                    variants={infoItem}
                    className="mx-auto max-w-md font-sans text-lg leading-relaxed text-[#D9C6A8] lg:mx-0"
                  >
                    {description(activeDish)}
                  </motion.p>
                )}

                <motion.div
                  variants={infoItem}
                  className="flex flex-wrap items-center justify-center gap-4 pt-1 lg:justify-start"
                >
                  <span className="font-serif text-3xl font-bold text-[#F2A93B]">
                    {money(activeDish.price)}
                  </span>
                  <ServingBadge dish={activeDish} />
                </motion.div>

                <motion.div variants={infoItem} className="pt-1">
                  <Link
                    href="/menu"
                    className="ch-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F2A93B] px-7 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                  >
                    <span
                      aria-hidden="true"
                      className="ch-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
                    />
                    <span className="relative">
                      {fi ? "Katso ruokalista" : "View full menu"}
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dish selector (hidden when there is only one recommendation) */}
        {picks.length > 1 && (
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2 }}
            className="mx-auto max-w-4xl rounded-3xl border border-[#F2A93B]/25 bg-[#1C0D0A]/70 p-3 backdrop-blur-md sm:p-4"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {picks.map((dish, idx) => {
                const selected = dish.id === activeDish.id;
                return (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-pressed={selected}
                    className={`group relative flex flex-col items-center gap-3 rounded-2xl border p-3 text-center transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B] ${
                      selected
                        ? "border-transparent"
                        : "border-transparent hover:-translate-y-0.5 hover:border-[#F2A93B]/30 hover:bg-[#3B1511]/30"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="chef-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl border border-[#F2A93B]/60 bg-[#3B1511]/80 shadow-lg shadow-black/40"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 34 }
                        }
                      />
                    )}

                    <span
                      className={`relative h-16 w-16 overflow-hidden rounded-full border-2 shadow-md transition-colors duration-300 sm:h-20 sm:w-20 ${
                        selected
                          ? "border-[#F2A93B]"
                          : "border-[#F2A93B]/30 group-hover:border-[#F2A93B]/60"
                      }`}
                    >
                      <Image
                        src={dish.imageUrl}
                        alt=""
                        fill
                        unoptimized
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>

                    <span className="relative min-w-0">
                      <span
                        className={`block font-serif text-sm font-bold leading-snug transition-colors duration-300 ${
                          selected ? "text-[#F2A93B]" : "text-brand-cream"
                        }`}
                      >
                        {name(dish)}
                      </span>
                      <span className="font-sans text-sm text-[#D9C6A8]">
                        {money(dish.price)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
