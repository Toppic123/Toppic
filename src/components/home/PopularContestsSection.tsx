
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star, Crown, Award } from "lucide-react";
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-2 h-32 bg-gradient-to-b from-amber-200/40 to-transparent rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-32 h-2 bg-gradient-to-r from-orange-200/40 to-transparent rounded-full"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <ModernSectionTitle 
            title="Concursos Populares"
            subtitle="Cargando concursos destacados..."
            icon={Crown}
            gradient="from-amber-500 via-orange-500 to-red-500"
            showSparkles={false}
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
      photosCount: 0,
    }));

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-2 h-32 bg-gradient-to-b from-amber-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-32 h-2 bg-gradient-to-r from-orange-200/40 to-transparent rounded-full"></div>
      </div>

      {/* Minimal geometric decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-32 w-12 h-12 border border-amber-200/30 rounded-full"></div>
        <Crown className="absolute bottom-40 right-20 w-8 h-8 text-amber-300/20" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern Title with trophy theme */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
            CONCURSOS POPULARES
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre los concursos más populares y emocionantes de nuestra comunidad
          </p>
        </div>
        
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
                    <Crown className="mr-3 h-5 w-5 relative z-10" />
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
