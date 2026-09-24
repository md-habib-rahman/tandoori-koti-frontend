"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function FooterOld() {
  const { lang } = useLanguage();

  const navLinks = [
    {
      label: lang === "fi" ? "RUOKALISTAT" : "OUR MENUS",
      href: "/menu",
    },
    {
      label: lang === "fi" ? "PÖYTÄVARAUS" : "RESERVATION",
      href: "/contact#reserve",
    },
    {
      label: lang === "fi" ? "TARINAMME" : "ABOUT",
      href: "/about",
    },
    {
      label: lang === "fi" ? "OTA YHTEYTTÄ" : "CONTACT US",
      href: "/contact",
    },
  ];

  return (
    <footer className="w-full bg-[#0c1214] text-brand-cream border-t border-brand-gold/15 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 md:gap-0">
          {/* 1. LEFT COLUMN: Brand Identity */}
          <div className="flex flex-col items-center md:items-center justify-center space-y-1">
            <Link href="/" className="inline-block text-center group">
              {/* <span className="font-serif text-5xl md:text-6xl tracking-wide font-normal text-brand-gold group-hover:text-brand-goldLight transition-colors">
                Tandoori Koti
              </span>
              <span className="block font-sans text-[10px] md:text-[11px] tracking-[0.35em] text-brand-gold/80 uppercase mt-1">
                Restaurant
              </span> */}
              <Image
                src="/tandoori_koti_logo.png"
                alt="Tandoori Koti Logo"
                width={200}
                height={200}
              />
            </Link>
          </div>

          {/* 2. CENTER COLUMN: Vertical-Separated Navigation Links */}
          <div className="flex flex-col items-center justify-center space-y-5 md:border-x md:border-brand-gold/30 px-6 py-4">
            <nav className="flex flex-col items-center space-y-4">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] text-brand-cream/90 hover:text-brand-gold uppercase transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. RIGHT COLUMN: Social Media Icons & Copyright */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Social Icons Row */}
            <div className="flex items-center gap-6">
              <Link
                href="https://www.facebook.com/tandoorikoti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darker transition-all duration-300 text-xs uppercase tracking-[0.18em] font-semibold rounded-none group"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{lang === "fi" ? "Seuraa meitä" : "Follow Us"}</span>
              </Link>
            </div>

            {/* Copyright */}
            <p className="font-sans text-[11px] text-brand-muted tracking-wide text-center">
              © Copyright {new Date().getFullYear()} Tandoori Koti. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
