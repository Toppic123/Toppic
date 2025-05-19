
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";

interface PopularContestsSectionProps {
  contests: any[];
  texts: {
    featuredContest: string;
    seeAll: string;
  };
}

const PopularContestsSection = ({ contests, texts }: PopularContestsSectionProps) => {
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

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#f8f9fe] dark:from-background dark:to-background/90">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-2 tracking-tight"
            >
              {texts.featuredContest}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 100 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-primary rounded w-24 mb-4"
            ></motion.div>
          </div>
          
          <Button asChild variant="ghost" className="group">
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
          {contests.map((contest) => (
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
      </div>
    </section>
  );
};

export default PopularContestsSection;
