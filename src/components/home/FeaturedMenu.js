"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const MENU_HIGHLIGHTS = {
  fi: {
    tag: "MAISTA & IHASTU",
    title: "Valikoituja Makuja",
    subtitle: "Pieni kurkistus suosituimpiin tandoori- ja curryannoksiimme.",
    viewAll: "Katso Koko Ruokalista",
    categories: [
      {
        name: "Alkuruoat (Starters)",
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
            featured: true, // Gold highlight bar from UI
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
        name: "Pääruoat (Main Courses)",
        items: [
          {
            name: "Murg Makhani (Voikana)",
            desc: "Tandoorikanaa täyteläisessä tomaatti-, cashew- ja voikermakastikkeessa.",
            price: "17.50",
            featured: true, // Gold highlight bar from UI
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
            desc: "Kanan, lampaan ja tuorejuuston tikkapaloja tirisevällä valurautaparilalla.",
            price: "20.50",
            featured: false,
          },
        ],
      },
    ],
  },
  en: {
    tag: "SAVOR & ENJOY",
    title: "Our Menus",
    subtitle:
      "A curated preview of our most celebrated tandoor-fired and slow-simmered dishes.",
    viewAll: "View Full A La Carte",
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
            featured: true, // Gold highlight bar from UI
          },
          {
            name: "Vegetable Samosa (2 pcs)",
            desc: "Crisp pastries stuffed with spiced potatoes, green peas, and fresh herbs.",
            price: "7.00",
            featured: false,
          },
        ],
      },
      {
        name: "Main Courses",
        items: [
          {
            name: "Murg Makhani (Butter Chicken)",
            desc: "Roasted tandoori chicken simmered in rich tomato, cashew cream, and churned butter.",
            price: "17.50",
            featured: true, // Gold highlight bar from UI
          },
          {
            name: "Mutton Rogan Josh",
            desc: "Tender braised lamb chunks in Kashmiri chili and whole-spice onion gravy.",
            price: "18.90",
            featured: false,
          },
          {
            name: "Palak Paneer",
            desc: "House-made cottage cheese cubes cooked in creamy garlic-infused spinach sauce.",
            price: "15.50",
            featured: false,
          },
          {
            name: "Tandoori Mix Tikka Sizzler",
            desc: "Char-grilled chicken, lamb, and paneer served on a piping hot cast-iron plate.",
            price: "20.50",
            featured: false,
          },
        ],
      },
    ],
  },
};

const columnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturedMenu() {
  const { lang } = useLanguage();
  const currentMenu = MENU_HIGHLIGHTS[lang] || MENU_HIGHLIGHTS.en;

  return (
    <section className="relative w-full py-24 md:py-32 bg-brand-dark overflow-hidden border-t border-brand-gold/15">
      {/* Decorative Floating Plate on Left Edge (Matching Reference UI Composition) */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:block absolute -left-20 top-1/3 w-64 h-64 rounded-full overflow-hidden border-4 border-brand-gold/30 shadow-2xl shadow-black pointer-events-none opacity-85"
      >
        <Image
          src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
          alt="Indian Curry Dish"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-[600px] h-[350px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Heading & Filigree */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 max-w-xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold">
            {currentMenu.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-brand-cream font-bold tracking-tight">
            {currentMenu.title}
          </h2>
          <p className="text-sm text-brand-muted font-sans leading-relaxed">
            {currentMenu.subtitle}
          </p>

          {/* Micro Gold Divider */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-12 bg-brand-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold" />
            <span className="h-px w-12 bg-brand-gold/40" />
          </div>
        </motion.div>

        {/* Dual-Column Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {currentMenu.categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              {/* Category Title */}
              <div className="border-b border-brand-gold/20 pb-2">
                <h3 className="font-serif text-xl sm:text-2xl text-brand-gold font-medium tracking-wide">
                  {category.name}
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className={`relative p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                      item.featured
                        ? "bg-brand-gold/15 border border-brand-gold/40 shadow-md shadow-brand-gold/5"
                        : "bg-transparent border border-transparent hover:border-brand-gold/20 hover:bg-brand-card/40"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-cream tracking-wide">
                        {item.name}
                      </h4>
                      <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                        €{item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-muted font-sans mt-1.5 leading-relaxed pr-8">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center pt-4"
        >
          <Link
            href="/menu"
            className="inline-block px-8 py-3.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darker transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold shadow-sm"
          >
            {currentMenu.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
