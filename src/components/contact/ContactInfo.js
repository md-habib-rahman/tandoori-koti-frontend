"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Moon,
  Phone,
  Share2,
  Sun,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/tandoorikoti";
const FACEBOOK_URL = "https://www.facebook.com/tandoorikoti";

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconBadge({ Icon }) {
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F2A93B]/12 text-[#F2A93B] transition duration-300 group-hover:bg-[#F2A93B] group-hover:text-[#2A1206]">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

function InfoCard({ Icon, title, index, reduce, children }) {
  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0 : 0.8,
        delay: reduce ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-[#F2A93B]/20 bg-[#1C0D0A]/60 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#F2A93B]/50 hover:bg-[#3B1511]/40 hover:shadow-2xl hover:shadow-black/40"
    >
      {/* Soft saffron glow in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#F2A93B]/10 blur-3xl transition duration-500 group-hover:bg-[#F2A93B]/20"
      />
      {/* Hairline accent on the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(242,169,59,.5), transparent)",
        }}
      />

      <div className="relative flex items-center gap-4">
        <IconBadge Icon={Icon} />
        <h2 className="font-serif text-2xl leading-tight font-bold text-[#F2A93B]">
          {title}
        </h2>
      </div>

      <div className="relative border-t border-dashed border-[#F2A93B]/25 pt-5">
        {children}
      </div>
    </motion.div>
  );
}

const rowClass =
  "group/link flex items-center gap-3 rounded-2xl border border-[#F2A93B]/25 bg-[#1C0D0A]/60 px-4 py-3 font-sans text-base text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]";

export default function ContactInfo({ t }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";

  // Opens Google Maps with the address from the page content
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    String(t.address || "").replace(/\s*\n\s*/g, ", "),
  )}`;

  const socials = [
    { name: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
    { name: "Facebook", href: FACEBOOK_URL, Icon: FacebookIcon },
  ];

  return (
    <section
      className="relative w-full overflow-hidden border-b border-[#F2A93B]/15 py-16 md:py-24"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 90% 10%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 45% at 5% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
      }}
    >
      {/* Dot pattern, same as the other sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          {/* Address */}
          <InfoCard Icon={MapPin} title={t.addressTitle} index={0} reduce={reduce}>
            <div className="space-y-5">
              <p className="font-sans text-base leading-relaxed whitespace-pre-line text-brand-cream">
                {t.address}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full border-2 border-brand-cream/45 px-5 py-2.5 font-sans text-[15px] font-semibold text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
              >
                {fi ? "Näytä kartalla" : "Get directions"}
                <ArrowUpRight
                  className="h-4 w-4 transition duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </InfoCard>

          {/* Phone and email */}
          <InfoCard
            Icon={Phone}
            title={fi ? "Puhelin ja sähköposti" : "Call or email"}
            index={1}
            reduce={reduce}
          >
            <ul className="space-y-3">
              <li>
                <a href={`tel:${String(t.phone).replace(/\s+/g, "")}`} className={rowClass}>
                  <Phone className="h-4 w-4 shrink-0 text-[#F2A93B]" aria-hidden="true" />
                  <span>{t.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${t.email}`} className={rowClass}>
                  <Mail className="h-4 w-4 shrink-0 text-[#F2A93B]" aria-hidden="true" />
                  <span className="min-w-0 break-all">{t.email}</span>
                </a>
              </li>
            </ul>
          </InfoCard>

          {/* Social */}
          <InfoCard Icon={Share2} title={t.followTitle} index={2} reduce={reduce}>
            <ul className="space-y-3">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between gap-3 rounded-full border border-[#F2A93B]/25 bg-[#1C0D0A]/60 px-5 py-3 font-sans text-base text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:bg-[#F2A93B] hover:text-[#2A1206] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-[18px] w-[18px] text-[#F2A93B] transition-colors duration-300 group-hover/link:text-[#2A1206]" />
                      {name}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-[#F2A93B] transition duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[#2A1206]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Opening hours */}
          <InfoCard Icon={Clock} title={t.hoursTitle} index={3} reduce={reduce}>
            <div className="space-y-5 font-sans text-base">
              <div className="flex gap-3">
                <Sun className="mt-1 h-5 w-5 shrink-0 text-[#F2A93B]" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F2A93B]">{t.lunchTitle}</h3>
                  <p className="mt-1 leading-relaxed text-brand-cream">{t.lunchHours}</p>
                </div>
              </div>

              <div className="border-t border-dashed border-[#F2A93B]/25" aria-hidden="true" />

              <div className="flex gap-3">
                <Moon className="mt-1 h-5 w-5 shrink-0 text-[#F2A93B]" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F2A93B]">{t.dinnerTitle}</h3>
                  <p className="mt-1 leading-relaxed whitespace-pre-line text-brand-cream">
                    {t.dinnerHours}
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}