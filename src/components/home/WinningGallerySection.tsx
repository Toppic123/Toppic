
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWinningPhotos } from "@/hooks/use-winning-photos";
import { Badge } from "@/components/ui/badge";

const WinningGallerySection = () => {
  const { photos: winningPhotos, loading: isLoading } = useWinningPhotos();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <p>Cargando galería de fotos ganadoras...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!winningPhotos || winningPhotos.length === 0) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Galería de Fotos Ganadoras</h2>
            <p className="text-gray-600">Próximamente se mostrarán las mejores fotografías de nuestros concursos.</p>
          </div>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % winningPhotos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + winningPhotos.length) % winningPhotos.length);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold">Galería de Fotos Ganadoras</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las fotografías más extraordinarias seleccionadas por nuestra comunidad
          </p>
        </motion.div>

        {/* Fixed gallery size - much larger now */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[70vh] min-h-[500px] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <motion.img
              key={currentIndex}
              src={winningPhotos[currentIndex].url}
              alt={winningPhotos[currentIndex].title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Overlay with photo info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge className="mb-3 bg-yellow-500 text-black font-semibold">
                    <Star className="h-4 w-4 mr-1" />
                    Foto Ganadora
                  </Badge>
                  <h3 className="text-3xl font-bold mb-2">{winningPhotos[currentIndex].title}</h3>
                  <p className="text-xl text-gray-200 mb-4">
                    por {winningPhotos[currentIndex].photographer}
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    {winningPhotos[currentIndex].category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {winningPhotos.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip below main image */}
          <div className="mt-6 flex justify-center space-x-4 overflow-x-auto pb-4">
            {winningPhotos.map((photo, index) => (
              <button
                key={photo.id}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex ? 'border-yellow-500 scale-110' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            ¿Tienes una fotografía extraordinaria? ¡Participa en nuestros concursos!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Explorar Concursos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WinningGallerySection;
