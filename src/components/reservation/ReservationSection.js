"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Minus,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const PHONE = "+358 44 902 2407";

const inputClass =
  "w-full rounded-xl border border-[#F2A93B]/25 bg-[#1C0D0A]/70 px-4 py-3 font-sans text-base text-brand-cream placeholder:text-[#D9C6A8]/45 transition-colors duration-300 hover:border-[#F2A93B]/45 focus:border-[#F2A93B] focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/30 scheme-dark";

function Field({ id, label, icon: Icon, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-sans text-sm font-medium text-[#D9C6A8]"
      >
        {Icon && <Icon className="h-4 w-4 text-[#F2A93B]" aria-hidden="true" />}
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}

export default function ReservationSection() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  // Today's date in Finland as YYYY-MM-DD, for the date picker minimum
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Helsinki",
  }).format(new Date());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "17:00",
    specialRequests: "",
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guest increment / decrement handlers
  const handleGuestChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(20, Math.max(1, prev.guests + delta)),
    }));
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setStatus({
        state: "error",
        message: fi
          ? "Turvatarkistus latautuu vielä. Yritä hetken kuluttua uudelleen."
          : "Security verification is still loading. Please try again.",
      });
      return;
    }
    setStatus({ state: "loading", message: "" });

    try {
      const recaptchaToken = await executeRecaptcha("send_message");

      if (!recaptchaToken) {
        throw new Error("Unable to generate reCAPTCHA token.");
      }
      const reservationDate = new Date(`${formData.date}T${formData.time}:00`);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

      const res = await axios.post(`${baseUrl}/reservations`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        reservationDate: reservationDate.toISOString(),
        specialRequests: formData.specialRequests,
        recaptchaToken,
      });

      if (res.data?.success) {
        setStatus({
          state: "success",
          message: fi
            ? "Pöytävarauspyyntö vastaanotettu! Vahvistamme varauksesi pian."
            : "Reservation requested! We will confirm your table shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: 2,
          date: "",
          time: "17:00",
          specialRequests: "",
        });
      }
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err.response?.data?.message ||
          (fi
            ? "Varauksen tekeminen epäonnistui. Yritä uudelleen."
            : "Failed to submit booking. Please try again."),
      });
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.8,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const info = [
    {
      icon: Phone,
      title: fi ? "Soita meille" : "Call us",
      body: (
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className="transition-colors hover:text-[#F2A93B]"
        >
          {PHONE}
        </a>
      ),
    },
    {
      icon: Clock,
      title: fi ? "Aukioloajat" : "Opening hours",
      body: (
        <>
          {fi ? "Ma–Pe 10–20" : "Mon–Fri 10–20"}
          <br />
          {fi ? "La 11–22, Su 11–20" : "Sat 11–22, Sun 11–20"}
        </>
      ),
    },
    {
      icon: Mail,
      title: fi ? "Vahvistus" : "Confirmation",
      body: fi
        ? "Vahvistamme varauksen sähköpostitse."
        : "We confirm your booking by email.",
    },
  ];

  return (
    <section
      id="reserve"
      className="relative overflow-hidden py-20 text-brand-cream md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 90% 15%, rgba(200,50,30,.25), transparent 70%), radial-gradient(45% 45% at 5% 90%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
      }}
    >
      <style>{`
        @keyframes rsShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .rs-btn:not(:disabled):hover .rs-shine { animation: rsShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .rs-btn:hover .rs-shine { animation: none !important; } }
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

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 lg:px-8">
        {/* Left: intro and practical info */}
        <motion.div {...fadeUp()} className="space-y-8 lg:pt-6">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl">
              {fi ? "Varaa pöytä ravintolasta" : "Book your table"}
            </h2>
            <p className="max-w-md font-sans text-lg leading-relaxed text-[#D9C6A8]">
              {fi
                ? "Nauti intialaisen keittiön parhaista mauista Kajaanissa. Kerro meille vain päivämäärä, kellonaika ja henkilömäärä, niin me hoidamme loput."
                : "Enjoy the best Indian flavours in Kajaani. Tell us the day, time and party size, and we will take care of the rest."}
            </p>
          </div>

          <ul className="space-y-5">
            {info.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2A93B]/12 text-[#F2A93B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F2A93B]">
                    {title}
                  </h3>
                  <p className="font-sans text-[15px] leading-relaxed text-brand-cream">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: form */}
        <motion.div {...fadeUp(0.15)} className="relative">
          {/* Dashed outline, echoing the other sections */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 md:block"
          />

          <form
            onSubmit={handleSubmit}
            className="relative space-y-6 rounded-3xl border-[5px] border-white/20 bg-[#1C0D0A]/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8"
          >
            {/* Contact */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="rs-name" label={fi ? "Nimi *" : "Name *"}>
                <input
                  id="rs-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field id="rs-phone" label={fi ? "Puhelinnumero *" : "Phone *"}>
                <input
                  id="rs-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field id="rs-email" label={fi ? "Sähköposti *" : "Email *"}>
              <input
                id="rs-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            {/* Guests, date, time */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field
                id="rs-guests"
                label={fi ? "Henkilömäärä *" : "Guests *"}
                icon={Users}
              >
                <div className="flex items-center justify-between rounded-xl border border-[#F2A93B]/25 bg-[#1C0D0A]/70 p-1.5">
                  <button
                    type="button"
                    onClick={() => handleGuestChange(-1)}
                    disabled={formData.guests <= 1}
                    className="grid h-9 w-9 place-items-center rounded-full text-[#F2A93B] transition hover:bg-[#F2A93B]/15 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
                    aria-label={fi ? "Vähennä henkilöitä" : "Decrease guests"}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    id="rs-guests"
                    aria-live="polite"
                    className="font-serif text-lg font-bold text-brand-cream"
                  >
                    {formData.guests}{" "}
                    <span className="font-sans text-sm font-normal text-[#D9C6A8]">
                      {fi ? "hlö" : "guests"}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGuestChange(1)}
                    disabled={formData.guests >= 20}
                    className="grid h-9 w-9 place-items-center rounded-full text-[#F2A93B] transition hover:bg-[#F2A93B]/15 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
                    aria-label={fi ? "Lisää henkilöitä" : "Increase guests"}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </Field>

              <Field
                id="rs-date"
                label={fi ? "Päivämäärä *" : "Date *"}
                icon={CalendarIcon}
              >
                <input
                  id="rs-date"
                  name="date"
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field
                id="rs-time"
                label={fi ? "Kellonaika *" : "Time *"}
                icon={Clock}
              >
                <input
                  id="rs-time"
                  name="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              id="rs-requests"
              label={
                fi
                  ? "Erityistoiveet tai allergiat"
                  : "Special requests or dietary notes"
              }
            >
              <textarea
                id="rs-requests"
                name="specialRequests"
                rows={3}
                placeholder={
                  fi
                    ? "Esim. lastentuoli, ikkunapöytä, allergiat..."
                    : "e.g., high chair, window seat, allergies..."
                }
                value={formData.specialRequests}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </Field>

            {/* Feedback */}
            <div aria-live="polite">
              <AnimatePresence>
                {status.state === "success" && (
                  <motion.div
                    role="status"
                    initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-[#7BD36B]/40 bg-[#7BD36B]/10 p-4 font-sans text-[15px] text-[#C6F0BD]"
                  >
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-[#7BD36B]"
                      aria-hidden="true"
                    />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {status.state === "error" && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
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
              disabled={status.state === "loading"}
              className="rs-btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-8 py-4 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              <span
                aria-hidden="true"
                className="rs-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
              />
              {status.state === "loading" && (
                <Loader2
                  className="relative h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
              )}
              <span className="relative">
                {status.state === "loading"
                  ? fi
                    ? "Lähetetään..."
                    : "Submitting..."
                  : fi
                    ? "Vahvista pöytävaraus"
                    : "Request table reservation"}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
