
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";
import { useContestsData } from "@/hooks/useContestsData";

interface PopularContestsSectionProps {
  contests: any[];
  texts: {
    featuredContest: string;
    seeAll: string;
  };
}

const PopularContestsSection = ({ contests, texts }: PopularContestsSectionProps) => {
  const { featuredContests, isLoading: featuredLoading } = useFeaturedContests();
  const { contests: allContests, isLoading: contestsLoading } = useContestsData();

  // Variantes de animación para contenedor e items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Get featured contests data
  const getFeaturedContestsData = () => {
    if (featuredLoading || contestsLoading || !featuredContests.length) {
      // Fallback to original contests if no featured contests
      return contests.slice(0, 3);
    }

    // Map featured contests to display format
    const featuredData = featuredContests
      .slice(0, 3) // Limit to 3 contests
      .map(featured => {
        const contest = allContests.find(c => c.id === featured.contest_id);
        if (!contest) return null;
        
        return {
          id: contest.id,
          title: contest.title,
          imageUrl: contest.imageUrl,
          location: contest.location,
          dateStart: contest.startDate,
          dateEnd: contest.endDate,
          participantsCount: contest.participants,
          photosCount: 0 // Default value
        };
      })
      .filter(Boolean);

    return featuredData.length > 0 ? featuredData : contests.slice(0, 3);
  };

  const displayContests = getFeaturedContestsData();

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#f8f9fe] dark:from-background dark:to-background/90">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-2 tracking-tight text-center flex items-center gap-3"
          >
            <Star className="h-8 w-8 text-yellow-500" />
            Concursos Destacados
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-primary rounded w-24 mb-4"
          ></motion.div>
          
          <Button asChild variant="ghost" className="group mt-4">
            <Link to="/contests">
              <span>{texts.seeAll}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayContests.map((contest) => (
            <motion.div key={contest.id} variants={itemVariants}>
              <ContestCard 
                id={contest.id}
                title={contest.title}
                imageUrl={contest.imageUrl}
                location={contest.location}
                dateStart={contest.dateStart}
                dateEnd={contest.dateEnd}
                participantsCount={contest.participantsCount}
                photosCount={contest.photosCount}
              />
            </motion.div>
          ))}
        </motion.div>

        {featuredLoading && (
          <div className="text-center mt-8">
            <p className="text-gray-500">Cargando concursos destacados...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularContestsSection;
