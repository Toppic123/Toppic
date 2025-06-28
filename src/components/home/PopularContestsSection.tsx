
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
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#f8f9fe] dark:from-background dark:to-background/90">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Título moderno pero más pequeño */}
        <div className="text-center mb-16 relative">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-4"
          >
            <div className="flex items-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full px-4 py-2 border border-primary/20 backdrop-blur-sm">
              <span className="text-primary font-bold text-sm">Popular</span>
            </div>
          </motion.div>
          
          {/* Título principal más pequeño */}
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-black mb-4 tracking-tight relative"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 bg-clip-text text-transparent relative">
              CONCURSOS POPULARES
              {/* Efecto de brillo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%', opacity: 0 }}
                whileInView={{ x: '200%', opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          
          {/* Línea decorativa animada */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 rounded-full mx-auto mb-4 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: [-100, 200] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Descubre los concursos más populares y emocionantes
          </motion.p>
        </div>
        
        <div className="flex justify-center mb-10">
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
      </div>
    </section>
  );
};

export default PopularContestsSection;
