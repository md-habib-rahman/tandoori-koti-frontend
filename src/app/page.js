import InstagramGrid from "@/components/common/InstagramGrid";
import ReservationCta from "@/components/common/ReservationCta";

import FeaturedMenu from "@/components/home/FeaturedMenu";

// import HeroNew from "@/components/home/HeroNew";
import SpecialFeatures from "@/components/home/SpecialFeatures";
import StorySnippet from "@/components/home/StorySnippet";

import ReviewsSection from "@/components/home/ReviewsSection";
import ChefRecommend from "@/components/home/ChefRecommend";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <StorySnippet />
      <SpecialFeatures />
      <ChefRecommend />
      <FeaturedMenu />
      <ReservationCta />
      <InstagramGrid />
      <ReviewsSection />
    </div>
  );
}
