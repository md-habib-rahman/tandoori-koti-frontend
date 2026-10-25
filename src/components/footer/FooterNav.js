"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterNav() {
  const { lang } = useLanguage();
  const fi = lang === "fi";

  const navLinks = [
    { label: fi ? "Tarinamme" : "Our story", href: "/about" },
    { label: fi ? "Ruokalistat" : "Our menu", href: "/menu" },
    { label: fi ? "Lounasbuffet" : "Lunch buffet", href: "/buffet" },
    { label: fi ? "Pöytävaraus" : "Reservation", href: "/contact#reserve" },
    { label: fi ? "Ota yhteyttä" : "Contact us", href: "/contact" },
  ];

  return (
    <>
      <h3 className="mb-5 font-serif text-xl font-bold text-[#F2A93B]">
        {fi ? "Navigointi" : "Navigation"}
      </h3>
      <ul className="space-y-3">
        {navLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1.5 font-sans text-base text-brand-cream transition-colors duration-300 hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
            >
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#F2A93B] after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                {item.label}
              </span>
              <ArrowUpRight
                className="h-4 w-4 -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
