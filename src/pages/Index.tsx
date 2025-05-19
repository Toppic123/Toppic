
import { homeTexts } from "@/components/home/HomeTexts";
import { heroImages, popularContests, winningPhotos } from "@/components/home/HomeData";
import HeroSection from "@/components/home/HeroSection";
import PopularContestsSection from "@/components/home/PopularContestsSection";
import WinningGallerySection from "@/components/home/WinningGallerySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import OrganizerSection from "@/components/home/OrganizerSection";
import NearbyContestsSection from "@/components/home/NearbyContestsSection";
import { memo } from "react";

// Use memo to prevent unnecessary re-renders for performance
const MemoizedHeroSection = memo(HeroSection);
const MemoizedPopularContestsSection = memo(PopularContestsSection);
const MemoizedNearbyContestsSection = memo(NearbyContestsSection);
const MemoizedWinningGallerySection = memo(WinningGallerySection);
const MemoizedHowItWorksSection = memo(HowItWorksSection);
const MemoizedOrganizerSection = memo(OrganizerSection);

const Index = () => {
  return (
    <div className="pt-0 bg-[#fcfcfc] dark:bg-background">
      <MemoizedHeroSection 
        heroImages={heroImages}
        texts={{
          heroTitle: homeTexts.heroTitle,
          heroSubtitle: homeTexts.heroSubtitle,
          heroDescription: homeTexts.heroDescription,
          exploreContests: homeTexts.exploreContests,
          startNow: homeTexts.startNow
        }}
      />
      
      <MemoizedPopularContestsSection 
        contests={popularContests}
        texts={{
          featuredContest: homeTexts.featuredContest,
          seeAll: homeTexts.seeAll
        }}
      />
      
      <MemoizedNearbyContestsSection 
        texts={{
          nearbyContests: homeTexts.nearbyContests,
          nearbyContestsDesc: homeTexts.nearbyContestsDesc
        }}
      />
      
      <MemoizedWinningGallerySection 
        photos={winningPhotos}
        texts={{
          winningGallery: homeTexts.winningGallery,
          winningGalleryDesc: homeTexts.winningGalleryDesc,
          viewGallery: homeTexts.viewGallery
        }}
      />
      
      <MemoizedHowItWorksSection 
        texts={{
          howItWorks: homeTexts.howItWorks,
          participate: homeTexts.participate,
          participateDesc: homeTexts.participateDesc,
          vote: homeTexts.vote,
          voteDesc: homeTexts.voteDesc,
          win: homeTexts.win,
          winDesc: homeTexts.winDesc,
          startNow: homeTexts.startNow
        }}
      />
      
      <MemoizedOrganizerSection 
        texts={{
          organizerTitle: homeTexts.organizerTitle,
          organizerDesc: homeTexts.organizerDesc,
          discoverPlans: homeTexts.discoverPlans
        }}
      />
    </div>
  );
};

export default Index;
