
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import OverlappingBottomHero from "@/components/home/OverlappingBottomHero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCategories from "@/components/PopularCategories";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <OverlappingBottomHero />
      <PopularCategories />
      <FeaturedEquipment />
      <WhyChooseUs />
      <HowItWorks />
    </main>
  );
}
