"use client";

import { useLanguage } from "@/context/LanguageContext";

const FooterSubTitle = () => {
  const { lang } = useLanguage();
  //   const subTitle=;
  return (
    <p className="text-xs font-sans text-brand-muted leading-relaxed max-w-sm">
      {lang === "fi"
        ? "Aitoja intialaisia ​​makuja, herkullinen arkipäivien buffet ja Kajaanin parhaat tandooriuunissa valmistetut erikoisuudet."
        : "Authentic Indian flavors, a delicious weekday buffet, and the best tandoori oven specialties in Kajaani."}
    </p>
  );
};

export default FooterSubTitle;
