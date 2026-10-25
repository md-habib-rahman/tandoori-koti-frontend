"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "../../lib/formatPrice";

// Shown instead of the form after a successful order.
//   order = the `data` object the API returns: { orderNumber, totalPrice, items: [{ dishNameFi, dishNameEn, quantity }] }
export default function DeliverySuccess({ deliveryFee, order, onReset }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  //   console.log(order);
  const netTotal = order?.totalPrice + deliveryFee;
  return (
    <motion.div
      role="status"
      initial={{
        opacity: reduce ? 1 : 0,
        scale: reduce ? 1 : 0.96,
        y: reduce ? 0 : 20,
      }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-2 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 md:block"
      />

      <div className="relative space-y-7 rounded-3xl border-[5px] border-white/20 bg-[#1C0D0A]/85 p-8 text-center shadow-2xl shadow-black/60 backdrop-blur-md sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#7BD36B]/15 text-[#7BD36B]">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-3xl font-bold text-brand-cream sm:text-4xl">
            {fi ? "Tilaus vastaanotettu!" : "Order received!"}
          </h3>
          <p className="mx-auto max-w-md font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {fi
              ? "Ravintola vahvistaa tilauksesi pian. Maksu tapahtuu, kun ruoka toimitetaan."
              : "The restaurant will confirm your order shortly. You pay when the food is delivered."}
          </p>
        </div>

        {order?.orderNumber && (
          <div className="mx-auto max-w-xs rounded-2xl border border-[#F2A93B]/45 bg-[#3B1511]/70 px-6 py-4">
            <p className="font-sans text-sm text-[#D9C6A8]">
              {fi ? "Tilausnumerosi" : "Your order number"}
            </p>
            <p className="mt-1 font-serif text-3xl font-bold tracking-wide text-[#F2A93B]">
              {order.orderNumber}
            </p>
          </div>
        )}

        {Array.isArray(order?.items) && order.items.length > 0 && (
          <ul className="mx-auto max-w-md space-y-2 text-left font-sans text-base text-brand-cream">
            {order.items.map((item, i) => (
              <li
                key={item.id ?? i}
                className="flex items-center justify-between gap-4"
              >
                <span>
                  {item.quantity} ×{" "}
                  {fi
                    ? item.dishNameFi || item.dishNameEn
                    : item.dishNameEn || item.dishNameFi}
                </span>
              </li>
            ))}
            {order.totalPrice != null && (
              <li className="flex items-center justify-between gap-4 border-t border-dashed border-[#F2A93B]/30 pt-3 font-serif text-xl font-bold">
                <span>{fi ? "Välisumma" : "Subtotal"}</span>
                <span className="text-[#F2A93B]">
                  {formatPrice(order.totalPrice, lang)}
                </span>
              </li>
            )}{" "}
            {order.totalPrice != null && (
              <li className="flex items-baseline justify-between gap-4 pt-3 font-sans text-sm text-[#D9C6A8]/70 border-b border-dashed border-[#F2A93B]/30 pb-3">
                <span>{fi ? "Toimitusmaksu" : "Delivery fee"}</span>
                <span className="tabular-nums">
                  {formatPrice(deliveryFee, lang)}
                </span>
              </li>
            )}
            {order.totalPrice != null && (
              <li className="flex items-center justify-between gap-4  pt-3 font-serif text-xl font-bold">
                <span>{fi ? "Yhteensä" : "Total"}</span>
                <span className="text-[#F2A93B]">
                  {formatPrice(netTotal, lang)}
                </span>
              </li>
            )}
          </ul>
        )}

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-cream/45 px-7 py-3.5 font-sans text-base font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
        >
          {fi ? "Tee uusi tilaus" : "Place another order"}
        </button>
      </div>
    </motion.div>
  );
}
