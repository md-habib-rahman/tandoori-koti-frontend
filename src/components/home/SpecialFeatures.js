"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Clock,
  Flame,
  Wine,
  ShoppingBag,
  PartyPopper,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SpecialFeatures() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      index: "01",
      id: "buffet",
      icon: Clock,
      title: {
        fi: "Lounasbuffet",
        en: "Lunch Buffet",
      },
      subtitle: {
        fi: "Monipuolinen kattaus arkipäivisin",
        en: "Vibrant Weekday Lunch Spread",
      },
      badge: {
        en: "Weekdays Meal",
        fi: "Arkipäivän Ateria",
      },
      description: {
        fi: "Tampereen runsain intialainen lounaspöytä: vähintään kolme lämmintä currya, tandoorivartaat, uunituore naan-leipä, raikas salaattipöytä sekä kahvi ja tee.",
        en: "Tampere’s premier midday dining experience featuring rotating aromatic curries, clay-oven tandoori specialties, hot naan, expansive salads, and spiced chai.",
      },
      highlights: {
        fi: [
          "Päivittäin vaihtuvat maut",
          "Tuore naan suoraan uunista",
          "Sisältää salaatin & kahvin",
        ],
        en: [
          "Daily rotating recipes",
          "Oven-fresh tandoori naan",
          "Full salad & coffee included",
        ],
      },
      image:
        "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09463.jpg",
      cta: {
        href: "/buffet",
        fi: "Tutustu Buffet-listaan",
        en: "View Buffet Schedule",
      },
    },
    {
      index: "02",
      id: "alacarte",
      icon: Flame,
      title: {
        fi: "Á La Carte -Elämys",
        en: "Á La Carte Dining",
      },
      subtitle: {
        fi: "Kulinaarista käsityötä iltaisin ja viikonloppuisin",
        en: "Authentic North Indian Culinary Art",
      },
      badge: {
        fi: "Avoinna joka päivä",
        en: "Available Every Day",
      },
      description: {
        fi: "Perinteisiä pohjoisintialaisia mestariteoksia valmistettuna perinteisessä tandooriuunissa, täyteläisiä biryaneja ja huolella maustettuja kasvisherkkuja.",
        en: "Handcrafted tandoor meats marinated for 24 hours, slow-simmered rich curries, fragrance-loaded dum biryanis, and vibrant vegan selections.",
      },
      highlights: {
        fi: [
          "Aito hiiligrilli-tandoori",
          "Laaja kasvis- ja vegaanivalikoima",
          "Räätälöity tulisuusaste",
        ],
        en: [
          "Charcoal clay tandoori grills",
          "Extensive vegetarian menu",
          "Customizable spice profiles",
        ],
      },
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      cta: {
        href: "/menu",
        fi: "Selaa Ruokalistaa",
        en: "Explore Full Menu",
      },
    },
    {
      index: "03",
      id: "dinein",
      icon: Wine,
      title: {
        fi: "Tunnelmallinen Sali",
        en: "Atmospheric Dine-In",
      },
      subtitle: {
        fi: "Ylellinen ja rauhallinen ravintolamiljöö",
        en: "Warm Luxury & Candlelit Ambience",
      },
      badge: {
        fi: "Pöytävaraukset verkossa",
        en: "Online Table Booking",
      },
      description: {
        fi: "Lämmin puusisustus, pehmeä valaistus ja huomaavainen pöytiintarjoilu luovat ihanteellisen ympäristön merkkipäiville, liiketapaamisille tai treffeille.",
        en: "Subtle golden lighting, dark wood finishes, and attentive table service provide the perfect backdrop for intimate dates, anniversaries, and family dinners.",
      },
      highlights: {
        fi: [
          "Rauhallinen tunnelma",
          "Ennakkopöytävaraus mahdollinen",
          "Laatuviinit & intialaiset oluet",
        ],
        en: [
          "Intimate acoustic setting",
          "Instant online reservation",
          "Curated wines & Indian beers",
        ],
      },
      image:
        "https://res.cloudinary.com/vbi0knds/image/upload/v1788797208/Ravintola_Tandoori_Koti.jpg",
      cta: {
        href: "/contact#reserve",
        fi: "Varaa Oma Pöytäsi",
        en: "Reserve a Table",
      },
    },
    {
      index: "04",
      id: "takeaway",
      icon: ShoppingBag,
      title: {
        fi: "Nouto & Takeaway",
        en: "Takeaway & Delivery",
      },
      subtitle: {
        fi: "Ravintolatasoiset maut kotiovelle",
        en: "Restaurant Quality in Your Home",
      },
      badge: {
        fi: "Nopea valmistus",
        en: "Quick & Hot Packaging",
      },
      description: {
        fi: "Tilaa suosikkiateriasi noudettavaksi suoraan keittiöstämme tai tilaa kuljetus kotiin. Ruoka pakataan lämpöä pitäviin laaturasioihin rapeuden takaamiseksi.",
        en: "Order ahead for swift pickup on your way home, or enjoy direct courier delivery. All orders are packed to retain oven heat and naan crispness.",
      },
      highlights: {
        fi: [
          "10% etu suoranoutoihin",
          "Pysyy kuumana ja rapeana",
          "Helppo ennakkotilaus",
        ],
        en: [
          "Direct order discounts",
          "Thermal protective packaging",
          "Convenient pickup times",
        ],
      },
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
      cta: {
        href: "/menu",
        fi: "Tilaa Noutoannos",
        en: "Order Takeaway",
      },
    },
    {
      index: "05",
      id: "catering",
      icon: PartyPopper,
      title: {
        fi: "Catering & Juhlat",
        en: "Catering & Events",
      },
      subtitle: {
        fi: "Unohtumattomat tarjoilut elämäsi juhliin",
        en: "Bespoke Feasts for Any Occasion",
      },
      badge: {
        fi: "Räätälöidyt kokonaisuudet",
        en: "Tailored to 20–200 Guests",
      },
      description: {
        fi: "Haluatko hurmata vieraasi aidoilla intialaisilla mauilla? Suunnittelemme menut yritystilaisuuksiin, syntymäpäiville, häihin ja yksityistapahtumiin toiveidesi mukaan.",
        en: "Bring the royal flavours of India to your private celebration. From intimate birthday parties to corporate banquets, we curate complete catering menus.",
      },
      highlights: {
        fi: [
          "Yksilölliset erikoismenut",
          "Täysi lämpö- ja tarjoilutuki",
          "Myös suuriin tilaisuuksiin",
        ],
        en: [
          "Custom chef-designed menus",
          "Buffet warming setups provided",
          "Corporate & private events",
        ],
      },
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      cta: {
        href: "/contact",
        fi: "Pyydä Juhlatarjous",
        en: "Request Catering Quote",
      },
    },
  ];

  const current = features[activeIndex];

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#080d0f] text-brand-cream border-t border-brand-gold/15 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-brand-gold/[0.04] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-brand-gold/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-gold/15 pb-8">
          <div className="space-y-3 max-w-xl">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-[0.25em] font-semibold"> */}

            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold mb-8">
              {lang === "fi"
                ? "Kokonaisvaltainen Palvelu"
                : "Signature Offerings"}
            </span>

            {/* </div> */}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-cream">
              {lang === "fi"
                ? "Ravintolamme Erikoisuudet"
                : "Experience Tandoori Koti"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted font-sans max-w-sm leading-relaxed">
            {lang === "fi"
              ? "Arkipäivän lounaasta aina ylellisiin perhejuhliin ja kotiinkuljetukseen. Valitse elämys alta."
              : "From rapid midday lunch feasts to candlelit dinners and tailored event catering in Tampere."}
          </p>
        </div>

        {/* Master Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Interactive Menu Navigation (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {features.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative border flex items-center justify-between group ${
                    isSelected
                      ? "bg-brand-card/90 border-brand-gold/50 shadow-lg shadow-brand-gold/5 translate-x-2"
                      : "bg-brand-card/20 border-brand-gold/10 hover:border-brand-gold/25 hover:bg-brand-card/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-serif text-sm tracking-widest transition-colors ${
                        isSelected
                          ? "text-brand-gold font-bold"
                          : "text-brand-muted group-hover:text-brand-cream"
                      }`}
                    >
                      {item.index}
                    </span>
                    <div>
                      <h3
                        className={`font-serif text-lg font-bold transition-colors ${
                          isSelected
                            ? "text-brand-gold"
                            : "text-brand-cream group-hover:text-brand-goldLight"
                        }`}
                      >
                        {item.title[lang] || item.title.en}
                      </h3>
                      <p className="text-[11px] text-brand-muted font-sans tracking-wide">
                        {item.subtitle[lang] || item.subtitle.en}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-brand-gold text-brand-darker rotate-45"
                        : "bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Visual Showcase Stage (Span 7) */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[460px] md:min-h-[540px] rounded-3xl overflow-hidden border border-brand-gold/25 bg-brand-card/60 flex flex-col justify-end p-8 md:p-12 shadow-2xl">
              {/* Background Image with Cross-fade Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title[lang] || current.title.en}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center brightness-[0.38]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d0f] via-[#080d0f]/60 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Content Overlay */}
              <div className="relative z-10 space-y-6">
                {/* Badge & Number */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 backdrop-blur-md border border-brand-gold/40 text-[11px] font-sans uppercase font-bold tracking-widest text-brand-gold">
                    {current.badge[lang] || current.badge.en}
                  </span>
                  <span className="font-serif text-3xl font-light text-brand-gold/40 tracking-wider">
                    {current.index} / 05
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
                    {current.title[lang] || current.title.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-cream/80 font-sans leading-relaxed max-w-xl">
                    {current.description[lang] || current.description.en}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {(current.highlights[lang] || current.highlights.en).map(
                    (point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-brand-gold/15 backdrop-blur-sm"
                      >
                        <div className="w-4 h-4 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-brand-gold" />
                        </div>
                        <span className="text-[11px] font-sans text-brand-cream/90 font-medium">
                          {point}
                        </span>
                      </div>
                    ),
                  )}
                </div>

                {/* Action Link */}
                <div className="pt-4">
                  <Link
                    href={current.cta.href}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-none bg-brand-gold text-brand-darker hover:bg-brand-goldLight text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl shadow-brand-gold/10 group"
                  >
                    <span>{current.cta[lang] || current.cta.en}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
