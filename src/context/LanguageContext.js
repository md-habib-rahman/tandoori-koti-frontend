"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
  fi: {
    nav: {
      home: "Etusivu",
      menu: "Ruokalista",
      buffet: "Lounasbuffet",
      about: "Tarinamme",
      contact: "Yhteystiedot",
      reserve: "Varaa Pöytä",
    },
    common: {
      openHours: "Avoinna Ma–Pe 10:30–21:00 | La–Su 12:00–21:00",
      phone: "+358 40 123 4567",
      address: "Hämeenkatu 14, Tampere",
      bookOnline: "Tee Pöytävaraus",
      followUs: "Seuraa Meitä",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Our Menus",
      buffet: "Lunch Buffet",
      about: "About Us",
      contact: "Contact",
      reserve: "Book a Table",
    },
    common: {
      openHours:
        "Open Mon–Fri: 10:00–20:00 | Sat: 11:00–22:00 | Sun: 12:00–20:00",
      phone: "+358 44 902 2407",
      address: "Välikatu 18, Kajaani, Finland",
      bookOnline: "Make an Online Reservation",
      followUs: "Follow Us",
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fi");

  useEffect(() => {
    const saved = localStorage.getItem("tandoori_koti_lang");
    if (saved === "en" || saved === "fi") {
      setLang(saved);
    }
  }, []);

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("tandoori_koti_lang", newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
