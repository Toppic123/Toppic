
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

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="space-y-3">
            <div 
              className="group relative overflow-hidden rounded-lg cursor-pointer" 
              onClick={() => handlePhotoClick(photo)}
            >
              <img 
                src={photo.imageUrl} 
                alt={photo.title} 
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h3 className="text-white font-medium truncate">{photo.title}</h3>
                <p className="text-white/80 text-sm truncate">{photo.contestName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Detail Dialog with Comments */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[800px] flex flex-col p-0 gap-0">
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base">{selectedPhoto?.title}</DialogTitle>
              <div className="text-sm text-muted-foreground">
                {selectedPhoto?.contestName}
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhoto?.imageUrl} 
                alt={selectedPhoto?.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="col-span-2 flex flex-col border-l">
              {selectedPhoto && <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
