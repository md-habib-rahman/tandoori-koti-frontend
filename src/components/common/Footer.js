"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import FooterFollowBtn from "../footer/FooterFollowBtn";
import FooterNav from "../footer/FooterNav";
import FooterSubTitle from "../footer/FooterSubTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0c1214] text-brand-cream border-t border-brand-gold/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-brand-gold/10">
          {/* Column 1: Brand & Identity (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/tandoori_koti_logo.png"
                alt="Tandoori Koti Logo"
                width={170}
                height={170}
                className="brightness-95 group-hover:brightness-105 transition-all"
              />
            </Link>
            <FooterSubTitle />
          </div>

          {/* Column 2: Navigation Links (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <FooterNav />
          </div>

          {/* Column 3: Contact Details with Icons (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-brand-gold font-semibold">
              {lang === "fi" ? "Yhteystiedot" : "Contact "}
            </h3>
            <ul className="space-y-3.5 text-xs text-brand-muted font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Välikatu 18, 87100 Kajaani, Finland</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href="tel:+358 44 902 2407"
                  className="hover:text-brand-gold transition-colors"
                >
                  +358 44 902 2407
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href="mailto:info@tandoorikoti.fi"
                  className="hover:text-brand-gold transition-colors"
                >
                  tandoorikoti@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <FooterFollowBtn />
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-brand-gold font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              {lang === "fi" ? "Aukioloajat" : "Opening Hours"}
            </h3>
            <div className="space-y-2 text-xs font-sans text-brand-muted">
              <div>
                <p className="text-brand-cream font-medium">
                  {lang === "fi" ? "Ma – Pe" : "Mon – Fri"}
                </p>
                <p className="text-[11px]">10:00 – 20:00</p>
                {/* <p className="text-[10px] text-brand-gold/80">
                  {lang === "fi"
                    ? "Buffet: 10:30 – 14:30"
                    : "Buffet: 10:30 AM – 2:30 PM"}
                </p> */}
              </div>
              <div className="pt-1">
                <p className="text-brand-cream font-medium">
                  {lang === "fi" ? "La" : "Sat"}
                </p>
                <p className="text-[11px]">11:00 – 22:00</p>
              </div>
              <div className="pt-1">
                <p className="text-brand-cream font-medium">
                  {lang === "fi" ? "Su" : "Sun"}
                </p>
                <p className="text-[11px]">12:00 – 20:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-brand-muted/70">
          <p suppressHydrationWarning>
            © {currentYear} Tandoori Koti. Kaikki oikeudet pidätetään.
          </p>
          <p className="text-[11px] tracking-wider uppercase text-brand-gold/50">
            Kajaani, Finland
          </p>
        </div>
      </div>
    </footer>
  );
}
