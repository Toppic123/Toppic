
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WinningGallerySection from "@/components/home/WinningGallerySection";
import PopularContestsSection from "@/components/home/PopularContestsSection";
import NearbyContestsSection from "@/components/home/NearbyContestsSection";
import EventTypesSection from "@/components/home/EventTypesSection";
import OrganizerSection from "@/components/home/OrganizerSection";
import { homeTexts } from "@/components/home/HomeTexts";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <HeroSection texts={homeTexts} />
      <HowItWorksSection texts={homeTexts} />
      <WinningGallerySection texts={homeTexts} />
      <PopularContestsSection texts={homeTexts} />
      <NearbyContestsSection texts={homeTexts} />
      <EventTypesSection texts={homeTexts} />
      <OrganizerSection texts={homeTexts} />
    </motion.div>
  );
};

export default Index;
