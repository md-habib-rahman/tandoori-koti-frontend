"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  LocateFixed,
  Loader2,
  ShoppingBag,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useState } from "react";

import { formatPrice } from "../../lib/formatPrice";
import useDeviceAddress from "./useDeviceAddress";
import { useApi } from "@/hooks/useApi";

const inputClass =
  "w-full rounded-xl border border-[#F2A93B]/25 bg-[#1C0D0A]/70 px-4 py-3 font-sans text-base text-brand-cream placeholder:text-[#D9C6A8]/45 transition-colors duration-300 hover:border-[#F2A93B]/45 focus:border-[#F2A93B] focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/30";

function Field({ id, label, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-sans text-sm font-medium text-[#D9C6A8]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// Step 2: order summary, contact details and the submit button.
//   lines: [{ dish, qty }]   total: number   form: { customerName, customerPhone, deliveryAddress, postalCode, notes }
//   onLocation({ deliveryAddress, postalCode }) is called when the device location was turned into an address
export default function DeliveryOrderPanel({
  lines,
  total,
  onRemove,
  form,
  onField,
  onSubmit,
  status,
  onLocation,
}) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const loading = status.state === "loading";
  const empty = lines.length === 0;
  //   const [isEmpty, setIsEmpty] = useState(true);
  const geo = useDeviceAddress(lang);
  const locating = geo.status === "locating";
  const { request, isLoading, error } = useApi();

  const [deliverySettings, setDeliverySettings] = useState({
    isDeliveryFee: false,
    deliveryFee: 0,
  });

  //   useEffect(() => {
  //     if (empty === 0) setIsEmpty((prev) => !prev);
  //     else setIsEmpty(false);
  //   });

  useEffect(() => {
    let cancelled = false;

    const fetchSettings = async () => {
      try {
        const response = await request({ url: "/settings" });

        if (cancelled) return;

        // Adjust this according to your API response structure.
        const settings = response?.data ?? response;

        setDeliverySettings({
          isDeliveryFee: Boolean(settings?.isDeliveryFee),
          deliveryFee: Number(settings?.deliveryFee) || 0,
        });
      } catch (err) {
        console.error("Failed to fetch delivery settings:", err);
      }
    };

    fetchSettings();

    return () => {
      cancelled = true;
    };
  }, [request]);

  //   const finalTotal = useMemo(
  //     () =>
  //       total +
  //       (deliverySettings?.isDeliveryFee ? deliverySettings?.deliveryFee : 0),
  //     [total, deliverySettings?.isDeliveryFee, deliverySettings?.deliveryFee],
  //   );

  const finalTotal = total;

  const geoMessages = {
    done: fi
      ? "Osoite täytetty sijainnistasi. Tarkista se ja lisää rappu tai huoneisto."
      : "Address filled from your location. Please check it and add the stairwell or apartment.",
    DENIED: fi
      ? "Sijainnin käyttö on estetty. Salli sijainti selaimen asetuksista tai kirjoita osoite käsin."
      : "Location access is blocked. Allow it in your browser settings or type the address.",
    UNAVAILABLE: fi
      ? "Sijaintia ei voitu selvittää. Kirjoita osoite käsin."
      : "We couldn't work out your location. Please type the address.",
    TIMEOUT: fi
      ? "Sijainnin haku kesti liian kauan. Yritä uudelleen tai kirjoita osoite käsin."
      : "Finding your location took too long. Try again or type the address.",
    NO_ADDRESS: fi
      ? "Sijainnistasi ei löytynyt osoitetta. Kirjoita osoite käsin."
      : "No address was found for your location. Please type it.",
    GEOCODE_FAILED: fi
      ? "Osoitteen haku epäonnistui. Kirjoita osoite käsin."
      : "The address lookup failed. Please type the address.",
    UNSUPPORTED: fi
      ? "Selaimesi ei tue sijaintia. Kirjoita osoite käsin."
      : "Your browser doesn't support location. Please type the address.",
  };
  const geoMessage =
    geo.status === "done"
      ? geoMessages.done
      : geo.status === "error"
        ? geoMessages[geo.error]
        : "";

  const useMyLocation = () =>
    geo.locate(({ street, postalCode }) =>
      onLocation?.({ deliveryAddress: street, postalCode }),
    );

  const dishName = (d) => (fi ? d.nameFi || d.nameEn : d.nameEn || d.nameFi);

  return (
    <div className="relative">
      {/* Dashed outline, echoing the other sections */}
      <div
        aria-hidden="true"
        className="absolute -inset-2 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 md:block"
      />

      <form
        onSubmit={onSubmit}
        className="relative space-y-6 rounded-3xl border-[5px] border-white/20 bg-[#1C0D0A]/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8"
      >
        {/* Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2A93B] font-serif text-lg font-bold text-[#2A1206]">
              2
            </span>
            <h3 className="font-serif text-2xl font-bold text-brand-cream sm:text-3xl">
              {fi ? "Tilauksesi" : "Your order"}
            </h3>
          </div>
          {empty ? (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#F2A93B]/30 p-4 font-sans text-[15px] text-[#D9C6A8]">
              <ShoppingBag
                className="h-5 w-5 shrink-0 text-[#F2A93B]"
                aria-hidden="true"
              />
              {fi
                ? "Lisää vähintään yksi annos vasemmalta."
                : "Add at least one dish from the menu."}
            </div>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {lines.map(({ dish, qty }) => (
                  <motion.li
                    key={dish.id}
                    layout={!reduce}
                    initial={{
                      opacity: reduce ? 1 : 0,
                      height: reduce ? "auto" : 0,
                    }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 rounded-xl bg-[#3B1511]/50 px-3 py-2.5">
                      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#F2A93B] px-1 font-sans text-sm font-bold text-[#2A1206]">
                        {qty}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-sans text-base text-brand-cream">
                        {dishName(dish)}
                      </span>
                      <span className="shrink-0 font-sans text-base text-[#D9C6A8]">
                        {formatPrice(Number(dish.price) * qty, lang)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(dish.id)}
                        aria-label={`${fi ? "Poista" : "Remove"} ${dishName(dish)}`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#D9C6A8] transition hover:bg-[#E06A55]/20 hover:text-[#F7C3B8] focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
          {deliverySettings?.isDeliveryFee && (
            <div className="flex items-baseline justify-between gap-4 pt-3 font-sans text-sm text-[#D9C6A8]/70">
              <span>{fi ? "Toimitusmaksu" : "Delivery fee"}</span>
              <span className="tabular-nums">
                {formatPrice(deliverySettings.deliveryFee, lang)}
              </span>
            </div>
          )}
          {/* Total */}
          <div className="flex items-end justify-between gap-4 border-t border-dashed border-[#F2A93B]/30 pt-4">
            <span className="font-serif text-xl font-bold text-brand-cream">
              {fi ? "Yhteensä" : "Total"}
            </span>
            <span className="font-serif text-3xl font-bold text-[#F2A93B]">
              {formatPrice(empty ? 0 : finalTotal, lang)}
            </span>
          </div>

          <p className="flex items-center gap-2.5 rounded-xl border border-[#F2A93B]/30 bg-[#F2A93B]/8 px-4 py-3 font-sans text-[15px] text-brand-cream">
            <Banknote
              className="h-5 w-5 shrink-0 text-[#F2A93B]"
              aria-hidden="true"
            />
            {fi
              ? "Maksu tapahtuu, kun ruoka toimitetaan."
              : "You pay when the food is delivered."}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-5 border-t border-dashed border-[#F2A93B]/30 pt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="dl-name" label={fi ? "Nimi *" : "Name *"}>
              <input
                id="dl-name"
                name="customerName"
                type="text"
                autoComplete="name"
                required
                value={form.customerName}
                onChange={onField}
                className={inputClass}
              />
            </Field>
            <Field id="dl-phone" label={fi ? "Puhelinnumero *" : "Phone *"}>
              <input
                id="dl-phone"
                name="customerPhone"
                type="tel"
                autoComplete="tel"
                required
                minLength={6}
                value={form.customerPhone}
                onChange={onField}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Fill the address from the device location */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#F2A93B]/50 px-5 py-2.5 font-sans text-[15px] font-semibold text-[#F2A93B] transition duration-300 hover:bg-[#F2A93B] hover:text-[#2A1206] active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LocateFixed className="h-4 w-4" aria-hidden="true" />
              )}
              {locating
                ? fi
                  ? "Haetaan sijaintia..."
                  : "Finding your location..."
                : fi
                  ? "Käytä sijaintiani"
                  : "Use my location"}
            </button>

            <p
              aria-live="polite"
              className={`font-sans text-[15px] leading-snug ${
                geo.status === "done"
                  ? "text-[#C6F0BD]"
                  : geo.status === "error"
                    ? "text-[#F7C3B8]"
                    : "hidden"
              }`}
            >
              {geoMessage}
            </p>

            <p className="font-sans text-xs text-[#D9C6A8]/70">
              {fi
                ? "Sijainti lähetetään vain, kun painat nappia. Osoite haetaan OpenStreetMap-palvelusta."
                : "Your location is only sent when you press the button. The address is looked up with OpenStreetMap."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_9rem]">
            <Field
              id="dl-address"
              label={fi ? "Toimitusosoite *" : "Delivery address *"}
            >
              <input
                id="dl-address"
                name="deliveryAddress"
                type="text"
                autoComplete="street-address"
                required
                value={form.deliveryAddress}
                onChange={onField}
                placeholder={
                  fi ? "Katu, numero, rappu" : "Street, number, stairwell"
                }
                className={inputClass}
              />
            </Field>
            <Field
              id="dl-postal"
              label={fi ? "Postinumero *" : "Postal code *"}
            >
              <input
                id="dl-postal"
                name="postalCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                pattern="\d{5}"
                maxLength={5}
                value={form.postalCode}
                onChange={onField}
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            id="dl-notes"
            label={fi ? "Lisätiedot tai allergiat" : "Notes or allergies"}
          >
            <textarea
              id="dl-notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={onField}
              placeholder={
                fi
                  ? "Esim. ovikoodi, tulisuus, allergiat..."
                  : "e.g., door code, spice level, allergies..."
              }
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        {/* Errors */}
        <div aria-live="polite">
          <AnimatePresence>
            {status.state === "error" && (
              <motion.div
                role="alert"
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-[#E06A55]/45 bg-[#E06A55]/10 p-4 font-sans text-[15px] text-[#F7C3B8]"
              >
                <AlertCircle
                  className="h-5 w-5 shrink-0 text-[#E06A55]"
                  aria-hidden="true"
                />
                <span>{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || empty}
          className="dl-btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-8 py-4 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
        >
          <span
            aria-hidden="true"
            className="dl-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
          />
          {loading && (
            <Loader2
              className="relative h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          )}
          <span className="relative">
            {loading
              ? fi
                ? "Lähetetään..."
                : "Sending..."
              : fi
                ? `Lähetä tilaus · ${formatPrice(finalTotal, lang)}`
                : `Place order · ${formatPrice(finalTotal, lang)}`}
          </span>
        </button>
      </form>
    </div>
  );
}
