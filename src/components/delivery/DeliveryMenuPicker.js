"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Info, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/formatPrice";
import ServingBadge from "@/components/common/ServingBadge";
import DishInfoModal from "./DishInfoModal";

export const MAX_PER_DISH = 20;

// A category with more dishes than this shows a "Load more" button
const INITIAL_VISIBLE = 5;

function Skeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-4 rounded-2xl border border-[#F2A93B]/15 bg-[#1C0D0A]/60 p-4"
        >
          <div className="h-14 w-14 shrink-0 rounded-xl bg-[#F2A93B]/10" />
          <div className="flex-1 space-y-2.5">
            <div className="h-5 w-2/3 rounded-full bg-[#F2A93B]/10" />
            <div className="h-3.5 w-full rounded-full bg-[#F2A93B]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Step 1: pick dishes. `quantities` is { [dishId]: number }, `onChange(id, delta)` adjusts one dish.
export default function DeliveryMenuPicker({ dishes, loading, error, refetch, quantities, onChange }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState({}); // { [categoryId]: true } once "Load more" was pressed
  const [infoDish, setInfoDish] = useState(null);

  const listRef = useRef(null);
  const justExpanded = useRef(false);

  // Category pills from the dishes themselves
  const categories = useMemo(() => {
    const map = new Map();
    dishes.forEach((d) => {
      const en = d.categoryEn || d.category;
      const finnish = d.categoryFi || d.categoryEn || d.category;
      if (en && !map.has(en)) map.set(en, finnish);
    });
    return Array.from(map.entries()).map(([en, finnish]) => ({ id: en, label: fi ? finnish : en }));
  }, [dishes, fi]);

  const activeId = selected ?? categories[0]?.id;
  const inCategory = dishes.filter((d) => (d.categoryEn || d.category) === activeId);

  const showAll = Boolean(expanded[activeId]);
  const shown = showAll ? inCategory : inCategory.slice(0, INITIAL_VISIBLE);
  const hiddenCount = inCategory.length - shown.length;

  const countIn = (id) =>
    dishes
      .filter((d) => (d.categoryEn || d.category) === id)
      .reduce((sum, d) => sum + (quantities[d.id] || 0), 0);

  const loadMore = () => {
    justExpanded.current = true;
    setExpanded((prev) => ({ ...prev, [activeId]: true }));
  };

  // The button disappears after it is pressed, so move keyboard focus to the first new dish
  useEffect(() => {
    if (!justExpanded.current) return;
    justExpanded.current = false;
    listRef.current?.children[INITIAL_VISIBLE]?.focus();
  }, [expanded]);

  const dishName = (d) => (fi ? d.nameFi || d.nameEn : d.nameEn || d.nameFi);
  const dishDesc = (d) => (fi ? d.preparationFi || d.preparationEn : d.preparationEn || d.preparationFi);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2A93B] font-serif text-lg font-bold text-[#2A1206]">
          1
        </span>
        <h3 className="font-serif text-2xl font-bold text-brand-cream sm:text-3xl">
          {fi ? "Valitse annokset" : "Choose your dishes"}
        </h3>
      </div>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="space-y-4 rounded-3xl border border-[#E06A55]/45 bg-[#E06A55]/10 p-6 text-center">
          <p className="font-sans text-lg text-[#F7C3B8]">
            {fi ? "Ruokalistan lataaminen epäonnistui." : "We couldn't load the menu."}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center justify-center rounded-full bg-[#F2A93B] px-6 py-2.5 font-sans text-base font-semibold text-[#2A1206] transition hover:bg-[#FFBD57] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            {fi ? "Yritä uudelleen" : "Try again"}
          </button>
        </div>
      ) : (
        <>
          {/* Category pills: swipe sideways on small screens */}
          <div
            role="group"
            aria-label={fi ? "Kategoriat" : "Categories"}
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const active = cat.id === activeId;
              const count = countIn(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelected(cat.id)}
                  aria-pressed={active}
                  className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 font-sans text-[15px] font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B] ${
                    active
                      ? "border-[#F2A93B] bg-[#F2A93B] text-[#2A1206]"
                      : "border-[#F2A93B]/25 bg-[#1C0D0A]/60 text-brand-cream hover:border-[#F2A93B]/60 hover:text-[#F2A93B]"
                  }`}
                >
                  {cat.label}
                  {count > 0 && (
                    <span
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-bold ${
                        active ? "bg-[#2A1206] text-[#F2A93B]" : "bg-[#F2A93B] text-[#2A1206]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dishes */}
          <ul ref={listRef} className="space-y-3">
            {shown.map((dish, i) => {
              const qty = quantities[dish.id] || 0;
              // Dishes revealed by "Load more" cascade in from the top of the new group
              const delay = i < INITIAL_VISIBLE ? Math.min(i, 8) * 0.04 : (i - INITIAL_VISIBLE) * 0.04;
              return (
                <motion.li
                  key={dish.id}
                  tabIndex={-1}
                  initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : Math.min(delay, 0.4) }}
                  className={`flex items-center gap-4 rounded-2xl border p-3 transition-colors duration-300 focus:outline-none sm:p-4 ${
                    qty > 0
                      ? "border-[#F2A93B]/55 bg-[#3B1511]/70"
                      : "border-[#F2A93B]/20 bg-[#1C0D0A]/60 hover:border-[#F2A93B]/40"
                  }`}
                >
                  {dish.imageUrl && (
                    <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-white/25 sm:block">
                      <Image src={dish.imageUrl} alt="" fill unoptimized sizes="64px" className="object-cover" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <h4 className="font-serif text-lg leading-snug font-bold text-brand-cream">{dishName(dish)}</h4>
                      <button
                        type="button"
                        onClick={() => setInfoDish(dish)}
                        aria-haspopup="dialog"
                        aria-label={`${fi ? "Näytä annoksen tiedot ja tarina:" : "Show dish details and story:"} ${dishName(dish)}`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#F2A93B]/40 text-[#F2A93B] transition duration-300 hover:bg-[#F2A93B] hover:text-[#2A1206] active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                      >
                        <Info className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {dishDesc(dish) && (
                      <p className="mt-0.5 line-clamp-2 font-sans text-[15px] leading-snug text-[#D9C6A8]">
                        {dishDesc(dish)}
                      </p>
                    )}

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <p className="font-serif text-lg font-bold text-[#F2A93B]">{formatPrice(dish.price, lang)}</p>
                      <ServingBadge dish={dish} />
                    </div>
                  </div>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => onChange(dish.id, 1)}
                      aria-label={`${fi ? "Lisää" : "Add"} ${dishName(dish)}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#F2A93B]/60 px-4 py-2 font-sans text-[15px] font-semibold text-[#F2A93B] transition duration-300 hover:bg-[#F2A93B] hover:text-[#2A1206] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      {fi ? "Lisää" : "Add"}
                    </button>
                  ) : (
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#F2A93B]/40 bg-[#1C0D0A]/70 p-1">
                      <button
                        type="button"
                        onClick={() => onChange(dish.id, -1)}
                        aria-label={`${fi ? "Vähennä" : "Remove one"} ${dishName(dish)}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-[#F2A93B] transition hover:bg-[#F2A93B]/15 active:scale-90 focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span aria-live="polite" className="w-7 text-center font-serif text-lg font-bold text-brand-cream">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChange(dish.id, 1)}
                        disabled={qty >= MAX_PER_DISH}
                        aria-label={`${fi ? "Lisää yksi" : "Add one"} ${dishName(dish)}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-[#F2A93B] transition hover:bg-[#F2A93B]/15 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* Load more: only for categories with more than INITIAL_VISIBLE dishes */}
          {hiddenCount > 0 && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={loadMore}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-cream/45 px-7 py-3 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {fi ? `Näytä lisää (${hiddenCount})` : `Load more (${hiddenCount})`}
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Dish details and story */}
      <DishInfoModal
        dish={infoDish}
        quantity={infoDish ? quantities[infoDish.id] || 0 : 0}
        onAdd={onChange}
        onClose={() => setInfoDish(null)}
      />
    </div>
  );
}