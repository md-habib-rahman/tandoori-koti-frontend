"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const inputClass =
  "w-full rounded-xl border border-[#F2A93B]/25 bg-[#1C0D0A]/70 px-4 py-3 font-sans text-base text-brand-cream placeholder:text-[#D9C6A8]/45 transition-colors duration-300 hover:border-[#F2A93B]/45 focus:border-[#F2A93B] focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/30";

function Field({ id, label, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-sans text-sm font-medium text-[#D9C6A8]">
        {label}
      </label>
      {children}
    </div>
  );
}

// Presentational contact form. The parent page keeps the state and the submit logic:
//   <ContactForm t={t} formData={formData} handleChange={handleChange}
//                handleSubmit={handleSubmit} status={status} />
// `t` needs: formHeading, formDesc, nameLabel, emailLabel, phoneLabel, messageLabel, submitBtn, submitting
// status.state is "idle" | "loading" | "success" | "error", with status.message for the last two.
export default function ContactForm({ t, formData, handleChange, handleSubmit, status }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const loading = status.state === "loading";

  const fadeUp = (delay = 0) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 10% 10%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 45% at 95% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #170A08, #1C0D0A)",
      }}
    >
      <style>{`
        @keyframes cfShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .cf-btn:not(:disabled):hover .cf-shine { animation: cfShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .cf-btn:hover .cf-shine { animation: none !important; } }
      `}</style>

      {/* Dot pattern, same as the other sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left: heading and a link to booking */}
        <motion.div {...fadeUp()} className="space-y-7 lg:col-span-5 lg:pt-4">
          <div className="space-y-5">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl">
              {t.formHeading}
            </h2>
            <p className="max-w-md font-sans text-lg leading-relaxed text-[#D9C6A8]">
              {t.formDesc}
            </p>
          </div>

          {/* Small diamond divider */}
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-[#F2A93B]/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#F2A93B]" />
            <span className="h-px w-12 bg-[#F2A93B]/40" />
          </div>

          {/* Booking shortcut: the reservation form is on the same page */}
          <a
            href="#reserve"
            className="group flex max-w-md items-center gap-4 rounded-3xl border border-[#F2A93B]/25 bg-[#1C0D0A]/60 p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B]/55 hover:bg-[#3B1511]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F2A93B]/12 text-[#F2A93B] transition duration-300 group-hover:bg-[#F2A93B] group-hover:text-[#2A1206]">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-lg font-bold text-brand-cream">
                {fi ? "Haluatko varata pöydän?" : "Want to book a table?"}
              </span>
              <span className="block font-sans text-[15px] text-[#D9C6A8]">
                {fi ? "Varaus onnistuu verkossa" : "Reserve online in a minute"}
              </span>
            </span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-[#F2A93B] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* Right: form */}
        <motion.div {...fadeUp(0.15)} className="relative lg:col-span-7">
          {/* Dashed outline, echoing the other sections */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 hidden rounded-[2rem] border-2 border-dashed border-[#F2A93B]/30 md:block"
          />

          <form
            onSubmit={handleSubmit}
            className="relative space-y-6 rounded-3xl border-[5px] border-white/20 bg-[#1C0D0A]/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label={`${t.nameLabel} *`}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field id="phone" label={`${t.phoneLabel} *`}>
                <input
                  id="phone"
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

            <Field id="email" label={`${t.emailLabel} *`}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            <Field id="message" label={t.messageLabel}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </Field>

            {/* reCAPTCHA v3: no visible widget. The token is created in the parent's submit handler. */}

            {/* Status messages */}
            <div aria-live="polite">
              <AnimatePresence>
                {status.state === "success" && (
                  <motion.div
                    role="status"
                    initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-[#7BD36B]/40 bg-[#7BD36B]/10 p-4 font-sans text-[15px] text-[#C6F0BD]"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#7BD36B]" aria-hidden="true" />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {status.state === "error" && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-[#E06A55]/45 bg-[#E06A55]/10 p-4 font-sans text-[15px] text-[#F7C3B8]"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-[#E06A55]" aria-hidden="true" />
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="cf-btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F2A93B] px-10 py-4 font-sans text-base font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              <span
                aria-hidden="true"
                className="cf-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
              />
              {loading && <Loader2 className="relative h-5 w-5 animate-spin" aria-hidden="true" />}
              <span className="relative">{loading ? t.submitting : t.submitBtn}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}