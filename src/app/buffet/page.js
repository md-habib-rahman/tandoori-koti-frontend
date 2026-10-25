// src/app/buffet/page.js
import BuffetHero from "@/components/buffet/BuffetHero";
import BuffetWeek from "@/components/buffet/BuffetWeek";
import BuffetDetails from "@/components/buffet/BuffetDetails";
import ReservationCta from "@/components/common/ReservationCta";
import InstagramGrid from "@/components/common/InstagramGrid";

export const metadata = {
  title: "Lounasbuffet | Tandoori Koti",
  description:
    "Tandoori Kotin päivittäin vaihtuva lounasbuffet: lämpimät curryt, tuore naan, salaattipöytä sekä kahvi ja tee. Katso viikon lista ja hinnat.",
};

export default function BuffetPage() {
  return (
    <main className="w-full bg-brand-dark text-brand-cream">
      {/* 1. Page header with hours and price */}
      <BuffetHero />

      {/* 2. This week's menu from the API (carousel) */}
      <BuffetWeek />

      {/* 3. What's included and pricing */}
      <BuffetDetails />

      {/* 4. Shared sections */}
      <ReservationCta />
      <InstagramGrid />
    </main>
  );
}
