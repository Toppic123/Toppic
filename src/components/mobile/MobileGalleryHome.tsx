
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Camera, Search } from "lucide-react";
import MobilePhotoDetail from "./MobilePhotoDetail";

interface MobileGalleryHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'profile') => void;
}

// Mock photos data managed by admin
const featuredPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
    author: "María García",
    contest: "Primavera en Barcelona",
    likes: 145,
    comments: 23,
    isRecent: true,
    description: "Una hermosa vista de los jardines primaverales de Barcelona con flores coloridas"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=600",
    author: "Carlos López",
    contest: "Flores Urbanas",
    likes: 98,
    comments: 15,
    isRecent: true,
    description: "Flores silvestres creciendo entre el concreto de la ciudad"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    author: "Ana Rodríguez",
    contest: "Naturaleza Pura",
    likes: 167,
    comments: 31,
    isRecent: false,
    description: "Paisaje natural preservado en su estado más puro"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    author: "David Martín",
    contest: "Bosques Mágicos",
    likes: 123,
    comments: 18,
    isRecent: true,
    description: "Un sendero misterioso a través del bosque encantado"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600",
    author: "Laura Sánchez",
    contest: "Aventura Natural",
    likes: 89,
    comments: 12,
    isRecent: false,
    description: "Aventura en la naturaleza salvaje y montañosa"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    author: "Roberto Jiménez",
    contest: "Atardeceres Únicos",
    likes: 201,
    comments: 28,
    isRecent: true,
    description: "Un atardecer espectacular sobre el horizonte"
  }
];

const MobileGalleryHome = ({ onNavigate }: MobileGalleryHomeProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof featuredPhotos[0] | null>(null);

  const handlePhotoClick = (photo: typeof featuredPhotos[0]) => {
    setSelectedPhoto(photo);
  };

  const handleBackFromDetail = () => {
    setSelectedPhoto(null);
  };

  // Si hay una foto seleccionada, mostrar el detalle
  if (selectedPhoto) {
    return (
      <MobilePhotoDetail 
        photo={selectedPhoto}
        onBack={handleBackFromDetail}
      />
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">TOP PICS</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Las mejores fotos premiadas de nuestros concursos</p>
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
                  onClick={() => handlePhotoClick(photo)}
                />
                {photo.isRecent && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      Reciente
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1">{photo.author}</h3>
                <p className="text-xs text-gray-600 mb-2">{photo.contest}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageCircle size={12} />
                    <span>{photo.comments}</span>
                  </div>
                  <span className="text-xs text-gray-400">Toca para ver</span>
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
    </div>
  );
};

export default MobileGalleryHome;
