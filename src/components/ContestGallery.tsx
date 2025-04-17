
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Camera, Download, ExternalLink, Info, Mail, MapPin, Share2, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PhotoCard } from "@/components/PhotoCard";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  
  // Calculate days remaining until gallery expires
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
    }, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(timer);
  }, [availableUntil]);
  
  const handleShareGallery = () => {
    setShowShareDialog(true);
  };
  
  const handleSendEmail = () => {
    // In a real implementation, this would call an API endpoint
    // to send an email with the gallery link
    toast({
      title: "Email enviado",
      description: "Se ha enviado un email con el enlace a la galería",
    });
    setEmailSent(true);
  };
  
  const galleryLink = `${window.location.origin}/contests/${contestId}/gallery`;
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      {/* Gallery header */}
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
      
      {/* Winners section - if there are winners */}
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
              >
                <div className="relative w-full">
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
      
      {/* Gallery grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-8">Todas las fotografías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              imageUrl={photo.imageUrl}
              photographer={photo.photographer}
              photographerAvatar={photo.photographerAvatar}
              votes={photo.votes}
              mode="grid"
              expanded={false}
            />
          ))}
        </div>
      </div>
      
      {/* Share dialog */}
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
      
      {/* Info dialog */}
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
    </div>
  );
};

export default ContestGallery;
