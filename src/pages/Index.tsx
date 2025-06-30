
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WinningGallerySection from "@/components/home/WinningGallerySection";
import PopularContestsSection from "@/components/home/PopularContestsSection";
import NearbyContestsSection from "@/components/home/NearbyContestsSection";
import OrganizerSection from "@/components/home/OrganizerSection";
import { homeTexts } from "@/components/home/HomeTexts";
import { heroImages } from "@/components/home/HomeData";

// Function to clean contest titles by removing "FOTOGRAFIA" and similar words
const cleanContestTitle = (title: string): string => {
  if (!title) return '';
  
  // Remove "FOTOGRAFIA", "FOTOGRAFÍA", "DE FOTOGRAFIA", etc. (case insensitive)
  const cleanedTitle = title
    .replace(/\b(de\s+)?fotograf[íi]a\b/gi, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return cleanedTitle;
};

// Apply cleaning to homeTexts
const cleanedHomeTexts = {
  ...homeTexts,
  featuredContest: cleanContestTitle(homeTexts.featuredContest),
  eventTypes: cleanContestTitle(homeTexts.eventTypes),
  thematicContests: cleanContestTitle(homeTexts.thematicContests),
  heroTitle: cleanContestTitle(homeTexts.heroTitle),
  heroSubtitle: cleanContestTitle(homeTexts.heroSubtitle),
  winningGallery: cleanContestTitle(homeTexts.winningGallery),
};

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <HeroSection heroImages={heroImages} texts={cleanedHomeTexts} />
      <NearbyContestsSection />
      <PopularContestsSection texts={cleanedHomeTexts} />
      <HowItWorksSection texts={cleanedHomeTexts} />
      <WinningGallerySection />
      <OrganizerSection texts={cleanedHomeTexts} />
    </motion.div>
  );
};

export default Index;
