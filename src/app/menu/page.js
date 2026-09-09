"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ReservationCta from "@/components/common/ReservationCta";
import InstagramGrid from "@/components/common/InstagramGrid";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function MenuPage() {
  const { lang } = useLanguage();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch full live database catalog via Axios
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
        const response = await axios.get(`${baseUrl}/menu/regular`);

        let items = [];
        if (Array.isArray(response.data)) {
          items = response.data;
        } else if (Array.isArray(response.data?.data)) {
          items = response.data.data;
        } else if (Array.isArray(response.data?.dishes)) {
          items = response.data.dishes;
        }

        setDishes(items);
      } catch (err) {
        console.error(
          "Failed to fetch menu items with Axios:",
          err?.response?.data || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const content = {
    fi: {
      badge: "AITOJA MAKUJA & PERINTEITÄ",
      title: "Refill Your Tank",
      subtitle:
        "Tervetuloa tutustumaan aitoon intialaiseen makumaailmaan. Kaikki annokset valmistetaan tilauksesta tuoreista raaka-aineista ja aidoista mausteista.",
      sec1Tag: "ALKURUOAT & HERKUT",
      sec1Title: "The Perfect Starter",
      sec1Desc:
        "Rapeita samosoja, tandoorilämmössä paistettuja vartaita ja maustettuja katkarapuja herättelemään ruokahalua.",
      sec2Tag: "PÄÄRUOAT & TANDOORI",
      sec2Title: "Meet Your Meat",
      sec2Desc:
        "Perinteisessä saviuunissa kypsennetyt mureat lihat, mehevät lampaanpalat ja täyteläiset miedot tai tuliset currykastikkeet.",
      sec3Tag: "KASVIS & MERENELÄVÄT",
      sec3Title: "Delight in Every Bite",
      sec3Desc:
        "Talon tuorejuustoa kermaisessa pinaattikastikkeessa sekä mereneläviä aromaattisessa tamarindi-kookoscurryssa.",
      quote:
        "Tandoori Koti tarjoaa ensiluokkaisen makumatkan, jossa jokainen suupala tuo lautasellesi aitoja intialaisia mausteita ja uunin lämpöä.",
      explorerTitle: "Koko Á La Carte Ruokalista",
      explorerSubtitle:
        "Selaa valikoimaamme kategorioittain tai etsi suosikkiasi hakukentällä.",
      allCategories: "Kaikki Annokset",
      searchPlaceholder: "Etsi annosta nimellä tai ainesosalla...",
      emptyResults: "Yhtään annosta ei löytynyt valituilla hakuehdoilla.",
      dishCount: "annosta",
    },
    en: {
      badge: "AUTHENTIC RECIPES & SPICES",
      title: "Refill Your Tank",
      subtitle:
        "Welcome to our culinary haven. Every dish is cooked to order using authentic spices, centuries-old recipes, and live charcoal heat.",
      sec1Tag: "STARTERS & BITES",
      sec1Title: "The Perfect Starter",
      sec1Desc:
        "Crisp golden samosas, spiced street pakoras, and sizzling tandoori skewers to awaken your palate.",
      sec2Tag: "MAINS & LIVE TANDOOR",
      sec2Title: "Meet Your Meat",
      sec2Desc:
        "Tender lamb simmered in Kashmiri aromatics, succulent char-grilled chicken, and slow-braised beef curries.",
      sec3Tag: "VEGETARIAN & SEAFOOD",
      sec3Title: "Delight in Every Bite",
      sec3Desc:
        "House-made cottage cheese in rich garlic spinach sauce and jumbo prawns stewed in spiced coconut gravy.",
      quote:
        "Tandoori Koti is a premium taste that yearns to be savored, ground deeply between authentic spices and clay-oven warmth.",
      explorerTitle: "Full À La Carte Collection",
      explorerSubtitle:
        "Browse our authentic Indian creations by category or search by ingredient.",
      allCategories: "All Dishes",
      searchPlaceholder: "Search dishes by name or description...",
      emptyResults: "No dishes found matching your current filter.",
      dishCount: "dishes",
    },
  };

  const t = content[lang] || content.en;

  // Generate unique filter pills from database items
  const categories = useMemo(() => {
    const map = new Map();
    dishes.forEach((d) => {
      const en = d.categoryEn || d.category;
      const fi = d.categoryFi || d.categoryEn || d.category;
      if (en && !map.has(en)) {
        map.set(en, fi);
      }
    });

    return [
      { id: "ALL", label: t.allCategories },
      ...Array.from(map.entries()).map(([en, fi]) => ({
        id: en,
        label: lang === "fi" ? fi : en,
      })),
    ];
  }, [dishes, lang, t.allCategories]);

  // Group dishes by category when on "ALL", or isolate single category
  const groupedDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1. Filter all items by search query first
    const searched = dishes.filter((dish) => {
      if (!q) return true;
      return (
        dish.nameEn?.toLowerCase().includes(q) ||
        dish.nameFi?.toLowerCase().includes(q) ||
        dish.preparationEn?.toLowerCase().includes(q) ||
        dish.preparationFi?.toLowerCase().includes(q)
      );
    });

    // 2. If a specific category tab is selected
    if (selectedCategory !== "ALL") {
      const catDishes = searched.filter(
        (dish) =>
          dish.categoryEn === selectedCategory ||
          dish.category === selectedCategory,
      );

      if (catDishes.length === 0) return [];

      const sample = catDishes[0];
      const title =
        lang === "fi"
          ? sample.categoryFi || sample.categoryEn || sample.category
          : sample.categoryEn || sample.category;

      return [{ categoryId: selectedCategory, title, dishes: catDishes }];
    }

    // 3. When selectedCategory === "ALL": Group by category
    const groupsMap = new Map();

    searched.forEach((dish) => {
      const catKey = dish.categoryEn || dish.category || "Other";
      if (!groupsMap.has(catKey)) {
        const title =
          lang === "fi"
            ? dish.categoryFi || dish.categoryEn || dish.category || "Muut"
            : dish.categoryEn || dish.category || "Other";

        groupsMap.set(catKey, { categoryId: catKey, title, dishes: [] });
      }
      groupsMap.get(catKey).dishes.push(dish);
    });

    return Array.from(groupsMap.values());
  }, [dishes, selectedCategory, searchQuery, lang]);

  return (
    <div className="w-full bg-brand-dark text-brand-cream overflow-hidden">
      {/* --------------------------------------------------------
          1. HERO BANNER
      -------------------------------------------------------- */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09450.jpg"
          alt="Outdoor dining table"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-75 scale-105"
        />
        {/* <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute -top-10 -left-12 w-48 h-48 rounded-full overflow-hidden border-2 border-brand-gold/30 shadow-2xl opacity-75 pointer-events-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
            alt="Decorative plate"
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div> */}

        {/* <motion.div
          animate={{ y: [8, -8, 8], rotate: [4, -4, 4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-6 -right-12 w-56 h-56 rounded-full overflow-hidden border-2 border-brand-gold/30 shadow-2xl opacity-75 pointer-events-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
            alt="Decorative plate"
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div> */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-darker/60 via-brand-darker/40 to-brand-dark" />

        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" /> */}

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold inline-block"
          >
            {t.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-brand-cream font-bold tracking-tight"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-brand-muted font-sans leading-relaxed max-w-xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* --------------------------------------------------------
          2. EDITORIAL SHOWCASE SECTIONS
      -------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28 pb-24">
        {/* BLOCK 1: Starters */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm h-88 sm:h-96 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl shadow-black group">
              <Image
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
                alt="Starters & Samosa"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
                {t.sec1Tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-cream font-bold mt-1">
                {t.sec1Title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted font-sans mt-2 leading-relaxed">
                {t.sec1Desc}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  nameEn: "Paneer Pakora",
                  nameFi: "Paneer Pakora",
                  price: "7.00",
                  descEn: "Deep-fried cottage cheese in spiced chickpea batter",
                  descFi: "Friteerattua tuorejuustoa maustetussa taikinassa",
                },
                {
                  nameEn: "Chicken Tikka",
                  nameFi: "Chicken Tikka",
                  price: "9.00",
                  descEn:
                    "Tandoor-charred boneless chicken chunks in yogurt marinade",
                  descFi: "Jogurttimarinoitua hiiligrillattua kanaa",
                  highlight: true,
                },
                {
                  nameEn: "Prawn Puri",
                  nameFi: "Prawn Puri",
                  price: "8.90",
                  descEn:
                    "Juicy sautéed king prawns on crisp Indian puri bread",
                  descFi: "Meheviä katkarapuja paistetulla puri-leivällä",
                },
                {
                  nameEn: "Vegetable Samosa",
                  nameFi: "Kasvissamosa",
                  price: "7.00",
                  descEn:
                    "Golden pastry filled with spiced potatoes, peas, and fresh mint",
                  descFi:
                    "Rapea leivonnainen peruna-, herne- ja yrttitäytteellä",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl transition-all ${
                    item.highlight
                      ? "bg-brand-gold/15 border border-brand-gold/40 shadow-xs"
                      : "border border-transparent hover:border-brand-gold/20 hover:bg-brand-card/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-base font-bold text-brand-cream">
                      {lang === "fi" ? item.nameFi : item.nameEn}
                    </h3>
                    <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                      €{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    {lang === "fi" ? item.descFi : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* BLOCK 2: Mains & Tandoor */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 order-2 lg:order-1"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
                {t.sec2Tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-cream font-bold mt-1">
                {t.sec2Title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted font-sans mt-2 leading-relaxed">
                {t.sec2Desc}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  nameEn: "Murg Makhani (Butter Chicken)",
                  nameFi: "Murg Makhani (Voikana)",
                  price: "17.50",
                  descEn:
                    "Char-grilled tandoori chicken simmered in rich butter tomato cashew gravy",
                  descFi:
                    "Tandoorigrillattua kanaa täyteläisessä tomaatti-voikermakastikkeessa",
                  highlight: true,
                },
                {
                  nameEn: "Mutton Rogan Josh",
                  nameFi: "Mutton Rogan Josh",
                  price: "18.90",
                  descEn:
                    "Tender lamb chunks in Kashmiri chili and aromatic whole-spice reduction",
                  descFi:
                    "Mureaa lammasta kashmirilaisessa chili-yrttikastikkeessa",
                },
                {
                  nameEn: "Beef Vindaloo",
                  nameFi: "Nautaa Vindaloo",
                  price: "17.90",
                  descEn:
                    "Fiery hot Goan spiced beef curry with vinegar, garlic, and soft potatoes",
                  descFi:
                    "Erittäin tulista nautaa etikka-chilikastikkeessa perunalla",
                },
                {
                  nameEn: "Tandoori Mix Tikka Sizzler",
                  nameFi: "Tandoori Mix Tikka Sizzler",
                  price: "20.50",
                  descEn:
                    "Char-grilled chicken, lamb, and paneer served on a piping cast-iron sizzler",
                  descFi:
                    "Kanan, lampaan ja juuston tikkapaloja kuumalla parilalla",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl transition-all ${
                    item.highlight
                      ? "bg-brand-gold/15 border border-brand-gold/40 shadow-xs"
                      : "border border-transparent hover:border-brand-gold/20 hover:bg-brand-card/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-base font-bold text-brand-cream">
                      {lang === "fi" ? item.nameFi : item.nameEn}
                    </h3>
                    <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                      €{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    {lang === "fi" ? item.descFi : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm h-88 sm:h-96 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl shadow-black group">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09455.jpg"
                alt="Tandoori & Curries"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* BLOCK 3: Veg & Seafood */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm h-88 sm:h-96 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl shadow-black group">
              <Image
                src="https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09476.jpg"
                alt="Seafood & Vegetarian"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
                {t.sec3Tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-cream font-bold mt-1">
                {t.sec3Title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted font-sans mt-2 leading-relaxed">
                {t.sec3Desc}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  nameEn: "Palak Paneer",
                  nameFi: "Palak Paneer",
                  price: "15.50",
                  descEn:
                    "Cottage cheese cubes bathed in smooth, fragrant garlic-steeped spinach",
                  descFi:
                    "Tuorejuustoa pehmeässä ja maustetussa pinaattikastikkeessa",
                  highlight: true,
                },
                {
                  nameEn: "Garlic Prawns",
                  nameFi: "Valkosipulikatkaravut",
                  price: "18.90",
                  descEn:
                    "Succulent king prawns sautéed with crushed garlic butter, cilantro, and spice",
                  descFi:
                    "Jättikatkarapuja tuoreessa valkosipulivoissa korianterilla",
                },
                {
                  nameEn: "Dal Makhani",
                  nameFi: "Dal Makhani",
                  price: "14.50",
                  descEn:
                    "Black lentils slow-simmered overnight with butter and pureed tomatoes",
                  descFi:
                    "Mustia linssejä haudutettuna voissa ja tomaattikastikkeessa",
                },
                {
                  nameEn: "Fish Curry",
                  nameFi: "Kalacurry",
                  price: "17.50",
                  descEn:
                    "Tender fish simmered in mustard seeds, curry leaves, and coconut milk",
                  descFi: "Kalaa kookosmaidossa ja mausteisessa curryliemessä",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl transition-all ${
                    item.highlight
                      ? "bg-brand-gold/15 border border-brand-gold/40 shadow-xs"
                      : "border border-transparent hover:border-brand-gold/20 hover:bg-brand-card/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-base font-bold text-brand-cream">
                      {lang === "fi" ? item.nameFi : item.nameEn}
                    </h3>
                    <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                      €{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted font-sans mt-1">
                    {lang === "fi" ? item.descFi : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* --------------------------------------------------------
          3. QUOTE BANNER
      -------------------------------------------------------- */}
      <section className="py-20 bg-brand-darker border-y border-brand-gold/15 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-cream font-normal leading-snug">
            "{t.quote}"
          </blockquote>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-16 bg-brand-gold/40" />
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="h-px w-16 bg-brand-gold/40" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
          4. FULL BILINGUAL CATALOG EXPLORER (GROUPED BY CATEGORY)
      -------------------------------------------------------- */}
      <section className="py-24 max-w-6xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-cream font-bold">
            {t.explorerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-sans">
            {t.explorerSubtitle}
          </p>
        </div>

        {/* Filter Toolbar: Search + Category Pills */}
        <div className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-brand-card/90 border border-brand-gold/25 rounded-full pl-11 pr-4 py-3 text-xs text-brand-cream placeholder-brand-muted focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 ${
                    active
                      ? "bg-brand-gold text-brand-darker font-bold shadow-md shadow-brand-gold/20 scale-105"
                      : "bg-brand-card/80 text-brand-muted border border-brand-gold/20 hover:text-brand-cream hover:border-brand-gold/40"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Catalog View */}
        <div className="min-h-[300px]">
          {loading ? (
            <p className="text-center text-xs text-brand-muted py-16">
              Loading fresh culinary creations...
            </p>
          ) : groupedDishes.length === 0 ? (
            <p className="text-center text-xs text-brand-muted py-16">
              {t.emptyResults}
            </p>
          ) : (
            <div className="space-y-16">
              {groupedDishes.map((group) => (
                <div key={group.categoryId} className="space-y-6">
                  {/* Category Header with Gold Line Divider */}
                  <div className="flex items-center justify-between gap-4 border-b border-brand-gold/25 pb-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-gold tracking-wide">
                      {group.title}
                    </h3>
                    <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-brand-gold/35 to-transparent mx-4" />
                    <span className="text-xs font-sans text-brand-muted uppercase tracking-widest shrink-0">
                      {group.dishes.length} {t.dishCount}
                    </span>
                  </div>

                  {/* 2-Column Grid of Dishes inside this Category */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                  >
                    {group.dishes.map((dish) => (
                      <motion.div
                        key={dish.id}
                        variants={itemVariants}
                        className="bg-brand-card/50 border border-brand-gold/15 hover:border-brand-gold/40 p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-start gap-4"
                      >
                        {dish.imageUrl ? (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-brand-gold/20">
                            <Image
                              src={dish.imageUrl}
                              alt={dish.nameEn || "Dish"}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-brand-darker border border-brand-gold/20 shrink-0 flex items-center justify-center text-brand-gold text-xs font-serif font-bold">
                            TK
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="font-serif text-base font-bold text-brand-cream truncate">
                              {lang === "fi" ? dish.nameFi : dish.nameEn}
                            </h4>
                            <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                              €{parseFloat(dish.price).toFixed(2)}
                            </span>
                          </div>

                          <p className="text-[11px] text-brand-gold/80 font-sans mt-0.5">
                            {lang === "fi" ? dish.categoryFi : dish.categoryEn}
                          </p>

                          <p className="text-xs text-brand-muted font-sans mt-1 line-clamp-2 leading-relaxed">
                            {lang === "fi"
                              ? dish.preparationFi
                              : dish.preparationEn}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------
          5. SHARED CTA & INSTAGRAM SECTIONS
      -------------------------------------------------------- */}
      <ReservationCta />
      <InstagramGrid />
    </div>
  );
}
