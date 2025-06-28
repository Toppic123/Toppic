
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Camera } from "lucide-react";
import PhotoComments from "@/components/PhotoComments";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReportPhotoDialog from "@/components/ReportPhotoDialog";
import ClickableUserProfile from "@/components/ClickableUserProfile";

interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  contestName: string;
  photographer?: string;
  photographerAvatar?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos = [] }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    if (photo && photo.id) {
      setSelectedPhoto(photo);
    }
  };

  // Safety check for undefined or empty photos array
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-2">No hay fotos disponibles</p>
        <p className="text-sm text-muted-foreground">
          Las fotos aparecerán aquí una vez que se suban a los concursos
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => {
          // Skip rendering if photo is missing critical data
          if (!photo || !photo.id) {
            console.warn("Invalid photo data found:", photo);
            return null;
          }
          
          return (
            <div key={photo.id} className="space-y-3">
              <div 
                className="group relative overflow-hidden rounded-lg cursor-pointer" 
                onClick={() => handlePhotoClick(photo)}
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title || 'Sin título'} 
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-medium truncate">{photo.title || 'Sin título'}</h3>
                  <p className="text-white/80 text-sm truncate">{photo.contestName || 'Concurso'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePhotoClick(photo);
                      }}
                    >
                      <MessageCircle className="h-3 w-3" />
                      Comentarios
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Add clickable photographer name if available */}
              {photo.photographer && (
                <div className="px-2">
                  <ClickableUserProfile 
                    photographer={photo.photographer}
                    photographerAvatar={photo.photographerAvatar}
                    size="sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Photo Detail Dialog with Contest Name and Comments */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-4xl h-[85vh] max-h-[900px] flex flex-col p-0 gap-0">
          {selectedPhoto && (
            <>
              <DialogHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <DialogTitle className="text-base">{selectedPhoto.title || 'Sin título'}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Concurso: {selectedPhoto.contestName || 'Sin especificar'}
                    </p>
                    {/* Nombre clicable del propietario en el modal */}
                    {selectedPhoto.photographer && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Fotógrafo:</p>
                        <ClickableUserProfile 
                          photographer={selectedPhoto.photographer}
                          photographerAvatar={selectedPhoto.photographerAvatar}
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <SocialShareButtons 
                      url={window.location.href}
                      title={selectedPhoto.title || 'Sin título'}
                      imageUrl={selectedPhoto.imageUrl}
                    />
                    <ReportPhotoDialog photoId={selectedPhoto.id} />
                  </div>
                </div>
              </DialogHeader>
              
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full min-h-0">
                <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedPhoto.imageUrl} 
                    alt={selectedPhoto.title || 'Sin título'}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                    }}
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

export default PhotoGallery;
