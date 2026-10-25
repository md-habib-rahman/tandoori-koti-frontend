// app/about/page.js
// Adjust the import paths below to match your folder structure.

import AboutHero from "@/components/about/AboutHero";
import InstagramGrid from "@/components/common/InstagramGrid";
import ReservationCta from "@/components/common/ReservationCta";
import ReviewsSection from "@/components/home/ReviewsSection";
import StorySnippet from "@/components/home/StorySnippet";

export const metadata = {
  title: "Tandoori Koti",
  description:
    "Tutustu Tandoori Kotin tarinaan: aitoja intialaisia makuja, perinteinen saviuuni ja lämmin tunnelma.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Page header (new) */}
      <AboutHero />

      {/* Our story: reuses the home page story section */}
      <StorySnippet showCta={false} />

      {/* Proof from guests */}
      <ReviewsSection />

      {/* Book a table */}
      <ReservationCta />

      {/* Photos */}
      <InstagramGrid />
    </main>
  );
}
