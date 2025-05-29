
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileSwipeVotingProps {
  onNavigate: (screen: 'contests' | 'home') => void;
}

interface VotingPhoto {
  id: number;
  image: string;
  photographer: string;
  title: string;
  contest: string;
  rating: number;
}

const mockVotingPhotos: VotingPhoto[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    photographer: "María López",
    title: "Flores de primavera",
    contest: "Primavera en Barcelona",
    rating: 1200
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    photographer: "Carlos Ruiz",
    title: "Geometría urbana",
    contest: "Arquitectura Urbana",
    rating: 1180
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    photographer: "Ana García",
    title: "Atardecer dorado",
    contest: "Vida en la Playa",
    rating: 1150
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    photographer: "Luis Martín",
    title: "Bosque misterioso",
    contest: "Naturaleza Salvaje",
    rating: 1220
  }
];

const MobileSwipeVoting = ({ onNavigate }: MobileSwipeVotingProps) => {
  const { toast } = useToast();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [votes, setVotes] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentPhoto = mockVotingPhotos[currentPhotoIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const offset = touch.clientX - centerX;
    
    setDragOffset(Math.max(-150, Math.min(150, offset)));
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset) > 80) {
      const isLike = dragOffset > 0;
      handleVote(isLike);
    }
    
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleVote = (isLike: boolean) => {
    const action = isLike ? "Me gusta" : "No me gusta";
    toast({
      title: `${action} registrado`,
      description: `Has votado ${isLike ? "a favor" : "en contra"} de esta foto`
    });
    
    setVotes(votes + 1);
    
    // Move to next photo
    if (currentPhotoIndex < mockVotingPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else {
      // Reset to first photo or show completion message
      setCurrentPhotoIndex(0);
      toast({
        title: "¡Votación completada!",
        description: `Has votado ${votes + 1} fotos. Gracias por participar.`
      });
    }
  };

  const getCardStyle = () => {
    if (!isDragging && dragOffset === 0) return {};
    
    const rotation = dragOffset * 0.1;
    const opacity = 1 - Math.abs(dragOffset) * 0.003;
    
    return {
      transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
      opacity
    };
  };

  const getOverlayColor = () => {
    if (Math.abs(dragOffset) < 30) return 'transparent';
    return dragOffset > 0 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
  };

  if (!currentPhoto) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No hay más fotos para votar</p>
          <Button onClick={() => onNavigate('contests')}>
            Volver a concursos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Votación ELO</h1>
            <p className="text-sm opacity-80">{votes} votos realizados</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/20 p-2"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Photo Card */}
      <div className="flex items-center justify-center h-full p-4 pt-20 pb-32">
        <div
          ref={cardRef}
          className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={getCardStyle()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Overlay for swipe feedback */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            style={{ backgroundColor: getOverlayColor() }}
          >
            {Math.abs(dragOffset) > 30 && (
              <div className="text-white text-2xl font-bold">
                {dragOffset > 0 ? '❤️' : '✖️'}
              </div>
            )}
          </div>

          {/* Photo */}
          <div className="aspect-[3/4] relative">
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Photo Info */}
          <div className="p-4">
            <Badge className="mb-2 text-xs">{currentPhoto.contest}</Badge>
            <h3 className="text-lg font-semibold mb-1">{currentPhoto.title}</h3>
            <p className="text-gray-600 text-sm mb-2">por {currentPhoto.photographer}</p>
            <div className="text-xs text-gray-500">
              Rating ELO: {currentPhoto.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <div className="text-center space-y-3">
          <p className="text-sm opacity-80">Desliza para votar</p>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                <X className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs">← No me gusta</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs">Me gusta →</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVote(false)}
              className="flex-1 bg-red-500/20 border-red-500 text-white hover:bg-red-500/30"
            >
              <X className="h-4 w-4 mr-1" />
              No me gusta
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVote(true)}
              className="flex-1 bg-green-500/20 border-green-500 text-white hover:bg-green-500/30"
            >
              <Heart className="h-4 w-4 mr-1" />
              Me gusta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSwipeVoting;
