
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

  // Use the first 3 contests from the static data
  const displayContests = contests.slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-background dark:to-background/50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Título homogeneizado con el estilo del resto de secciones */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Popular
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Concursos Populares
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Descubre los concursos más populares y emocionantes
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
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
        
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" className="group">
              <Link to="/contests">
                <span>{texts.seeAll}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PopularContestsSection;
