
import CustomerReviews from "@/components/CustomerReviews";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import OverlappingBottomHero from "@/components/home/OverlappingBottomHero";
import RentalCTA from "@/components/home/RentalCTA";
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
      <CustomerReviews />
      <RentalCTA />
    </main>
  );
}
