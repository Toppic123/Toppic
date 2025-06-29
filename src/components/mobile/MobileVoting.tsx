
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, MessageCircle, Trophy, Users, Vote, Heart } from "lucide-react";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import MobilePhotoDetail from "./MobilePhotoDetail";
import ContestAdBanner from "./ContestAdBanner";

interface MobileVotingProps {
  onNavigate: (screen: 'contests' | 'upload' | 'vote' | 'profile') => void;
  contestId?: string;
}

const MobileVoting = ({ onNavigate, contestId = "1" }: MobileVotingProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  
  // Fetch real photos from the database
  const { approvedPhotos, isLoading, votePhoto } = useContestPhotos(contestId);

  const handlePhotoClick = (photo: any) => {
    const formattedPhoto = {
      id: photo.id,
      url: photo.image_url,
      author: photo.photographer_name,
      description: photo.description || "Sin descripción",
      likes: photo.votes
    };
    setSelectedPhoto(formattedPhoto);
  };

  const handleVotePhoto = async (photoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await votePhoto(photoId);
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
          <h1 className="text-lg font-semibold">Concurso de Fotos</h1>
          <div></div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{approvedPhotos.length} participantes</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={16} />
              <span>Premio: 500€</span>
            </div>
          </div>
          <Badge className="bg-green-500 text-white">Activo</Badge>
        </div>

        {/* Vote Button */}
        <Button 
          onClick={() => onNavigate('vote')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Vote className="mr-2 h-4 w-4" />
          Votar fotografías
        </Button>
      </div>

      {/* Advertisement Banner */}
      <ContestAdBanner />

      {/* Photo Grid - Two photos horizontally */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando fotos...</p>
          </div>
        ) : approvedPhotos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {approvedPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={photo.image_url} 
                    alt={photo.description || "Foto del concurso"}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handlePhotoClick(photo)}
                  />
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{photo.photographer_name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {photo.description || "Sin descripción"}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-red-500" />
                        <span>{photo.votes}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        onClick={(e) => handleVotePhoto(photo.id, e)}
                      >
                        <Heart size={12} />
                      </Button>
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No hay fotos disponibles en este concurso</p>
            <Button onClick={() => onNavigate('upload')} className="bg-blue-600 hover:bg-blue-700">
              Subir primera foto
            </Button>
          </div>
        )}
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
          <Vote className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default MobileVoting;
