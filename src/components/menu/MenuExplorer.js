"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import MenuToolbar from "./MenuToolbar";
import MenuCategoryGroup from "./MenuCategoryGroup";
import useMenuDishes from "./UseMenuDishes";

const TEXT = {
  fi: {
    title: "Koko à la carte -ruokalista",
    subtitle:
      "Selaa valikoimaamme kategorioittain tai etsi suosikkiasi hakukentällä.",
    allCategories: "Kaikki annokset",
    searchPlaceholder: "Etsi annosta nimellä tai ainesosalla...",
    searchLabel: "Hae annoksia",
    clearSearch: "Tyhjennä haku",
    empty: "Yhtään annosta ei löytynyt valituilla hakuehdoilla.",
    clearFilters: "Tyhjennä haku ja suodattimet",
    error: "Ruokalistan lataaminen epäonnistui.",
    retry: "Yritä uudelleen",
    dishCount: "annosta",
    other: "Muut",
  },
  en: {
    title: "The full à la carte menu",
    subtitle:
      "Browse our Indian creations by category, or search by name or ingredient.",
    allCategories: "All dishes",
    searchPlaceholder: "Search dishes by name or description...",
    searchLabel: "Search dishes",
    clearSearch: "Clear search",
    empty: "No dishes found matching your current filter.",
    clearFilters: "Clear search and filters",
    error: "We couldn't load the menu.",
    retry: "Try again",
    dishCount: "dishes",
    other: "Other",
  },
};

function Skeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="h-10 w-56 animate-pulse rounded-full bg-[#F2A93B]/10" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex animate-pulse items-start gap-4 rounded-3xl border border-[#F2A93B]/15 bg-[#1C0D0A]/60 p-5"
          >
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-[#F2A93B]/10" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-5 w-2/3 rounded-full bg-[#F2A93B]/10" />
              <div className="h-3.5 w-full rounded-full bg-[#F2A93B]/10" />
              <div className="h-3.5 w-4/5 rounded-full bg-[#F2A93B]/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuExplorer() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const t = TEXT[lang] || TEXT.fi;

  const { dishes, loading, error, refetch } = useMenuDishes();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Category pills built from the dishes in the database
  const categories = useMemo(() => {
    const map = new Map();
    dishes.forEach((d) => {
      const en = d.categoryEn || d.category;
      const finnish = d.categoryFi || d.categoryEn || d.category;
      if (en && !map.has(en)) map.set(en, finnish);
    });
    return [
      { id: "ALL", label: t.allCategories },
      ...Array.from(map.entries()).map(([en, finnish]) => ({
        id: en,
        label: fi ? finnish : en,
      })),
    ];
  }, [dishes, fi, t.allCategories]);

  // Apply the search, then group by category (or show one category)
  const groupedDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const searched = dishes.filter((dish) => {
      if (!q) return true;
      return (
        dish.nameEn?.toLowerCase().includes(q) ||
        dish.nameFi?.toLowerCase().includes(q) ||
        dish.preparationEn?.toLowerCase().includes(q) ||
        dish.preparationFi?.toLowerCase().includes(q)
      );
    });

    const titleFor = (dish) =>
      fi
        ? dish.categoryFi || dish.categoryEn || dish.category || t.other
        : dish.categoryEn || dish.category || "Other";

    if (selectedCategory !== "ALL") {
      const inCategory = searched.filter(
        (dish) =>
          dish.categoryEn === selectedCategory ||
          dish.category === selectedCategory,
      );
      if (inCategory.length === 0) return [];
      return [
        {
          categoryId: selectedCategory,
          title: titleFor(inCategory[0]),
          dishes: inCategory,
        },
      ];
    }

    const groups = new Map();
    searched.forEach((dish) => {
      const key = dish.categoryEn || dish.category || "Other";
      if (!groups.has(key))
        groups.set(key, { categoryId: key, title: titleFor(dish), dishes: [] });
      groups.get(key).dishes.push(dish);
    });
    return Array.from(groups.values());
  }, [dishes, selectedCategory, searchQuery, fi, t.other]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
  };

  return (
    // No overflow-hidden here: it would break the sticky toolbar
    <section
      id="full-menu"
      className="relative w-full scroll-mt-16 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(50% 35% at 8% 10%, rgba(200,50,30,.2), transparent 70%), radial-gradient(45% 35% at 95% 90%, rgba(242,169,59,.1), transparent 70%), linear-gradient(180deg, #170A08, #1C0D0A)",
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl space-y-4 text-center"
        >
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Toolbar (sticky) */}
        <MenuToolbar
          search={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          searchPlaceholder={t.searchPlaceholder}
          searchLabel={t.searchLabel}
          clearLabel={t.clearSearch}
        />

        {/* Results */}
        <div className="min-h-[320px] pt-12" aria-live="polite">
          {loading ? (
            <Skeleton />
          ) : error ? (
            <div className="mx-auto max-w-md space-y-5 rounded-3xl border border-[#E06A55]/45 bg-[#E06A55]/10 p-8 text-center">
              <p className="font-sans text-lg text-[#F7C3B8]">{t.error}</p>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center justify-center rounded-full bg-[#F2A93B] px-7 py-3 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {t.retry}
              </button>
            </div>
          ) : groupedDishes.length === 0 ? (
            <div className="mx-auto max-w-md space-y-5 py-10 text-center">
              <p className="font-sans text-lg text-[#D9C6A8]">{t.empty}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-6 py-3 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {groupedDishes.map((group) => (
                <MenuCategoryGroup
                  key={group.categoryId}
                  group={group}
                  countLabel={t.dishCount}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
