
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";
import ModernSectionTitle from "./ModernSectionTitle";

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
      <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-gray-950/30 dark:to-background relative overflow-hidden">
        {/* Background Pattern - unified */}
        <div className="absolute inset-0 opacity-4">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <ModernSectionTitle 
            title="Concursos Populares"
            subtitle="Cargando concursos destacados..."
            icon={Trophy}
            gradient="from-amber-500 via-orange-500 to-red-500"
          />
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
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-gray-950/30 dark:to-background relative overflow-hidden">
      {/* Background Pattern - unified */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-red-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern Title - unified style */}
        <ModernSectionTitle 
          title="Concursos Populares"
          subtitle="Descubre los concursos más populares y emocionantes de nuestra comunidad"
          icon={Trophy}
          gradient="from-amber-500 via-orange-500 to-red-500"
        />
        
        {displayContests.length > 0 ? (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
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
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group"
                >
                  <Link to="/contests" className="flex items-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <Trophy className="mr-3 h-5 w-5 relative z-10" />
                    <span className="relative z-10">{texts.seeAll}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
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
