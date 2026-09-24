"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Minus,
  Plus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ReservationSection() {
  const { lang } = useLanguage();

  // Get current date string formatted as YYYY-MM-DD for date picker constraint
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "17:00",
    specialRequests: "",
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guest increment / decrement handlers
  const handleGuestChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(20, Math.max(1, prev.guests + delta)),
    }));
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setStatus({
        state: "error",
        message: "Security verification is still loading. Please try again.",
      });
      return;
    }
    setStatus({ state: "loading", message: "" });

    try {
      const recaptchaToken = await executeRecaptcha("send_message");

      if (!recaptchaToken) {
        throw new Error("Unable to generate reCAPTCHA token.");
      }
      const reservationDate = new Date(`${formData.date}T${formData.time}:00`);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

      const res = await axios.post(`${baseUrl}/reservations`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        reservationDate: reservationDate.toISOString(),
        specialRequests: formData.specialRequests,
        recaptchaToken,
      });

      if (res.data?.success) {
        setStatus({
          state: "success",
          message:
            lang === "fi"
              ? "Pöytävarauspyyntö vastaanotettu! Vahvistamme varauksesi pian."
              : "Reservation requested! We will confirm your table shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: 2,
          date: "",
          time: "17:00",
          specialRequests: "",
        });
      }
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err.response?.data?.message ||
          (lang === "fi"
            ? "Varauksen tekeminen epäonnistui. Yritä uudelleen."
            : "Failed to submit booking. Please try again."),
      });
    }
  };

  return (
    <section
      id="reserve"
      className="max-w-4xl mx-auto px-6 py-20 text-brand-cream"
    >
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
          {lang === "fi" ? "PÖYTÄVARAUS" : "RESERVATION"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream tracking-tight">
          {lang === "fi" ? "Varaa Pöytä Ravintolasta" : "Book Your Table"}
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted font-sans max-w-md mx-auto">
          {lang === "fi"
            ? "Nauti parhaista intialaisista mauista Tampereella. Vahvistamme varauksen sähköpostitse."
            : "Experience fine Indian dining in Tampere. We will confirm your reservation via email."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-brand-card/60 p-8 rounded-3xl border border-brand-gold/20 shadow-2xl backdrop-blur-sm"
      >
        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-brand-muted">
              {lang === "fi" ? "Nimi *" : "Name *"}
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2 text-sm text-brand-cream focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-brand-muted">
              {lang === "fi" ? "Sähköposti *" : "Email *"}
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2 text-sm text-brand-cream focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-brand-muted">
              {lang === "fi" ? "Puhelinnumero *" : "Phone *"}
            </label>
            <input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2 text-sm text-brand-cream focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Date, Time, and Guest Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
          {/* Guest Count: Up/Down Stepper */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-muted">
              <Users className="w-3.5 h-3.5 text-brand-gold" />
              <span>{lang === "fi" ? "Henkilömäärä *" : "Guests *"}</span>
            </label>
            <div className="flex items-center justify-between bg-brand-darker border border-brand-gold/20 rounded-xl px-3 py-1.5">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                disabled={formData.guests <= 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gold hover:bg-brand-gold/15 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                aria-label="Decrease guests"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif text-base font-bold text-brand-cream">
                {formData.guests}{" "}
                <span className="text-xs font-sans text-brand-muted font-normal">
                  {lang === "fi" ? "hlö" : "pers"}
                </span>
              </span>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                disabled={formData.guests >= 20}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gold hover:bg-brand-gold/15 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                aria-label="Increase guests"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-muted">
              <CalendarIcon className="w-3.5 h-3.5 text-brand-gold" />
              <span>{lang === "fi" ? "Päivämäärä *" : "Date *"}</span>
            </label>
            <div className="relative">
              <input
                name="date"
                type="date"
                required
                min={todayStr}
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-brand-darker border border-brand-gold/20 rounded-xl px-3.5 py-2.5 text-xs text-brand-cream focus:outline-none focus:border-brand-gold scheme-dark transition-colors"
              />
            </div>
          </div>

          {/* Time Selector */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-muted">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>{lang === "fi" ? "Kellonaika *" : "Time *"}</span>
            </label>
            <input
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-brand-darker border border-brand-gold/20 rounded-xl px-3.5 py-2.5 text-xs text-brand-cream focus:outline-none focus:border-brand-gold scheme-dark transition-colors"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-1">
          <label className="text-[11px] uppercase tracking-wider text-brand-muted">
            {lang === "fi"
              ? "Erityistoiveet / Allergiat"
              : "Special Requests / Dietary Notes"}
          </label>
          <input
            name="specialRequests"
            type="text"
            placeholder={
              lang === "fi"
                ? "Esim. lastentuoli, ikkunapöytä, allergiat..."
                : "e.g., high chair, window seat, allergies..."
            }
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2 text-sm text-brand-cream placeholder:text-brand-muted/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Feedback Messages */}
        <AnimatePresence>
          {status.state === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{status.message}</span>
            </motion.div>
          )}

          {status.state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.state === "loading"}
          className="w-full py-3.5 bg-brand-gold text-brand-darker hover:bg-brand-goldLight text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md shadow-brand-gold/10 disabled:opacity-50 active:scale-[0.99]"
        >
          {status.state === "loading"
            ? lang === "fi"
              ? "Lähetetään..."
              : "Submitting..."
            : lang === "fi"
              ? "Vahvista Pöytävaraus"
              : "Request Table Reservation"}
        </button>
      </form>
    </section>
  );
}
