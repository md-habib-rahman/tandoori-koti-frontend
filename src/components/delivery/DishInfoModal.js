"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/formatPrice";
import ServingBadge from "@/components/common/ServingBadge";

const FOCUSABLE =
  'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

function ModalPanel({ dish, quantity, onAdd, onClose }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const titleId = useId();

  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus, Escape key, focus trap and page scroll lock while the modal is open
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const items = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const name = fi ? dish.nameFi || dish.nameEn : dish.nameEn || dish.nameFi;
  const category = fi
    ? dish.categoryFi || dish.categoryEn
    : dish.categoryEn || dish.categoryFi;
  const preparation = fi
    ? dish.preparationFi || dish.preparationEn
    : dish.preparationEn || dish.preparationFi;
  const story = fi
    ? dish.storyFi || dish.storyEn
    : dish.storyEn || dish.storyFi;

  const add = () => {
    onAdd(dish.id, 1);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduce ? 1 : 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onMouseDown={(e) => {
        // Only a click on the dark backdrop itself closes the modal
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 40,
          scale: reduce ? 1 : 0.97,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 30,
          scale: reduce ? 1 : 0.98,
        }}
        transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border-[5px] border-white/20 bg-[#1C0D0A] shadow-2xl shadow-black/70 sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={fi ? "Sulje" : "Close"}
          className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-[#1C0D0A]/80 text-brand-cream backdrop-blur-sm transition duration-300 hover:border-[#F2A93B] hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="overflow-y-auto">
          {dish.imageUrl && (
            <div className="relative h-52 w-full sm:h-64">
              <Image
                src={dish.imageUrl}
                alt={name || ""}
                fill
                unoptimized
                sizes="(min-width: 640px) 672px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0A] via-[#1C0D0A]/20 to-transparent" />
            </div>
          )}

          <div className="space-y-7 p-6 sm:p-8">
            <header className="space-y-3">
              {category && (
                <span className="inline-flex rounded-full border border-[#F2A93B]/50 bg-[#1C0D0A]/70 px-4 py-1.5 font-sans text-sm font-semibold text-[#F2A93B]">
                  {category}
                </span>
              )}
              <h3
                id={titleId}
                className="font-serif text-3xl leading-tight font-bold text-brand-cream sm:text-4xl"
              >
                {name}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-serif text-2xl font-bold text-[#F2A93B]">
                  {formatPrice(dish.price, lang)}
                </span>
                <ServingBadge dish={dish} />
              </div>
            </header>

            {preparation && (
              <section className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-[#F2A93B]">
                  {fi ? "Ainekset ja valmistus" : "Ingredients and preparation"}
                </h4>
                <p className="font-sans text-base leading-relaxed text-brand-cream sm:text-lg">
                  {preparation}
                </p>
              </section>
            )}

            <section className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-[#F2A93B]">
                {fi ? "Annoksen tarina" : "The story of this dish"}
              </h4>
              {story ? (
                <p className="font-sans text-base leading-relaxed whitespace-pre-line text-[#D9C6A8] sm:text-lg">
                  {story}
                </p>
              ) : (
                <p className="font-sans text-base text-[#D9C6A8]/70 italic">
                  {fi
                    ? "Tälle annokselle ei ole vielä lisätty tarinaa."
                    : "No story has been added for this dish yet."}
                </p>
              )}
            </section>
          </div>
        </div>

        <div className="border-t border-dashed border-[#F2A93B]/30 p-4 sm:p-5">
          <button
            type="button"
            onClick={add}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2A93B] px-6 py-3.5 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            {quantity > 0
              ? fi
                ? `Lisää vielä yksi · ${formatPrice(dish.price, lang)}`
                : `Add one more · ${formatPrice(dish.price, lang)}`
              : fi
                ? `Lisää tilaukseen · ${formatPrice(dish.price, lang)}`
                : `Add to order · ${formatPrice(dish.price, lang)}`}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Pass the dish to show, or null to close. Rendered in <body> so no parent can clip or offset it.
export default function DishInfoModal({ dish, quantity = 0, onAdd, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {dish && (
        <ModalPanel
          key={dish.id}
          dish={dish}
          quantity={quantity}
          onAdd={onAdd}
          onClose={onClose}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}
