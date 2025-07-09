import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star, Crown, Award, Navigation, Compass, Camera, MapPin, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";

interface CombinedContestsSectionProps {
  texts: {
    featuredContest: string;
    seeAll: string;
  };
}

const CombinedContestsSection = ({ texts }: CombinedContestsSectionProps) => {
  const { featuredContests, isLoading } = useFeaturedContests();
  const navigate = useNavigate();

  const handleViewContests = () => {
    navigate("/contests");
  };

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

  // Convert featured contests to the format expected by ContestCard
  const displayContests = featuredContests
    .filter(featured => featured.contests && featured.is_active)
    .slice(0, 2) // Solo 2 concursos para el diseño combinado
    .map(featured => ({
      id: featured.contests!.id,
      title: featured.contests!.title,
      imageUrl: featured.contests!.image_url || "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
      location: featured.contests!.location || "Sin ubicación",
      dateStart: new Date().toISOString().split('T')[0],
      dateEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      photosCount: 0,
    }));

  if (isLoading) {
    return (
      <section className="pt-32 pb-24 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Descubre Concursos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Cargando contenido...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Enhanced Background Pattern combining both themes */}
      <div className="absolute inset-0 opacity-30">
        {/* Popular contests theme (left side) */}
        <div className="absolute top-20 left-20 w-2 h-32 bg-gradient-to-b from-amber-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-32 h-2 bg-gradient-to-r from-orange-200/40 to-transparent rounded-full"></div>
        
        {/* Nearby contests theme (right side) */}
        <div className="absolute top-20 right-20 w-2 h-32 bg-gradient-to-b from-emerald-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-32 h-2 bg-gradient-to-r from-teal-200/40 to-transparent rounded-full"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-8 w-24 h-24 border-2 border-amber-200/20 rounded-full"></div>
        <div className="absolute top-1/2 right-12 w-32 h-32 border border-emerald-200/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-12 w-20 h-20 border-2 border-orange-200/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-12 w-20 h-20 border-2 border-teal-200/20 rounded-full"></div>
        
        {/* Floating icons */}
        <Crown className="absolute top-1/3 left-24 w-6 h-6 text-amber-300/25" />
        <Camera className="absolute top-2/3 left-32 w-5 h-5 text-orange-300/25" />
        <Navigation className="absolute top-1/3 right-24 w-6 h-6 text-emerald-300/25" />
        <MapPin className="absolute top-2/3 right-20 w-5 h-5 text-teal-300/25" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Combined Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Descubre Concursos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explora concursos populares y encuentra eventos cerca de tu ubicación
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left side - Popular Contests */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Concursos Populares
                </h3>
              </div>

              {displayContests.length > 0 ? (
                <>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-6 mb-8"
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

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group w-full"
                    >
                      <Link to="/contests" className="flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                        <Crown className="mr-3 h-5 w-5 relative z-10" />
                        <span className="relative z-10">{texts.seeAll}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                      </Link>
                    </Button>
                  </motion.div>
                </>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200/30">
                  <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <p className="text-amber-700 dark:text-amber-300 mb-2">No hay concursos destacados</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    Próximamente tendremos concursos populares
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right side - Nearby Contests Button */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Concursos Cerca de Ti
                </h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">
                Descubre concursos de fotografía en tu área y participa desde tu ubicación actual
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-8"
              >
                <Button
                  size="lg"
                  onClick={handleViewContests}
                  className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white w-64 h-64 text-lg sm:text-xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group mx-auto flex items-center justify-center"
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <Navigation className="h-10 w-10 mb-4" />
                    <div className="text-center leading-tight">
                      EXPLORAR<br/>CONCURSOS<br/>CERCANOS
                    </div>
                    <motion.div
                      className="mt-4"
                      animate={{ x: [0, 8, 0] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.div>
                  </div>
                </Button>
              </motion.div>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedContestsSection;