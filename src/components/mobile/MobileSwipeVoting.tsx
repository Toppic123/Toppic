
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Heart, RotateCcw, X } from "lucide-react";
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
  const [votes, setVotes] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentPhoto = mockVotingPhotos[currentPhotoIndex];

  const handleVote = useCallback((liked: boolean) => {
    const action = liked ? "Me gusta" : "No me gusta";
    setSwipeDirection(liked ? 'right' : 'left');
    
    setTimeout(() => {
      toast({
        title: "Voto registrado",
        description: `${action}: "${currentPhoto.title}"`
      });
      
      setVotes(votes + 1);
      setSwipeDirection(null);
      setSwipeDistance(0);
      
      if (currentPhotoIndex < mockVotingPhotos.length - 1) {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      } else {
        setCurrentPhotoIndex(0);
        toast({
          title: "¡Votación completada!",
          description: `Has votado ${votes + 1} fotos. Gracias por participar.`
        });
      }
    }, 300);
  }, [currentPhotoIndex, currentPhoto, votes, toast]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    setSwipeDirection(null);
    setSwipeDistance(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX.current;
    const maxSwipe = 150;
    const normalizedDistance = Math.min(Math.abs(deltaX), maxSwipe);
    
    setSwipeDistance(normalizedDistance);
    
    if (deltaX > 20) {
      setSwipeDirection('right');
    } else if (deltaX < -20) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - startX.current;
    const threshold = 80;
    
    if (Math.abs(deltaX) > threshold) {
      handleVote(deltaX > 0); // Right swipe = like, left swipe = dislike
    } else {
      // No se completó el deslizamiento, resetear
      setSwipeDirection(null);
      setSwipeDistance(0);
    }
    
    setIsDragging(false);
  }, [isDragging, handleVote]);

  if (!currentPhoto) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No hay más fotos para votar</p>
          <Button onClick={() => onNavigate('contests')} className="bg-blue-600 hover:bg-blue-700">
            Volver a concursos
          </Button>
        </div>
      </div>
    );
  }

  const getSwipeOpacity = () => {
    return Math.min(swipeDistance / 100, 0.8);
  };

  return (
    <div className="h-full bg-white overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Votación</h1>
            <p className="text-sm text-gray-500">{votes} votos • {currentPhotoIndex + 1}/{mockVotingPhotos.length}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Photo Card */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div 
          ref={cardRef}
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: swipeDirection ? `translateX(${swipeDirection === 'right' ? swipeDistance : -swipeDistance}px) rotate(${swipeDirection === 'right' ? swipeDistance / 10 : -swipeDistance / 10}deg)` : 'none',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Like/Dislike Indicators */}
          {swipeDirection === 'right' && (
            <div 
              className="absolute top-8 left-8 z-20 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12"
              style={{ opacity: getSwipeOpacity() }}
            >
              ❤️ ME GUSTA
            </div>
          )}
          
          {swipeDirection === 'left' && (
            <div 
              className="absolute top-8 right-8 z-20 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform -rotate-12"
              style={{ opacity: getSwipeOpacity() }}
            >
              ❌ NO ME GUSTA
            </div>
          )}
          
          <img
            src={currentPhoto.image}
            alt={currentPhoto.title}
            className="w-full h-96 object-cover"
            draggable={false}
          />
          
          <div className="p-4 bg-white">
            <Badge className="mb-2 text-xs bg-blue-100 text-blue-800 border-blue-200">
              {currentPhoto.contest}
            </Badge>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{currentPhoto.title}</h3>
            <p className="text-gray-600 text-sm">por {currentPhoto.photographer}</p>
            <div className="text-xs text-gray-500 mt-2">
              Rating ELO: {currentPhoto.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex justify-center space-x-8 mb-4">
          <Button
            onClick={() => handleVote(false)}
            className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            disabled={isDragging}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={() => handleVote(true)}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white"
            disabled={isDragging}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Desliza → para Me Gusta, ← para No Me Gusta
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSwipeDirection(null);
              setSwipeDistance(0);
            }}
            className="text-gray-600 border-gray-300"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileSwipeVoting;
