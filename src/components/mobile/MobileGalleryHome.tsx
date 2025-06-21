
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Camera, Search } from "lucide-react";
import MobilePhotoDetail from "./MobilePhotoDetail";
import { useFeaturedGallery } from "@/hooks/useFeaturedGallery";

interface MobileGalleryHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'profile') => void;
}

const MobileGalleryHome = ({ onNavigate }: MobileGalleryHomeProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const { featuredPhotos, isLoading } = useFeaturedGallery();

  const handlePhotoClick = (featuredPhoto: any) => {
    // Transform featured photo to match expected format
    const photo = {
      id: featuredPhoto.id,
      url: featuredPhoto.contest_photos?.image_url,
      author: featuredPhoto.contest_photos?.photographer_name,
      contest: featuredPhoto.title,
      likes: 0, // This would come from votes if we join the data
      comments: 0,
      isRecent: true,
      description: featuredPhoto.description || featuredPhoto.title
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
        <p className="text-sm text-gray-600 mt-1">Las mejores fotos premiadas</p>
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
            {featuredPhotos.map((featuredPhoto) => (
              <div key={featuredPhoto.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={featuredPhoto.contest_photos?.image_url} 
                    alt={featuredPhoto.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handlePhotoClick(featuredPhoto)}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      Destacada
                    </Badge>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1">
                    {featuredPhoto.contest_photos?.photographer_name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{featuredPhoto.title}</p>
                  
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
