"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, switchLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Check window scroll, with documentElement fallback
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t?.nav?.home || "Koti", href: "/" },
    { name: t?.nav?.about || "Tarinamme", href: "/about" },
    { name: t?.nav?.menu || "Menu", href: "/menu" },
    { name: t?.nav?.buffet || "Buffet", href: "/buffet" },
    { name: t?.nav?.contact || "Yhteystiedot", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "bg-brand-darker/95 backdrop-blur-md border-b border-brand-gold/20 shadow-xl shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group">
          {/* <span className="font-serif text-2xl tracking-[0.18em] font-semibold text-brand-cream group-hover:text-brand-gold transition-colors">
            TANDOORI KOTI
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-brand-gold font-sans -mt-1">
            Ravintola & Buffet
          </span> */}
          <Image
            src="/tandoori_koti_logo.png"
            alt="Tandoori Koti"
            width={120}
            height={40}
            className=" w-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                isActive(link.href)
                  ? "text-brand-gold border-b border-brand-gold pb-1"
                  : "text-brand-cream/80 hover:text-brand-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-brand-darker/60 backdrop-blur-sm border border-brand-gold/30 rounded-full px-2.5 py-1 text-[11px] font-sans">
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <button
              onClick={() => switchLanguage("fi")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "fi"
                  ? "text-brand-gold font-bold"
                  : "text-brand-muted hover:text-brand-cream"
              }`}
            >
              FIN
            </button>
            <span className="text-brand-gold/30">|</span>
            <button
              onClick={() => switchLanguage("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "en"
                  ? "text-brand-gold font-bold"
                  : "text-brand-muted hover:text-brand-cream"
              }`}
            >
              EN
            </button>
          </div>

          {/* Reserve CTA */}
          {/* <Link
            href="/contact#reserve"
            className="px-5 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darker transition-all duration-300 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            {t?.nav?.reserve || "Pöytävaraus"}
          </Link> */}
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

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-cream hover:text-brand-gold p-1"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer (Always dark background for readability) */}
      {isOpen && (
        <div className="md:hidden bg-brand-darker/98 backdrop-blur-lg border-b border-brand-gold/20 px-6 py-6 space-y-5 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xs uppercase tracking-[0.2em] font-medium ${
                  isActive(link.href) ? "text-brand-gold" : "text-brand-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => switchLanguage("fi")}
                className={`px-2 py-1 rounded ${
                  lang === "fi"
                    ? "bg-brand-gold text-brand-darker font-bold"
                    : "text-brand-muted"
                }`}
              >
                FIN
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className={`px-2 py-1 rounded ${
                  lang === "en"
                    ? "bg-brand-gold text-brand-darker font-bold"
                    : "text-brand-muted"
                }`}
              >
                EN
              </button>
            </div>

            {/* <Link
              href="/contact#reserve"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-brand-gold text-brand-gold text-xs uppercase tracking-widest"
            >
              {t?.nav?.reserve || "Pöytävaraus"}
            </Link> */}
            <Link
              href="https://www.facebook.com/tandoorikoti"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-brand-gold text-brand-gold text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-brand-darker transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{lang === "fi" ? "Seuraa meitä" : "Follow Us"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
