"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import InstagramGrid from "@/components/common/InstagramGrid";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactPage() {
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const content = {
    fi: {
      badge: "OTA YHTEYTTÄ",
      title: "Yhteystiedot",
      addressTitle: "Käyntiosoite",
      address: "Hämeenkatu 14\n33100 Tampere, Finland",
      phone: "+358 40 123 4567",
      email: "varaukset@tandoorikoti.fi",
      followTitle: "Seuraa Meitä",
      hoursTitle: "Aukioloajat",
      lunchTitle: "Lounasbuffet",
      lunchHours: "Ma–Pe 10:30 – 14:30",
      dinnerTitle: "Á La Carte",
      dinnerHours: "Ma–Pe 14:30 – 21:00\nLa–Su 12:00 – 21:00",
      formTag: "VARAA PÖYTÄ TAI KYSY",
      formHeading: "Ota yhteyttä",
      formDesc:
        "Suunnitteletko juhlaillallista, syntymäpäiviä tai isomman seurueen tilaisuutta? Lähetä meille viesti tai pöytävaraustoive alla olevalla lomakkeella.",
      nameLabel: "Nimi",
      emailLabel: "Sähköposti",
      phoneLabel: "Puhelinnumero",
      messageLabel: "Viesti tai pöytävarauksen tiedot (valinnainen)",
      submitBtn: "Lähetä viesti",
      submitting: "Lähetetään...",
      successMsg: "Kiitos yhteydenotostasi! Vastaamme sinulle pian.",
      errorMsg:
        "Lähetyksessä tapahtui virhe. Yritäthän uudelleen tai soita meille.",
      aboutBannerTag: "TARINAMME & PERINTEEMME",
      aboutBannerHeading: "Discover\nAbout Us",
      aboutBannerDesc:
        "Koe aito intialainen makumaailma, saviuunin hehku ja lämmin tunnelma.",
      aboutBannerBtn: "Lue lisää",
    },
    en: {
      badge: "GET IN TOUCH",
      title: "Contact",
      addressTitle: "Location",
      address: "Välikatu 18\n87100 Kajaani, Finland",
      phone: "+358 44 902 2407",
      //   email: "bookings@tandoorikoti.fi",
      followTitle: "Follow Us",
      hoursTitle: "Opening Hours",
      //   lunchTitle: "Lunch Time",
      lunchHours: "Mon–Fri 10:00 – 20:00",
      //   dinnerTitle: "Dinner Time",
      dinnerHours: "Sat 11:00 – 22:00\nSun 12:00 – 20:00",
      formTag: "INQUIRIES & RESERVATIONS",
      formHeading: "Get in touch",
      formDesc:
        "Planning a special dinner, private celebration, or group reservation? Fill out the form below and our team will get back to confirm your booking.",
      nameLabel: "Your name",
      emailLabel: "Your Address / Email",
      phoneLabel: "Phone Number",
      messageLabel: "Your message (optional)",
      submitBtn: "Submit",
      submitting: "Sending...",
      successMsg:
        "Thank you for reaching out! We will get back to you shortly.",
      errorMsg: "Failed to send message. Please try again or call us directly.",
      aboutBannerTag: "HERITAGE & CUISINE",
      aboutBannerHeading: "Discover\nAbout Us",
      aboutBannerDesc:
        "Experience authentic Indian dining, live tandoor warmth, and timeless spices.",
      aboutBannerBtn: "Explore Our Story",
    },
  };

  const t = content[lang] || content.en;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

      await axios.post(`${baseUrl}/contact`, {
        ...formData,
        recaptchaToken,
      });

      setStatus({
        state: "success",
        message: t.successMsg,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form submission error:", err);

      setStatus({
        state: "error",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="w-full bg-brand-dark text-brand-cream overflow-hidden">
      {/* --------------------------------------------------------
          1. HERO HEADER WITH AMBIENT BANQUET PHOTO (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80"
          alt="Outdoor dining table"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-darker/60 via-brand-darker/40 to-brand-dark" />

        <div className="relative z-10 text-center space-y-3 px-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-semibold"
          >
            {t.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif text-brand-cream font-bold tracking-tight"
          >
            {t.title}
          </motion.h1>
        </div>
      </section>

      {/* --------------------------------------------------------
          2. CONTACT DETAILS & OPENING HOURS (4-COLUMN MATRIX)
      -------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24 border-b border-brand-gold/15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Col 1: Address */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h2 className="font-serif text-lg font-bold text-brand-gold tracking-wide">
              {t.addressTitle}
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed whitespace-pre-line">
              {t.address}
            </p>
          </motion.div>

          {/* Col 2: Phone & Email */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h2 className="font-serif text-lg font-bold text-brand-gold tracking-wide">
              {lang === "fi" ? "Puhelin & Sähköposti" : "Direct Inquiries"}
            </h2>
            <div className="text-xs sm:text-sm text-brand-muted font-sans space-y-1.5">
              <p className="flex items-center gap-1">
                <span className="text-brand-cream">
                  <Phone size={16} />{" "}
                </span>
                <a
                  href={`tel:${t.phone.replace(/\s+/g, "")}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {t.phone}
                </a>
              </p>
              {/* <p>
                <span className="text-brand-cream font-medium">E: </span>
                <a
                  href={`mailto:${t.email}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {t.email}
                </a>
              </p> */}
            </div>
          </motion.div>

          {/* Col 3: Social Follow */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h2 className="font-serif text-lg font-bold text-brand-gold tracking-wide">
              {t.followTitle}
            </h2>
            <div className="flex flex-col text-xs sm:text-sm text-brand-muted font-sans space-y-1.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-gold transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-gold transition-colors"
              >
                TripAdvisor
              </a>
            </div>
          </motion.div>

          {/* Col 4: Opening Hours */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h2 className="font-serif text-lg font-bold text-brand-gold tracking-wide">
              {t.hoursTitle}
            </h2>
            <div className="text-xs sm:text-sm text-brand-muted font-sans space-y-3">
              <div>
                <span className="text-brand-cream font-semibold block text-[11px] uppercase tracking-wider">
                  {t.lunchTitle}
                </span>
                <p className="mt-0.5">{t.lunchHours}</p>
              </div>
              <div>
                <span className="text-brand-cream font-semibold block text-[11px] uppercase tracking-wider">
                  {t.dinnerTitle}
                </span>
                <p className="whitespace-pre-line mt-0.5">{t.dinnerHours}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------------
          3. FULL-WIDTH MONOCHROME DARK MAP (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <section className="relative max-w-6xl mx-auto h-[380px] md:h-[460px] bg-brand-darker border-b border-brand-gold/15 overflow-hidden">
        <iframe
          title="Tandoori Koti Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257.87723266072703!2d27.72966807379186!3d64.22725125451534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46825b017dccfe89%3A0xfae08827696b90cd!2sV%C3%A4likatu%2018%2C%2087100%20Kajaani%2C%20Finland!5e0!3m2!1sen!2sbd!4v1788683533766!5m2!1sen!2sbd"
          className="w-full h-full border-0 filter invert contrast-125 brightness-75 opacity-80 hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
          allowFullScreen
        />
        {/* Subtle bottom gradient to blend into form section */}
        {/* <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" /> */}
      </section>

      {/* --------------------------------------------------------
          4. GET IN TOUCH FORM SECTION (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <section
        id="reserve"
        className="max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Narrative */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
              {t.formTag}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-cream tracking-tight">
              {t.formHeading}
            </h2>

            <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed max-w-md">
              {t.formDesc}
            </p>
          </motion.div>

          {/* Right Column: Minimalist Underline Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-brand-muted font-sans"
                  >
                    {t.nameLabel} *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2.5 text-sm text-brand-cream focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-brand-muted font-sans"
                  >
                    {t.emailLabel} *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2.5 text-sm text-brand-cream focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone + Message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Phone */}
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider text-brand-muted font-sans"
                  >
                    {t.phoneLabel} *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2.5 text-sm text-brand-cream focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-brand-muted font-sans"
                  >
                    {t.messageLabel}
                  </label>

                  <input
                    id="message"
                    name="message"
                    type="text"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold py-2.5 text-sm text-brand-cream focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* reCAPTCHA v3
            No visible widget is required.
            The token is generated when the form is submitted.
        */}

              {/* Status Alert Banner */}
              <AnimatePresence>
                {status.state === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-sans"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {status.state === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-sans"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <div>
                <motion.button
                  type="submit"
                  disabled={status.state === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-3.5 bg-brand-gold text-brand-darker hover:bg-brand-goldLight text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md shadow-brand-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.state === "loading" ? t.submitting : t.submitBtn}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------------
          5. "DISCOVER ABOUT US" CALLOUT BANNER (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <section className="relative w-full py-20 bg-brand-darker border-y border-brand-gold/15 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">
              {t.aboutBannerTag}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-cream font-bold leading-tight whitespace-pre-line">
              {t.aboutBannerHeading}
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed max-w-md">
              {t.aboutBannerDesc}
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-gold hover:text-brand-goldLight font-bold transition-colors group"
              >
                {t.aboutBannerBtn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-64 sm:h-72 rounded-2xl overflow-hidden border border-brand-gold/25 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                alt="Culinary pot and dish"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
          6. SHARED SOCIAL AMBIENCE GALLERY
      -------------------------------------------------------- */}
      <InstagramGrid />
    </div>
  );
}
