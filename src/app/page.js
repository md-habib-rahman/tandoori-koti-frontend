import InstagramGrid from "@/components/common/InstagramGrid";
import ReservationCta from "@/components/common/ReservationCta";
import ChefRecommend from "@/components/home/ChefRecommend";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import Hero from "@/components/home/Hero";
import SpecialFeatures from "@/components/home/SpecialFeatures";
import StorySnippet from "@/components/home/StorySnippet";

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
    </div>
  );
}
