
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, X, Camera, Search } from "lucide-react";

interface MobileGalleryHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'profile') => void;
}

// Mock photos data managed by admin
const featuredPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600",
    author: "María García",
    contest: "Primavera en Barcelona",
    likes: 145,
    comments: 23,
    isRecent: true
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=600",
    author: "Carlos López",
    contest: "Flores Urbanas",
    likes: 98,
    comments: 15,
    isRecent: true
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    author: "Ana Rodríguez",
    contest: "Naturaleza Pura",
    likes: 167,
    comments: 31,
    isRecent: false
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    author: "David Martín",
    contest: "Bosques Mágicos",
    likes: 123,
    comments: 18,
    isRecent: true
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600",
    author: "Laura Sánchez",
    contest: "Aventura Natural",
    likes: 89,
    comments: 12,
    isRecent: false
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    author: "Roberto Jiménez",
    contest: "Atardeceres Únicos",
    likes: 201,
    comments: 28,
    isRecent: true
  }
];

const MobileGalleryHome = ({ onNavigate }: MobileGalleryHomeProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof featuredPhotos[0] | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const handleLike = (photoId: number) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Galería Destacada</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Las mejores fotos seleccionadas por nuestro equipo</p>
      </div>

      {/* Photo Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {featuredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={photo.url} 
                  alt={`Foto de ${photo.author}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                />
                {photo.isRecent && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      Reciente
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant={likedPhotos.has(photo.id) ? "default" : "secondary"}
                    className={`h-8 w-8 p-0 rounded-full ${
                      likedPhotos.has(photo.id) 
                        ? "bg-red-500 hover:bg-red-600 text-white" 
                        : "bg-white/80 hover:bg-white text-gray-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(photo.id);
                    }}
                  >
                    <Heart 
                      size={16} 
                      className={likedPhotos.has(photo.id) ? "fill-current" : ""} 
                    />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1">{photo.author}</h3>
                <p className="text-xs text-gray-600 mb-2">{photo.contest}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>{photo.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          onClick={() => onNavigate('upload')}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>

      {/* Photo Detail Dialog */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-md p-0 bg-black">
          {selectedPhoto && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              <img 
                src={selectedPhoto.url} 
                alt={`Foto de ${selectedPhoto.author}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{selectedPhoto.author}</h3>
                  <p className="text-sm opacity-90">{selectedPhoto.contest}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      <span>{selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{selectedPhoto.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileGalleryHome;
