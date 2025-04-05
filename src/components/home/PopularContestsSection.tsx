
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";

interface Contest {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  participantsCount: number;
  photosCount: number;
}

interface PopularContestsSectionProps {
  contests: Contest[];
  texts: {
    featuredContest: string;
    seeAll: string;
  };
}

const PopularContestsSection = ({ contests, texts }: PopularContestsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-white text-black">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{texts.featuredContest}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular contests right now and participate with your best photographs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <ContestCard key={contest.id} {...contest} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full px-8 border-[#4891AA] text-[#4891AA] hover:bg-[#4891AA]/10">
            <Link to="/contests">
              <span>{texts.seeAll}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularContestsSection;
