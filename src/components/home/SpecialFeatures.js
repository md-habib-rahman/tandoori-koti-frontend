"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock,
  Flame,
  Wine,
  ShoppingBag,
  PartyPopper,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FEATURES = [
  {
    id: "buffet",
    icon: Clock,
    title: { fi: "Lounasbuffet", en: "Lunch buffet" },
    subtitle: {
      fi: "Monipuolinen kattaus arkipäivisin",
      en: "A generous weekday lunch spread",
    },
    badge: { fi: "Arkipäivän ateria", en: "Weekday meal" },
    description: {
      fi: "Kajaanin kattavin intialainen lounasbuffet: vähintään kolme lämmintä currya, tandoori-vartaita, uunituoretta naan-leipää, raikas salaattipöytä sekä kahvia ja teetä.",
      en: "Kajaani's most generous Indian lunch table: rotating aromatic curries, clay-oven tandoori specialties, hot naan, a fresh salad bar, and coffee or spiced chai.",
    },
    highlights: {
      fi: [
        "Päivittäin vaihtuvat maut",
        "Tuore naan suoraan uunista",
        "Sisältää salaatin ja kahvin",
      ],
      en: [
        "Daily rotating recipes",
        "Oven-fresh tandoori naan",
        "Salad and coffee included",
      ],
    },
    image:
      "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09463.jpg",
    cta: {
      href: "/buffet",
      fi: "Tutustu buffet-listaan",
      en: "See the buffet menu",
    },
  },
  {
    id: "alacarte",
    icon: Flame,
    title: { fi: "À la carte -elämys", en: "À la carte dining" },
    subtitle: {
      fi: "Kulinaarista käsityötä iltaisin ja viikonloppuisin",
      en: "Authentic North Indian cooking",
    },
    badge: { fi: "Avoinna joka päivä", en: "Open every day" },
    description: {
      fi: "Perinteisiä pohjoisintialaisia mestariteoksia valmistettuna perinteisessä tandooriuunissa, täyteläisiä biryaneja ja huolella maustettuja kasvisherkkuja.",
      en: "Tandoor meats marinated for 24 hours, slow-simmered curries, fragrant dum biryanis, and vibrant vegan dishes.",
    },
    highlights: {
      fi: [
        "Aito hiiligrilli-tandoori",
        "Laaja kasvis- ja vegaanivalikoima",
        "Räätälöity tulisuusaste",
      ],
      en: [
        "Charcoal clay-oven grills",
        "Wide vegetarian menu",
        "Spice level to your taste",
      ],
    },
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    cta: {
      href: "/menu",
      fi: "Selaa ruokalistaa",
      en: "Explore the full menu",
    },
  },
  {
    id: "dinein",
    icon: Wine,
    title: { fi: "Tunnelmallinen sali", en: "Atmospheric dine-in" },
    subtitle: {
      fi: "Lämmin ja rauhallinen ravintolamiljöö",
      en: "Warm, candlelit ambience",
    },
    badge: { fi: "Pöytävaraukset verkossa", en: "Book a table online" },
    description: {
      fi: "Lämmin puusisustus, pehmeä valaistus ja huomaavainen pöytiintarjoilu luovat ihanteellisen ympäristön merkkipäiville, liiketapaamisille tai treffeille.",
      en: "Golden lighting, dark wood and attentive table service make the perfect setting for dates, anniversaries and family dinners.",
    },
    highlights: {
      fi: [
        "Rauhallinen tunnelma",
        "Ennakkopöytävaraus mahdollinen",
        "Laatuviinit ja intialaiset oluet",
      ],
      en: [
        "Calm, intimate setting",
        "Easy online reservation",
        "Curated wines and Indian beers",
      ],
    },
    image:
      "https://res.cloudinary.com/vbi0knds/image/upload/v1788797208/Ravintola_Tandoori_Koti.jpg",
    cta: {
      href: "/contact#reserve",
      fi: "Varaa oma pöytäsi",
      en: "Reserve a table",
    },
  },
  {
    id: "takeaway",
    icon: ShoppingBag,
    title: { fi: "Nouto ja takeaway", en: "Takeaway and delivery" },
    subtitle: {
      fi: "Ravintolatasoiset maut kotiovelle",
      en: "Restaurant quality at home",
    },
    badge: { fi: "Nopea valmistus", en: "Quick and hot" },
    description: {
      fi: "Tilaa suosikkiateriasi noudettavaksi suoraan keittiöstämme tai tilaa kuljetus kotiin. Ruoka pakataan lämpöä pitäviin rasioihin, jotta se pysyy kuumana ja naan rapeana.",
      en: "Order ahead for pickup on your way home, or get it delivered. Everything is packed to keep oven heat and naan crispness.",
    },
    highlights: {
      fi: [
        "10 % etu suoranoutoihin",
        "Pysyy kuumana ja rapeana",
        "Helppo ennakkotilaus",
      ],
      en: [
        "Discount on direct orders",
        "Insulated packaging",
        "Convenient pickup times",
      ],
    },
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    cta: { href: "/menu", fi: "Tilaa noutoannos", en: "Order takeaway" },
  },
  {
    id: "catering",
    icon: PartyPopper,
    title: { fi: "Catering ja juhlat", en: "Catering and events" },
    subtitle: {
      fi: "Unohtumattomat tarjoilut juhliisi",
      en: "Feasts for any occasion",
    },
    badge: { fi: "Räätälöidyt kokonaisuudet", en: "Tailored to 20–200 guests" },
    description: {
      fi: "Haluatko hurmata vieraasi aidoilla intialaisilla mauilla? Suunnittelemme menut yritystilaisuuksiin, syntymäpäiville, häihin ja yksityistapahtumiin toiveidesi mukaan.",
      en: "Bring the flavours of India to your celebration. From birthday parties to corporate banquets, we design the full catering menu with you.",
    },
    highlights: {
      fi: [
        "Yksilölliset erikoismenut",
        "Täysi lämpö- ja tarjoilutuki",
        "Myös suuriin tilaisuuksiin",
      ],
      en: [
        "Custom chef-designed menus",
        "Warming and serving setups",
        "Corporate and private events",
      ],
    },
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    cta: {
      href: "/contact",
      fi: "Pyydä juhlatarjous",
      en: "Request a catering quote",
    },
  },
];

