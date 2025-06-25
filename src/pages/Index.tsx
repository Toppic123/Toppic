
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WinningGallerySection from "@/components/home/WinningGallerySection";
import PopularContestsSection from "@/components/home/PopularContestsSection";
import NearbyContestsSection from "@/components/home/NearbyContestsSection";
import OrganizerSection from "@/components/home/OrganizerSection";
import { homeTexts } from "@/components/home/HomeTexts";
import { heroImages, popularContests } from "@/components/home/HomeData";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <HeroSection heroImages={heroImages} texts={homeTexts} />
      <PopularContestsSection contests={popularContests} texts={homeTexts} />
      <NearbyContestsSection texts={homeTexts} />
      <HowItWorksSection texts={homeTexts} />
      <WinningGallerySection />
      <OrganizerSection texts={homeTexts} />
    </motion.div>
  );
};

export default Index;
