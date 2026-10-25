"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "../../lib/formatPrice";
import ServingBadge from "../common/ServingBadge";
import DishInfoModal from "../delivery/DishInfoModal";


// One dish from the API. Animation variants come from the parent list so the cards stagger in.
export default function DishCard({ dish }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  // The modal is only created after the first click, so a long menu does not mount one per card
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const name = fi ? dish.nameFi || dish.nameEn : dish.nameEn || dish.nameFi;
  const description = fi
    ? dish.preparationFi || dish.preparationEn
    : dish.preparationEn || dish.preparationFi;

  const openInfo = () => {
    setHasOpened(true);
    setOpen(true);
  };

  const variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <motion.li
        variants={variants}
        whileHover={reduce ? undefined : { y: -4 }}
        className="flex items-start gap-4 rounded-3xl border border-[#F2A93B]/20 bg-[#1C0D0A]/60 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#F2A93B]/50 hover:bg-[#3B1511]/50 sm:p-5"
      >
        {dish.imageUrl ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/25 shadow-md shadow-black/40">
            <Image
              src={dish.imageUrl}
              alt={name || ""}
              fill
              unoptimized
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-[#F2A93B]/25 bg-[#3B1511] font-serif text-lg font-bold text-[#F2A93B]"
          >
            TK
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-end gap-3">
            <h4 className="font-serif text-lg leading-snug font-bold text-brand-cream sm:text-xl">
              {name}
            </h4>

            {/* Opens the story, ingredients and serving details */}
            <button
              type="button"
              onClick={openInfo}
              aria-haspopup="dialog"
              aria-label={`${fi ? "Näytä annoksen tarina ja tiedot:" : "Show the story and details of"} ${name}`}
              className="mb-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#F2A93B]/40 text-[#F2A93B] transition duration-300 hover:bg-[#F2A93B] hover:text-[#2A1206] active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
            </button>

            <span
              aria-hidden="true"
              className="mb-1.5 hidden min-w-3 flex-1 border-b border-dotted border-[#F2A93B]/35 sm:block"
            />
            <span className="ml-auto shrink-0 font-serif text-lg font-bold text-[#F2A93B] sm:ml-0 sm:text-xl">
              {formatPrice(dish.price, lang)}
            </span>
          </div>

          {description && (
            <p className="mt-1.5 line-clamp-3 font-sans text-[15px] leading-relaxed text-[#D9C6A8]">
              {description}
            </p>
          )}

          {/* "Serves 2 · 6 pcs": renders nothing when the dish has no serving info */}
          <ServingBadge dish={dish} className="mt-2.5" />
        </div>
      </motion.li>

      {hasOpened && (
        <DishInfoModal
          dish={open ? dish : null}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
