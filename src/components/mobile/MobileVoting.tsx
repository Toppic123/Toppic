
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, MessageCircle, Trophy, Users } from "lucide-react";
import MobilePhotoDetail from "./MobilePhotoDetail";

interface MobileVotingProps {
  onNavigate: (screen: 'contests' | 'upload' | 'vote' | 'profile') => void;
}

const mockPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600",
    author: "María García",
    likes: 45,
    comments: 12,
    description: "Flores de primavera en el Parque Güell"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=600",
    author: "Carlos López",
    likes: 38,
    comments: 8,
    description: "Jardines de Barcelona en flor"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    author: "Ana Rodríguez",
    likes: 52,
    comments: 15,
    description: "Tulipanes en el amanecer"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    author: "David Martín",
    likes: 41,
    comments: 9,
    description: "Bosque primaveral"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600",
    author: "Laura Sánchez",
    likes: 47,
    comments: 11,
    description: "Naturaleza en estado puro"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    author: "Roberto Jiménez",
    likes: 63,
    comments: 18,
    description: "Atardecer en la playa"
  }
];

const MobileVoting = ({ onNavigate }: MobileVotingProps) => {
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockPhotos[0] | null>(null);

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

  const handlePhotoClick = (photo: typeof mockPhotos[0]) => {
    setSelectedPhoto(photo);
  };

  if (selectedPhoto) {
    return (
      <MobilePhotoDetail 
        photo={selectedPhoto} 
        onBack={() => setSelectedPhoto(null)} 
      />
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            ← Volver
          </Button>
          <h1 className="text-lg font-semibold">Primavera en Barcelona</h1>
          <div></div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>45 participantes</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={16} />
              <span>Premio: 500€</span>
            </div>
          </div>
          <Badge className="bg-green-500 text-white">Activo</Badge>
        </div>
      </div>

      {/* Photo Grid - Two photos horizontally */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {mockPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={photo.url} 
                  alt={photo.description}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                />
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
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                
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
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3">
        <Button
          onClick={() => onNavigate('upload')}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <span className="text-2xl">📷</span>
        </Button>
        <Button
          onClick={() => onNavigate('vote')}
          className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
        >
          <span className="text-2xl">🗳️</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileVoting;
