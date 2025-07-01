import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Camera, Download, ExternalLink, Info, Mail, MapPin, Share2, Trophy, Clock, X, User, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PhotoCard from "@/components/PhotoCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReportPhotoDialog from "@/components/ReportPhotoDialog";
import PhotoComments from "@/components/PhotoComments";
import ClickableUserProfile from "@/components/ClickableUserProfile";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Photo {
  id: string;
  imageUrl: string;
  photographer: string;
  photographerAvatar?: string;
  votes: number;
  position?: number;
}

interface ContestGalleryProps {
  contestId: string;
  contestTitle: string;
  contestDescription: string;
  location: string;
  endDate: string;
  startDate: string;
  availableUntil: string;
  photos: Photo[];
  winners?: Photo[];
}

const ContestGallery = ({
  contestId,
  contestTitle,
  contestDescription,
  location,
  endDate,
  startDate,
  availableUntil,
  photos,
  winners = [],
}: ContestGalleryProps) => {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const calculateDaysRemaining = () => {
    const now = new Date();
    const expiryDate = new Date(availableUntil);
    const timeDiff = expiryDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };
  
  const [daysRemaining, setDaysRemaining] = useState(calculateDaysRemaining());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDaysRemaining(calculateDaysRemaining());
    }, 1000 * 60 * 60);
    
    return () => clearInterval(timer);
  }, [availableUntil]);
  
  const handleShareGallery = () => {
    setShowShareDialog(true);
  };
  
  const handleSendEmail = () => {
    toast({
      title: "Email enviado",
      description: "Se ha enviado un email con el enlace a la galería",
    });
    setEmailSent(true);
  };

  const handlePhotoClick = (photo: Photo) => {
    const allPhotos = [...winners, ...photos];
    const photoIndex = allPhotos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(photoIndex);
    setSelectedPhoto(photo);
  };

  // Navigation functions
  const navigateToNextPhoto = () => {
    const allPhotos = [...winners, ...photos];
    const nextIndex = (currentPhotoIndex + 1) % allPhotos.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(allPhotos[nextIndex]);
  };

  const navigateToPrevPhoto = () => {
    const allPhotos = [...winners, ...photos];
    const prevIndex = currentPhotoIndex === 0 ? allPhotos.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(allPhotos[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateToNextPhoto();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateToPrevPhoto();
      } else if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPhoto, currentPhotoIndex]);
  
  const galleryLink = `${window.location.origin}/contests/${contestId}/gallery`;
  const allPhotos = [...winners, ...photos];
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{contestTitle}</h1>
            <p className="text-muted-foreground max-w-2xl mb-6">{contestDescription}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#4891AA]" />
                <span>{location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-[#4891AA]" />
                <span>{new Date(startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-sm">
                <Camera className="w-4 h-4 mr-2 text-[#4891AA]" />
                <span>{photos.length} fotografías</span>
              </div>
            </div>
            
            {daysRemaining > 0 && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 mb-4">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Galería disponible por {daysRemaining} días más
              </Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleShareGallery} className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>Compartir galería</span>
            </Button>
            {!emailSent ? (
              <Button variant="outline" onClick={handleSendEmail} className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Enviar por email</span>
              </Button>
            ) : (
              <Button variant="outline" disabled className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Email enviado</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              onClick={() => setShowInfoDialog(true)}
              className="flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              <span>Información</span>
            </Button>
          </div>
        </div>
      </div>
      
      {winners.length > 0 && (
        <div className="mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 inline-flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-amber-500" />
              Fotografías ganadoras
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {winners.slice(0, 3).map((winner, index) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
                onClick={() => handlePhotoClick(winner)}
              >
                <div className="relative w-full cursor-pointer">
                  <Badge 
                    className={`absolute top-3 left-3 z-10 ${
                      index === 0 ? 'bg-amber-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      'bg-amber-700'
                    }`}
                  >
                    {index === 0 ? '1er lugar' : index === 1 ? '2do lugar' : '3er lugar'}
                  </Badge>
                  <img 
                    src={winner.imageUrl} 
                    alt={`Ganador ${index + 1}`} 
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-medium">{winner.photographer}</p>
                  <p className="text-sm text-muted-foreground">{winner.votes} votos</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Gallery grid - Enhanced to show photographer info on all photos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-8">Todas las fotografías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="cursor-pointer group"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden rounded-xl relative">
                <img
                  src={photo.imageUrl}
                  alt={`Foto de ${photo.photographer}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay with photographer info - visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={photo.photographerAvatar} alt={photo.photographer} />
                        <AvatarFallback className="text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">{photo.photographer}</span>
                      {photo.votes > 0 && (
                        <span className="text-xs text-white/80 ml-auto">{photo.votes} votos</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir galería de concurso</DialogTitle>
            <DialogDescription>
              Comparte este enlace para que otros puedan ver todas las fotografías de este concurso.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-4">
              <div className="bg-muted px-4 py-3 rounded-md text-sm break-all">
                {galleryLink}
              </div>
              <SocialShareButtons url={galleryLink} title={`Galería de fotografías: ${contestTitle}`} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Información sobre la galería</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Disponibilidad</h3>
              <p className="text-sm text-muted-foreground">
                Esta galería estará disponible hasta el {new Date(availableUntil).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.
                Después de esta fecha, las fotografías ya no estarán accesibles.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Derechos de uso</h3>
              <p className="text-sm text-muted-foreground">
                Las fotografías mostradas en esta galería están protegidas por derechos de autor y pertenecen a sus respectivos creadores.
                No está permitido descargar, reproducir o utilizar estas imágenes sin el consentimiento explícito de sus autores.
                </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Calidad de imagen</h3>
              <p className="text-sm text-muted-foreground">
                Las imágenes se muestran en resolución reducida para visualización en web. 
                Para obtener imágenes en alta resolución, contacta directamente con los autores o los organizadores del concurso.
              </p>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowInfoDialog(false)}>Cerrar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Photo detail dialog with navigation - Works for ALL photos including vertical ones */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-7xl max-h-[95vh] overflow-hidden p-0">
          {selectedPhoto && (
            <div className="flex h-[90vh] max-h-[90vh]">
              {/* Left side - Photo with enhanced display and navigation */}
              <div className="flex-1 bg-black flex items-center justify-center relative min-w-0">
                <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar</span>
                </DialogClose>
                
                {/* Navigation buttons */}
                {allPhotos.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80"
                      onClick={navigateToPrevPhoto}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Foto anterior</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80"
                      onClick={navigateToNextPhoto}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Siguiente foto</span>
                    </Button>
                  </>
                )}
                
                {/* Photo counter */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 rounded-full px-3 py-1 text-white text-sm">
                  {currentPhotoIndex + 1} / {allPhotos.length}
                </div>
                
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={`Foto de ${selectedPhoto.photographer}`} 
                  className="max-h-full max-w-full object-contain"
                />
                
                {/* Mobile-friendly photographer info overlay for the photo */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <div className="bg-black/80 rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedPhoto.photographerAvatar} alt={selectedPhoto.photographer} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{selectedPhoto.photographer}</p>
                        <p className="text-xs text-white/80">{selectedPhoto.votes} votos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Enhanced Information and Comments panel */}
              <div className="w-80 lg:w-96 bg-white flex flex-col border-l shrink-0">
                {/* Photo Info Header - Enhanced */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedPhoto.photographerAvatar} alt={selectedPhoto.photographer} />
                      <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <ClickableUserProfile 
                        photographer={selectedPhoto.photographer}
                        photographerAvatar={selectedPhoto.photographerAvatar}
                        size="md"
                        showAvatar={false}
                      />
                      <p className="text-sm text-muted-foreground">{selectedPhoto.votes} votos</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Action buttons section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Compartir foto:</span>
                    </div>
                    <SocialShareButtons 
                      url={`${window.location.origin}/contests/${contestId}/photos/${selectedPhoto.id}`}
                      title={`Foto de ${selectedPhoto.photographer} en ${contestTitle}`}
                      imageUrl={selectedPhoto.imageUrl}
                    />
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">¿Hay algún problema con esta foto?</span>
                      <ReportPhotoDialog 
                        photoId={selectedPhoto.id}
                        trigger={
                          <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 border-red-200">
                            <Flag className="h-4 w-4 mr-1" />
                            Denunciar
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
                
                {/* Comments Section - Enhanced and always visible */}
                <div className="flex-1 overflow-hidden">
                  <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContestGallery;