export default function SpecialFeatures() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const current = FEATURES[activeIndex];
  const pick = (obj) => obj[lang] || obj.fi;

  const fadeUp = {
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  // Content of the stage staggers in each time the selection changes
  const stage = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.2,
      },
    },
  };
  const stageItem = {
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
          "radial-gradient(50% 45% at 90% 20%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 45% at 5% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
      }}
    >
      <style>{`
        @keyframes sfShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .sf-btn:hover .sf-shine { animation: sfShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .sf-btn:hover .sf-shine { animation: none !important; } }
      `}</style>

      {/* Subtle dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <h2 className="max-w-xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {lang === "fi"
              ? "Ravintolamme erikoisuudet"
              : "Everything Tandoori Koti offers"}
          </h2>
          <p className="max-w-sm font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {lang === "fi"
              ? "Arkipäivän lounaasta juhlaillallisiin ja kotiinkuljetukseen. Valitse sinulle sopiva."
              : "From a quick weekday lunch to candlelit dinners, takeaway and event catering in Kajaani."}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10"
        >
          {/* Selector: horizontal scroll on mobile, vertical list on desktop */}
          <div
            role="tablist"
            aria-label={lang === "fi" ? "Palvelut" : "Services"}
            className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FEATURES.map((item, idx) => {
              const selected = activeIndex === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`feature-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="feature-panel"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex shrink-0 snap-start items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B] lg:w-full lg:flex-1 lg:px-5 ${
                    selected
                      ? "border-transparent"
                      : "border-[#F2A93B]/15 bg-[#1C0D0A]/40 hover:border-[#F2A93B]/40 hover:bg-[#3B1511]/30"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="feature-active"
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
                    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      selected
                        ? "bg-[#F2A93B] text-[#2A1206]"
                        : "bg-[#F2A93B]/12 text-[#F2A93B] group-hover:bg-[#F2A93B]/22"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span
                      className={`block whitespace-nowrap font-serif text-lg font-bold transition-colors duration-300 lg:whitespace-normal ${
                        selected ? "text-[#F2A93B]" : "text-brand-cream"
                      }`}
                    >
                      {pick(item.title)}
                    </span>
                    <span className="hidden font-sans text-sm text-[#D9C6A8] lg:block">
                      {pick(item.subtitle)}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`relative hidden h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 lg:grid ${
                      selected
                        ? "rotate-45 bg-[#F2A93B] text-[#2A1206]"
                        : "bg-[#F2A93B]/10 text-[#F2A93B] group-hover:bg-[#F2A93B]/20"
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage */}
          <div className="relative lg:col-span-7">
            {/* Dashed outline, echoing the hero plate ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 md:block"
            />

            <div
              role="tabpanel"
              id="feature-panel"
              aria-labelledby={`feature-tab-${current.id}`}
              className="relative flex h-full min-h-[520px] flex-col justify-end overflow-hidden rounded-3xl border-[5px] border-white/25 bg-[#3B1511] p-6 shadow-2xl shadow-black/60 md:min-h-[600px] md:p-10"
            >
              {/* Image crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{
                    opacity: reduce ? 1 : 0,
                    scale: reduce ? 1 : 1.08,
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 1.02 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover object-center brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A] via-[#1C0D0A]/75 to-[#1C0D0A]/5" />
                </motion.div>
              </AnimatePresence>

              {/* Content */}
              <motion.div
                key={current.id}
                variants={stage}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-5"
              >
                <motion.span
                  variants={stageItem}
                  className="inline-flex rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-4 py-1.5 font-sans text-sm font-semibold text-[#F2A93B] backdrop-blur-md"
                >
                  {pick(current.badge)}
                </motion.span>

                <motion.h3
                  variants={stageItem}
                  className="font-serif text-3xl font-bold leading-tight text-brand-cream sm:text-4xl lg:text-5xl"
                >
                  {pick(current.title)}
                </motion.h3>

                <motion.p
                  variants={stageItem}
                  className="max-w-xl font-sans text-base leading-relaxed text-[#EADFCB] sm:text-lg"
                >
                  {pick(current.description)}
                </motion.p>

                <motion.ul
                  variants={stageItem}
                  className="flex flex-wrap gap-2.5"
                >
                  {(current.highlights[lang] || current.highlights.fi).map(
                    (point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#1C0D0A]/70 px-3.5 py-2 font-sans text-sm text-brand-cream backdrop-blur-sm"
                      >
                        <Check
                          className="h-4 w-4 shrink-0 text-[#F2A93B]"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ),
                  )}
                </motion.ul>

                <motion.div variants={stageItem} className="pt-2">
                  <Link
                    href={current.cta.href}
                    className="sf-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-7 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                  >
                    <span
                      aria-hidden="true"
                      className="sf-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
                    />
                    <span className="relative">{pick(current.cta)}</span>
                    <ArrowUpRight
                      className="relative h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
