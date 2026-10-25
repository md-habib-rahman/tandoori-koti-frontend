"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MENU_HIGHLIGHTS = {
  fi: {
    title: "Valikoituja makuja",
    subtitle: "Pieni kurkistus suosituimpiin tandoori- ja curryannoksiimme.",
    viewAll: "Katso koko ruokalista",
    favourite: "Suosikki",
    categories: [
      {
        name: "Alkuruoat",
        items: [
          {
            name: "Paneer Pakora",
            desc: "Friteerattua tuorejuustoa maustetussa kikhernejauhotaikinassa.",
            price: "7.00",
            featured: false,
          },
          {
            name: "Prawn Puri",
            desc: "Mausteisia meheviä katkarapuja paistetun puri-leivän päällä.",
            price: "8.90",
            featured: false,
          },
          {
            name: "Chicken Tikka",
            desc: "Jogurtissa ja tandoorimausteissa marinoituja hiiligrillattuja kanapaloja.",
            price: "9.00",
            featured: true,
          },
          {
            name: "Kasvissamosa (2 kpl)",
            desc: "Rapeita leivonnaisia maustetulla peruna-, herne- ja yrttitäytteellä.",
            price: "7.00",
            featured: false,
          },
        ],
      },
      {
        name: "Pääruoat",
        items: [
          {
            name: "Murg Makhani (Voikana)",
            desc: "Tandoorikanaa täyteläisessä tomaatti-, cashew- ja voikermakastikkeessa.",
            price: "17.50",
            featured: true,
          },
          {
            name: "Mutton Rogan Josh",
            desc: "Mureaa lammasta kashmirilaisessa aromaattisessa yrttikastikkeessa.",
            price: "18.90",
            featured: false,
          },
          {
            name: "Palak Paneer",
            desc: "Tuorejuustoa pehmeässä ja mausteisessa pinaatti-valkosipulikastikkeessa.",
            price: "15.50",
            featured: false,
          },
          {
            name: "Tandoori Mix Tikka Sizzler",
            desc: "Kanan, lampaan ja tuorejuuston tikkapaloja tirisevällä valurautapannulla.",
            price: "20.50",
            featured: false,
          },
        ],
      },
    ],
  },
  en: {
    title: "A taste of our menu",
    subtitle:
      "A short preview of our most loved tandoor-fired and slow-simmered dishes.",
    viewAll: "View the full menu",
    favourite: "Favourite",
    categories: [
      {
        name: "Starters",
        items: [
          {
            name: "Paneer Pakora",
            desc: "Deep-fried Indian cottage cheese fritters in spiced gram flour batter.",
            price: "7.00",
            featured: false,
          },
          {
            name: "Prawn Puri",
            desc: "Juicy spiced prawns served on fried golden Indian puri flatbread.",
            price: "8.90",
            featured: false,
          },
          {
            name: "Chicken Tikka",
            desc: "Boneless chicken marinated in spiced yogurt and char-roasted in the tandoor.",
            price: "9.00",
            featured: true,
          },
          {
            name: "Vegetable Samosa (2 pcs)",
            desc: "Crisp pastries stuffed with spiced potatoes, green peas and fresh herbs.",
            price: "7.00",
            featured: false,
          },
        ],
      },
      {
        name: "Main courses",
        items: [
          {
            name: "Murg Makhani (Butter Chicken)",
            desc: "Roasted tandoori chicken simmered in rich tomato, cashew cream and churned butter.",
            price: "17.50",
            featured: true,
          },
          {
            name: "Mutton Rogan Josh",
            desc: "Tender braised lamb in Kashmiri chili and whole-spice onion gravy.",
            price: "18.90",
            featured: false,
          },
          {
            name: "Palak Paneer",
            desc: "House-made cottage cheese cubes in a creamy garlic-infused spinach sauce.",
            price: "15.50",
            featured: false,
          },
          {
            name: "Tandoori Mix Tikka Sizzler",
            desc: "Char-grilled chicken, lamb and paneer on a piping hot cast-iron plate.",
            price: "20.50",
            featured: false,
          },
        ],
      },
    ],
  },
};

