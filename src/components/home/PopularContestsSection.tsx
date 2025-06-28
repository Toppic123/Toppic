
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";

interface PopularContestsSectionProps {
  texts: {
    featuredContest: string;
    seeAll: string;
  };
}

const PopularContestsSection = ({ texts }: PopularContestsSectionProps) => {
  const { featuredContests, isLoading } = useFeaturedContests();

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

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-background dark:to-background/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              Popular
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Concursos Populares
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cargando concursos destacados...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Convert featured contests to the format expected by ContestCard
  const displayContests = featuredContests
    .filter(featured => featured.contests && featured.is_active)
    .slice(0, 3)
    .map(featured => ({
      id: featured.contests!.id,
      title: featured.contests!.title,
      imageUrl: featured.contests!.image_url || "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
      location: featured.contests!.location || "Sin ubicación",
      dateStart: new Date().toISOString().split('T')[0],
      dateEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      participantsCount: 0,
      photosCount: 0,
    }));

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
        
        {displayContests.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No hay concursos destacados configurados</p>
            <p className="text-sm text-gray-400">
              Los administradores pueden configurar concursos destacados desde el panel de administración
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularContestsSection;
