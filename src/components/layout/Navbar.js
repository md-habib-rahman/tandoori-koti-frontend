"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "+358 44 902 2407";
const FACEBOOK_URL = "https://www.facebook.com/tandoorikoti";

function FacebookIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, switchLanguage, t } = useLanguage();

  // Scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const navLinks = [
    { name: t?.nav?.home || "Koti", href: "/" },
    { name: t?.nav?.about || "Tarinamme", href: "/about" },
    { name: t?.nav?.menu || "Menu", href: "/menu" },
    { name: t?.nav?.buffet || "Buffet", href: "/buffet" },
    { name: t?.nav?.contact || "Yhteystiedot", href: "/contact" },
    { name: t?.nav?.delivery || "Toimitus", href: "/contact#delivery" },
  ];

  const reserveLabel = lang === "fi" ? "Varaa pöytä" : "Book a table";
  const reserveShort = lang === "fi" ? "Varaa" : "Book";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`nav-drop fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#F2A93B]/25 bg-[#1C0D0A]/90 shadow-xl shadow-black/40 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Animation definitions (self-contained) */}
      <style>{`
        @keyframes navDrop { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: none; } }
        @keyframes navShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .nav-drop { animation: navDrop .8s cubic-bezier(.22,1,.36,1) both; }
        .nav-btn:hover .nav-shine { animation: navShine .9s ease; }
        @media (prefers-reduced-motion: reduce) {
          .nav-drop, .nav-btn:hover .nav-shine { animation: none !important; }
        }
      `}</style>

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          isScrolled ? "h-16" : "h-20 md:h-24"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
        >
          <Image
            src="/tandoori_koti_logo.png"
            alt="Tandoori Koti"
            width={160}
            height={56}
            priority
            className={`w-auto transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? "h-10" : "h-12 md:h-14"
            }`}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 font-sans text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[#F2A93B] after:transition-transform after:duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B] ${
                  active
                    ? "text-[#F2A93B] after:scale-x-100"
                    : "text-brand-cream/85 after:scale-x-0 hover:text-[#F2A93B] hover:after:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-[#F2A93B]/30 bg-[#1C0D0A]/60 p-1 font-sans text-xs backdrop-blur-sm">
            <Globe
              className="ml-1.5 h-3.5 w-3.5 text-[#F2A93B]"
              aria-hidden="true"
            />
            {["fi", "en"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLanguage(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-2.5 py-1 font-semibold transition-colors duration-300 ${
                  lang === code
                    ? "bg-[#F2A93B] text-[#2A1206]"
                    : "text-brand-muted hover:text-brand-cream"
                }`}
              >
                {code === "fi" ? "FIN" : "EN"}
              </button>
            ))}
          </div>

          {/* Facebook (icon only) */}
          <Link
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              lang === "fi"
                ? "Seuraa meitä Facebookissa"
                : "Follow us on Facebook"
            }
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-cream/35 text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <FacebookIcon className="h-4 w-4" />
          </Link>

          {/* Main call to action */}
          <Link
            href="/contact#reserve"
            className="nav-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F2A93B] px-6 py-2.5 font-sans text-[15px] font-semibold text-[#2A1206] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBD57] hover:shadow-lg hover:shadow-[#F2A93B]/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
          >
            <span
              aria-hidden="true"
              className="nav-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] bg-white/40"
            />
            <span className="relative">{reserveLabel}</span>
          </Link>
        </div>

        {/* Mobile: compact CTA + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/contact#reserve"
            className="rounded-full bg-[#F2A93B] px-4 py-2 font-sans text-sm font-semibold text-[#2A1206] transition active:scale-95"
          >
            {reserveShort}
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-10 w-10 place-items-center rounded-full text-brand-cream transition-colors hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
            aria-label="Toggle Navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer: slides open and closed */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-500 ease-out md:hidden motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`space-y-5 border-t border-[#F2A93B]/20 bg-[#1C0D0A]/98 px-6 py-6 shadow-2xl backdrop-blur-lg transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-3 py-3 font-sans text-lg font-medium transition-colors ${
                      active
                        ? "bg-[#F2A93B]/10 text-[#F2A93B]"
                        : "text-brand-cream/85 hover:bg-white/5 hover:text-[#F2A93B]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              tabIndex={isOpen ? 0 : -1}
              className="flex items-center gap-3 rounded-xl border border-[#F2A93B]/30 px-4 py-3 font-sans text-brand-cream"
            >
              <Phone className="h-5 w-5 text-[#F2A93B]" aria-hidden="true" />
              <span>{PHONE}</span>
            </a>

            <div className="flex items-center justify-between border-t border-[#F2A93B]/15 pt-4">
              <div className="flex items-center gap-1 rounded-full border border-[#F2A93B]/30 p-1 text-xs">
                {["fi", "en"].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLanguage(code)}
                    tabIndex={isOpen ? 0 : -1}
                    aria-pressed={lang === code}
                    className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
                      lang === code
                        ? "bg-[#F2A93B] text-[#2A1206]"
                        : "text-brand-muted"
                    }`}
                  >
                    {code === "fi" ? "FIN" : "EN"}
                  </button>
                ))}
              </div>

              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOpen ? 0 : -1}
                aria-label={
                  lang === "fi"
                    ? "Seuraa meitä Facebookissa"
                    : "Follow us on Facebook"
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-cream/35 text-brand-cream transition-colors hover:border-[#F2A93B] hover:text-[#F2A93B]"
              >
                <FacebookIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
