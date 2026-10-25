"use client";

import { useLanguage } from "@/context/LanguageContext";

const FooterSubTitle = () => {
  const { lang } = useLanguage();

  return (
    <p className="max-w-sm font-sans text-base leading-relaxed text-[#D9C6A8]">
      {lang === "fi"
        ? "Aitoja intialaisia makuja, herkullinen arkipäivien buffet ja Kajaanin parhaat tandooriuunissa valmistetut erikoisuudet."
        : "Authentic Indian flavors, a delicious weekday buffet, and the best tandoori oven specialties in Kajaani."}
    </p>
  );
};

export default FooterSubTitle;