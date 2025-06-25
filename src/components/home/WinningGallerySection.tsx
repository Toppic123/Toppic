
import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Heart, User, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWinningPhotos } from "@/hooks/use-winning-photos";
import PhotoComments from "@/components/PhotoComments";
import SocialShareButtons from "@/components/SocialShareButtons";

const WinningGallerySection = () => {
  const { photos: winningPhotos, loading: isLoading } = useWinningPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

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

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
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

          {/* Gallery grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {winningPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -5 }}
                onClick={() => handlePhotoClick(photo)}
                className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative group">
                  <img
                    src={photo.imageUrl || photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500/90 text-white border-0 flex items-center gap-1 px-3">
                      <Trophy className="h-3 w-3" />
                      Ganadora
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{photo.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={photo.photographerAvatar} alt={photo.photographer || photo.photographer_name} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{photo.photographer || photo.photographer_name}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
                      <span className="text-xs">{photo.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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

      {/* Photo Detail Modal */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-4xl h-[85vh] max-h-[900px] flex flex-col p-0 gap-0">
          {selectedPhoto && (
            <>
              <DialogHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-base">{selectedPhoto.title}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <SocialShareButtons 
                      url={window.location.href}
                      title={selectedPhoto.title}
                      imageUrl={selectedPhoto.imageUrl || selectedPhoto.image_url}
                    />
                  </div>
                </div>
              </DialogHeader>
              
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full min-h-0">
                <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedPhoto.imageUrl || selectedPhoto.image_url} 
                    alt={selectedPhoto.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                <div className="col-span-2 flex flex-col border-l">
                  <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WinningGallerySection;
