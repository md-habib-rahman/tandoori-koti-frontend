"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterNav() {
  const { lang } = useLanguage();

  const navLinks = [
    {
      label: lang === "fi" ? "Ruokalistat" : "Our Menus",
      href: "/menu",
    },
    {
      label: lang === "fi" ? "Lounasbuffet" : "Lunch Buffet",
      href: "/buffet",
    },
    {
      label: lang === "fi" ? "Pöytävaraus" : "Reservation",
      href: "/contact#reserve",
    },

    {
      label: lang === "fi" ? "Ota Yhteyttä" : "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <>
      <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-brand-gold font-semibold">
        <span>{lang === "fi" ? "Navigointi" : "Navigation"}</span>
      </h3>
      <ul className="space-y-3">
        {navLinks.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] text-brand-muted hover:text-brand-gold transition-colors font-medium inline-block"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
