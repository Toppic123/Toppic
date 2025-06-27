
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";
import NearbyMap from "@/components/Map";

const NearbyContestsSection = () => {
  const { featuredContests, isLoading } = useFeaturedContests();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only active featured contests and get contest data
  const activeContests = featuredContests
    .filter(featured => featured.is_active && featured.contests)
    .map(featured => featured.contests!)
    .filter(contest => contest.status === 'active');

  const nextSlide = () => {
    if (activeContests.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % activeContests.length);
    }
  };

  const prevSlide = () => {
    if (activeContests.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + activeContests.length) % activeContests.length);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (activeContests.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [activeContests.length]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <p>Cargando concursos activos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Concursos Activos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participa en los concursos destacados seleccionados por nuestros administradores
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative h-[40vh] w-full rounded-lg overflow-hidden border border-border shadow-lg">
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button 
                className="flex items-center justify-center bg-[#F0C14B] hover:bg-[#F0C14B]/90 text-black font-medium px-6 py-3 rounded-full shadow-lg"
              >
                <span>Concursos cercanos</span>
              </Button>
            </div>
            <NearbyMap />
          </div>
        </motion.div>

        {activeContests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contests">
                Explorar Todos los Concursos
              </Link>
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="relative">
              {/* Contest Cards Slider */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {activeContests.map((contest, index) => (
                    <div key={contest.id} className="w-full flex-shrink-0 px-4">
                      <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <img
                              src={contest.image_url || `https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600`}
                              alt={contest.title}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <CardContent className="md:w-1/2 p-8">
                            <div className="flex items-center mb-4">
                              <Badge className="bg-green-500 text-white mr-3">
                                Activo
                              </Badge>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                                <Trophy className="h-3 w-3 mr-1" />
                                Destacado
                              </Badge>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-4">{contest.title}</h3>
                            <p className="text-gray-600 mb-6">
                              Organizado por {contest.organizer}
                            </p>

                            <div className="space-y-3 mb-6">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{contest.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span>Participantes esperados</span>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button asChild className="flex-1">
                                <Link to={`/contests/${contest.id}`}>
                                  Ver Detalles
                                </Link>
                              </Button>
                              <Button asChild variant="outline" className="flex-1">
                                <Link to="/upload">
                                  Participar
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation buttons */}
              {activeContests.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Dots indicator */}
              {activeContests.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {activeContests.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg" variant="outline">
                <Link to="/contests">
                  Ver Todos los Concursos
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default NearbyContestsSection;
