// app/menu/page.js
// Adjust the import paths to match your folder structure.
import MenuHero from "@/components/menu/MenuHero";

import MenuQuote from "@/components/menu/MenuQuote";
import MenuExplorer from "@/components/menu/MenuExplorer";
import ReservationCta from "@/components/common/ReservationCta";
import InstagramGrid from "@/components/common/InstagramGrid";
import MenuShowcase from "@/components/menu/MenuShowcase";

export const metadata = {
  title: "Ruokalista | Tandoori Koti",
  description:
    "Tutustu Tandoori Kotin ruokalistaan: tandoori-annokset, curryt, alkuruoat sekä kasvis- ja merenelävävaihtoehdot.",
};

export default function MenuPage() {
  return (
    // No overflow-hidden on this wrapper: it would break the sticky search bar in MenuExplorer
    <main className="w-full bg-brand-dark text-brand-cream">
      {/* 1. Page header */}
      <MenuHero />

      {/* 2. Editorial blocks: starters, mains, vegetarian and seafood */}
      <MenuShowcase />

      {/* 3. Quote banner */}
      <MenuQuote />

      {/* 4. Full searchable catalog from the API */}
      <MenuExplorer />

      {/* 5. Shared sections */}
      <ReservationCta />
      <InstagramGrid />
    </main>
  );
}
