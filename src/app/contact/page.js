"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import InstagramGrid from "@/components/common/InstagramGrid";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ReservationSection from "@/components/reservation/ReservationSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactAboutBanner from "@/components/contact/ContactAboutBanner";
import DeliverySection from "@/components/delivery/DeliverySection";

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
      address: "Välikatu 18\n87100 Kajaani, Finland",
      phone: "+358 44 902 2407",
      email: "tandoorikoti@gmail.com",
      followTitle: "Seuraa Meitä",
      hoursTitle: "Aukioloajat",
      //   lunchTitle: "Lounasbuffet",
      lunchHours: "Ma–Pe 10:30 – 14:30",
      //   dinnerTitle: "Á La Carte",
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
      email: "tandoorikoti@gmail.com",
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
      {/* <section className="relative w-full h-100 md:h-125 flex items-center justify-center overflow-hidden">
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
      </section> */}

      <ContactHero badge={t.badge} title={t.title} />

      {/* --------------------------------------------------------
          2. CONTACT DETAILS & OPENING HOURS (4-COLUMN MATRIX)
      -------------------------------------------------------- */}
      <ContactInfo t={t} />

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

      {/* Delivery */}

      <DeliverySection />

      {/* --------------------------------------------------------
          4. GET IN TOUCH FORM SECTION (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <ContactForm
        t={t}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        status={status}
      />

      <ReservationSection />

      {/* --------------------------------------------------------
          5. "DISCOVER ABOUT US" CALLOUT BANNER (Matching Contact.jpg)
      -------------------------------------------------------- */}
      <ContactAboutBanner t={t} />

      {/* --------------------------------------------------------
          6. SHARED SOCIAL AMBIENCE GALLERY
      -------------------------------------------------------- */}
      <InstagramGrid />
    </div>
  );
}