export default function FeaturedMenu() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const currentMenu = MENU_HIGHLIGHTS[lang] || MENU_HIGHLIGHTS.fi;
  const fi = lang === "fi";
  const money = (p) => (fi ? `${p.replace(".", ",")} €` : `€${p}`);

  const columnVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(50% 45% at 8% 85%, rgba(200,50,30,.24), transparent 70%), radial-gradient(45% 45% at 95% 10%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #170A08, #1C0D0A)",
      }}
    >
      <style>{`
        @keyframes fmShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .fm-btn:hover .fm-shine { animation: fmShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .fm-btn:hover .fm-shine { animation: none !important; } }
      `}</style>

      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating plate on the left edge (wide screens only, so it never overlaps the menu) */}
      <motion.div
        aria-hidden="true"
        animate={
          reduce ? undefined : { y: [-10, 10, -10], rotate: [-2, 2, -2] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 -left-24 hidden h-64 w-64 2xl:block"
      >
        <div
          className="absolute -inset-10 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(242,169,59,.4), rgba(200,50,30,.2) 45%, transparent 70%)",
          }}
        />
        <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#F2A93B]/35" />
        <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white/30 shadow-2xl shadow-black/60">
          <Image
            src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
            alt=""
            fill
            unoptimized
            sizes="256px"
            className="object-cover"
          />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl space-y-4 text-center"
        >
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {currentMenu.title}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {currentMenu.subtitle}
          </p>

          {/* Small diamond divider */}
          <div
            className="flex items-center justify-center gap-3 pt-2"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-[#F2A93B]/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#F2A93B]" />
            <span className="h-px w-12 bg-[#F2A93B]/40" />
          </div>
        </motion.div>

        {/* Two menu panels */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {currentMenu.categories.map((category) => (
            <motion.div
              key={category.name}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-3xl border border-[#F2A93B]/20 bg-[#1C0D0A]/60 p-4 backdrop-blur-sm sm:p-6"
            >
              <motion.h3
                variants={itemVariants}
                className="mb-4 border-b border-dashed border-[#F2A93B]/30 px-2 pb-4 font-serif text-2xl font-bold text-[#F2A93B] sm:text-3xl"
              >
                {category.name}
              </motion.h3>

              <ul className="space-y-1">
                {category.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    whileHover={reduce ? undefined : { x: 4 }}
                    className={`rounded-2xl border p-3 transition-colors duration-300 sm:p-4 ${
                      item.featured
                        ? "border-[#F2A93B]/50 bg-[#3B1511]/70 shadow-md shadow-black/30"
                        : "border-transparent hover:border-[#F2A93B]/25 hover:bg-[#3B1511]/30"
                    }`}
                  >
                    <div className="flex items-end gap-3">
                      <h4 className="font-serif text-lg font-bold leading-snug text-brand-cream sm:text-xl">
                        {item.name}
                      </h4>
                      {item.featured && (
                        <span className="mb-0.5 hidden shrink-0 items-center gap-1 rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-2.5 py-0.5 font-sans text-xs font-semibold text-[#F2A93B] sm:inline-flex">
                          <Star
                            className="h-3 w-3 fill-current"
                            aria-hidden="true"
                          />
                          {currentMenu.favourite}
                        </span>
                      )}
                      {/* Dotted leader, like a printed menu */}
                      <span
                        aria-hidden="true"
                        className="mb-1.5 min-w-4 flex-1 border-b border-dotted border-[#F2A93B]/35"
                      />
                      <span className="shrink-0 font-serif text-lg font-bold text-[#F2A93B] sm:text-xl">
                        {money(item.price)}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-[34em] font-sans text-[15px] leading-relaxed text-[#D9C6A8] sm:text-base">
                      {item.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2 }}
          className="text-center"
        >
          <Link
            href="/menu"
            className="fm-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-8 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span
              aria-hidden="true"
              className="fm-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
            />
            <span className="relative">{currentMenu.viewAll}</span>
            <ArrowUpRight className="relative h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
