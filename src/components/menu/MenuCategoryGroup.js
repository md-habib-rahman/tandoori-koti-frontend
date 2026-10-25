"use client";

import { motion, useReducedMotion } from "framer-motion";
import DishCard from "./DishCard";

// A category heading (with dish count) followed by a two-column grid of dish cards.
export default function MenuCategoryGroup({ group, countLabel }) {
  const reduce = useReducedMotion();

  const list = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-dashed border-[#F2A93B]/30 pb-4">
        <h3 className="font-serif text-3xl font-bold text-[#F2A93B] sm:text-4xl">
          {group.title}
        </h3>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-gradient-to-r from-[#F2A93B]/35 to-transparent sm:block"
        />
        <span className="ml-auto shrink-0 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-3.5 py-1 font-sans text-sm text-brand-cream sm:ml-0">
          {group.dishes.length} {countLabel}
        </span>
      </div>

      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2"
      >
        {group.dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </motion.ul>
    </div>
  );
}