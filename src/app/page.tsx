
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUsHowItWorks from "@/components/home/WhyChooseUsHowItWorks";
import PopularCategories from "@/components/PopularCategories";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <PopularCategories />
      <FeaturedEquipment />
      <WhyChooseUsHowItWorks />
    </main>
  );
}
