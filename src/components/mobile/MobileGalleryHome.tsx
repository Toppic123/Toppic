
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Camera, Search, Trophy, Star } from "lucide-react";
import MobilePhotoDetail from "./MobilePhotoDetail";
import { useWinningPhotos } from "@/hooks/use-winning-photos";

interface MobileGalleryHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'profile') => void;
}

const MobileGalleryHome = ({ onNavigate }: MobileGalleryHomeProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const { photos: winningPhotos, loading: isLoading } = useWinningPhotos();

  const handlePhotoClick = (winningPhoto: any) => {
    // Transform winning photo to match expected format
    const photo = {
      id: winningPhoto.id,
      url: winningPhoto.imageUrl || winningPhoto.image_url,
      author: winningPhoto.photographer || winningPhoto.photographer_name,
      contest: winningPhoto.contestName || 'Concurso',
      likes: winningPhoto.likes || 0,
      comments: 0,
      isRecent: true,
      description: winningPhoto.title
    };
    setSelectedPhoto(photo);
  };

  const handleBackFromDetail = () => {
    setSelectedPhoto(null);
  };

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
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">MEJORES FOTOS</h1>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">Las mejores fotografías compartidas</p>
      </div>

      {/* Photo Grid */}
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-3">
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {winningPhotos.slice(0, 8).map((winningPhoto) => (
              <div key={winningPhoto.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={winningPhoto.imageUrl || winningPhoto.image_url} 
                    alt={winningPhoto.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handlePhotoClick(winningPhoto)}
                  />
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1">
                    {winningPhoto.photographer || winningPhoto.photographer_name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{winningPhoto.title}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>0</span>
                    </div>
                    <span className="text-xs text-gray-400">Toca para ver</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
