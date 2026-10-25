"use client";

import { useLanguage } from "@/context/LanguageContext";

const FACEBOOK_URL = "https://www.facebook.com/tandoorikoti";
const INSTAGRAM_URL = "https://www.instagram.com/tandoorikoti";

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export default function FooterFollowBtn() {
  const { lang } = useLanguage();
  const fi = lang === "fi";

  const links = [
    {
      href: FACEBOOK_URL,
      Icon: FacebookIcon,
      label: fi ? "Seuraa meitä Facebookissa" : "Follow us on Facebook",
    },
    {
      href: INSTAGRAM_URL,
      Icon: InstagramIcon,
      label: fi ? "Seuraa meitä Instagramissa" : "Follow us on Instagram",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-[15px] text-[#D9C6A8]">
        {fi ? "Seuraa meitä" : "Follow us"}
      </span>
      {links.map(({ href, Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-11 w-11 place-items-center rounded-full border border-brand-cream/35 text-brand-cream transition duration-300 hover:-translate-y-0.5 hover:border-[#F2A93B] hover:bg-[#F2A93B] hover:text-[#2A1206] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A93B]"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}