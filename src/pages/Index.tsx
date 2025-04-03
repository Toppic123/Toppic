
import { homeTexts } from "@/components/home/HomeTexts";
import { heroImages, popularContests, winningPhotos } from "@/components/home/HomeData";
import HeroSection from "@/components/home/HeroSection";
import PopularContestsSection from "@/components/home/PopularContestsSection";
import EventTypesSection from "@/components/home/EventTypesSection";
import WinningGallerySection from "@/components/home/WinningGallerySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import OrganizerSection from "@/components/home/OrganizerSection";

const Index = () => {
  return (
    <div className="pt-0">
      <HeroSection 
        heroImages={heroImages}
        texts={{
          heroTitle: homeTexts.heroTitle,
          heroSubtitle: homeTexts.heroSubtitle,
          heroDescription: homeTexts.heroDescription,
          exploreContests: homeTexts.exploreContests,
          startNow: homeTexts.startNow
        }}
      />
      
      <PopularContestsSection 
        contests={popularContests}
        texts={{
          featuredContest: homeTexts.featuredContest,
          seeAll: homeTexts.seeAll
        }}
      />
      
      <EventTypesSection 
        texts={{
          eventTypes: homeTexts.eventTypes,
          eventTypesDesc: homeTexts.eventTypesDesc,
          musicEvents: homeTexts.musicEvents,
          musicEventsDesc: homeTexts.musicEventsDesc,
          sportsEvents: homeTexts.sportsEvents,
          sportsEventsDesc: homeTexts.sportsEventsDesc,
          touristPlaces: homeTexts.touristPlaces,
          touristPlacesDesc: homeTexts.touristPlacesDesc,
          thematicContests: homeTexts.thematicContests,
          thematicContestsDesc: homeTexts.thematicContestsDesc
        }}
      />
      
      <WinningGallerySection 
        photos={winningPhotos}
        texts={{
          winningGallery: homeTexts.winningGallery,
          winningGalleryDesc: homeTexts.winningGalleryDesc,
          viewGallery: homeTexts.viewGallery
        }}
      />
      
      <HowItWorksSection 
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
      
      <OrganizerSection 
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
