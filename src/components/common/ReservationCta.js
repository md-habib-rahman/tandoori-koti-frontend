"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ReservationCta() {
  const { lang } = useLanguage();

  return (
    <section className="relative w-full py-28 bg-[#070A0C] border-y border-brand-gold/15 overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark" />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
          {lang === "fi" ? "Tervetuloa Vieraaksemme" : "Plan Your Visit"}
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-brand-cream font-bold">
          {lang === "fi"
            ? "Tee Pöytävaraus Verkossa"
            : "Make an online Reservation"}
        </h2>

        <p className="text-sm md:text-base text-brand-muted max-w-xl mx-auto font-sans leading-relaxed">
          {lang === "fi"
            ? "Varmista paikkasi unohtumattomalle illalliselle tai nauti päivittäisestä runsaasta buffetista."
            : "Reserve your table for an unforgettable dinner or stop by to enjoy our daily lunch buffet."}
        </p>

        <div className="pt-2">
          <Link
            href="/contact#reserve"
            className="inline-block px-8 py-3.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark text-xs uppercase tracking-widest font-semibold transition-all duration-300"
          >
            {lang === "fi" ? "Varaa Pöytä" : "Reservation"}
          </Link>
        </div>
      </div>
    </section>
  );
}
