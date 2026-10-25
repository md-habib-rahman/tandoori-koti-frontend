"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import FooterFollowBtn from "../footer/FooterFollowBtn";
import FooterNav from "../footer/FooterNav";
import FooterSubTitle from "../footer/FooterSubTitle";
import { useLanguage } from "@/context/LanguageContext";

const ADDRESS = "Välikatu 18, 87100 Kajaani";
const PHONE = "+358 44 902 2407";
const EMAIL = "tandoorikoti@gmail.com";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Välikatu 18, 87100 Kajaani, Finland");

// days use JS numbering: 0 = Sunday ... 6 = Saturday
const HOURS = [
  { days: [1, 2, 3, 4, 5], fi: "Ma–Pe", en: "Mon–Fri", time: "10:00–20:00" },
  { days: [6], fi: "La", en: "Sat", time: "11:00–22:00" },
  { days: [0], fi: "Su", en: "Sun", time: "12:00–20:00" },
];

export default function Footer() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const currentYear = new Date().getFullYear();
  const [today, setToday] = useState(null);

  // Highlight today's opening hours (Helsinki time, client only)
  useEffect(() => {
    const wd = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Helsinki",
      weekday: "short",
    }).format(new Date());
    setToday(
      { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd] ?? null,
    );
  }, []);

  const container = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headingClass = "mb-5 font-serif text-xl font-bold text-[#F2A93B]";

  return (
    <footer
      className="relative w-full overflow-hidden border-t border-[#F2A93B]/20 text-brand-cream"
      style={{
        backgroundImage:
          "radial-gradient(50% 60% at 10% 0%, rgba(200,50,30,.2), transparent 70%), radial-gradient(40% 50% at 95% 100%, rgba(242,169,59,.1), transparent 70%), linear-gradient(180deg, #170A08, #120806)",
      }}
    >
      {/* Hides Google's floating reCAPTCHA badge; the required notice is shown at the bottom of this footer */}
      <style>{`.grecaptcha-badge { visibility: hidden; }`}</style>

      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-12 border-b border-dashed border-[#F2A93B]/25 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={item} className="space-y-6 lg:col-span-4">
            <Link
              href="/"
              className="group inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              <Image
                src="/tandoori_koti_logo.png"
                alt="Tandoori Koti"
                width={170}
                height={170}
                className="h-auto w-36 transition duration-300 group-hover:scale-105 sm:w-40"
              />
            </Link>
            <FooterSubTitle />
            <FooterFollowBtn />
          </motion.div>

          {/* Navigation */}
          <motion.div variants={item} className="lg:col-span-2">
            <FooterNav />
          </motion.div>

          {/* Contact */}
          <motion.div variants={item} className="lg:col-span-3">
            <h3 className={headingClass}>{fi ? "Yhteystiedot" : "Contact"}</h3>
            <ul className="space-y-4 font-sans text-[15px] leading-relaxed">
              {[
                {
                  icon: MapPin,
                  node: (
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-cream transition-colors hover:text-[#F2A93B]"
                    >
                      {ADDRESS}
                      <span className="block text-sm text-[#D9C6A8]">
                        {fi ? "Näytä kartalla" : "View on map"}
                      </span>
                    </a>
                  ),
                },
                {
                  icon: Phone,
                  node: (
                    <a
                      href={`tel:${PHONE.replace(/\s/g, "")}`}
                      className="text-brand-cream transition-colors hover:text-[#F2A93B]"
                    >
                      {PHONE}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  node: (
                    <a
                      href={`mailto:${EMAIL}`}
                      className="break-all text-brand-cream transition-colors hover:text-[#F2A93B]"
                    >
                      {EMAIL}
                    </a>
                  ),
                },
              ].map(({ icon: Icon, node }, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F2A93B]/12 text-[#F2A93B]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="pt-1.5">{node}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opening hours */}
          <motion.div variants={item} className="lg:col-span-3">
            <h3 className={`${headingClass} flex items-center gap-2`}>
              <Clock className="h-5 w-5" aria-hidden="true" />
              {fi ? "Aukioloajat" : "Opening hours"}
            </h3>
            <ul className="space-y-2 font-sans text-[15px]">
              {HOURS.map((row) => {
                const isToday = today !== null && row.days.includes(today);
                return (
                  <li
                    key={row.en}
                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors ${
                      isToday
                        ? "border-[#F2A93B]/50 bg-[#3B1511]/70"
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className={`font-medium ${isToday ? "text-[#F2A93B]" : "text-brand-cream"}`}
                    >
                      {fi ? row.fi : row.en}
                    </span>
                    <span
                      aria-hidden="true"
                      className="min-w-3 flex-1 border-b border-dotted border-[#F2A93B]/35"
                    />
                    <span className="text-[#D9C6A8]">{row.time}</span>
                    {isToday && (
                      <span className="sr-only">
                        {fi ? "(tänään)" : "(today)"}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 font-sans text-sm text-[#D9C6A8] sm:flex-row">
          <p suppressHydrationWarning className="text-center sm:text-left">
            © {currentYear} Tandoori Koti.{" "}
            {fi ? "Kaikki oikeudet pidätetään." : "All rights reserved."}
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full border border-[#F2A93B]/35 px-4 py-2 font-medium text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            {fi ? "Takaisin ylös" : "Back to top"}
            <ArrowUp
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* reCAPTCHA notice (required because the badge is hidden above) */}
        <p className="mt-6 text-center font-sans text-xs leading-relaxed text-[#D9C6A8]/60 sm:text-left">
          {fi ? (
            <>
              Tätä sivustoa suojaa reCAPTCHA, ja siihen sovelletaan Googlen{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#F2A93B]"
              >
                tietosuojakäytäntöä
              </a>{" "}
              ja{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#F2A93B]"
              >
                käyttöehtoja
              </a>
              .
            </>
          ) : (
            <>
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#F2A93B]"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#F2A93B]"
              >
                Terms of Service
              </a>{" "}
              apply.
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
