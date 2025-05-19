
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PhotoComments from "@/components/PhotoComments";

interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  contestName: string;
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
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay fotos disponibles.</p>
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Detail Dialog with Comments */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[800px] flex flex-col p-0 gap-0">
          {selectedPhoto && (
            <>
              <DialogHeader className="px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-base">{selectedPhoto.title || 'Sin título'}</DialogTitle>
                  <div className="text-sm text-muted-foreground">
                    {selectedPhoto.contestName || 'Concurso'}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full">
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
