
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Heart, RotateCcw } from "lucide-react";
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
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    photographer: "Sofia Chen",
    title: "Refugio en la montaña",
    contest: "Arquitectura Rural",
    rating: 1100
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1544737151500-6e4b999de2a9?w=400",
    photographer: "Roberto Silva",
    title: "Reflejos urbanos",
    contest: "Ciudad Nocturna",
    rating: 1250
  }
];

const MobileSwipeVoting = ({ onNavigate }: MobileSwipeVotingProps) => {
  const { toast } = useToast();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [votes, setVotes] = useState(0);
  const [leftSwipeOffset, setLeftSwipeOffset] = useState(0);
  const [rightSwipeOffset, setRightSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [votedPhoto, setVotedPhoto] = useState<number | null>(null);

  const createPhotoPairs = () => {
    const pairs = [];
    for (let i = 0; i < mockVotingPhotos.length - 1; i += 2) {
      if (mockVotingPhotos[i + 1]) {
        pairs.push([mockVotingPhotos[i], mockVotingPhotos[i + 1]]);
      }
    }
    return pairs;
  };

  const photoPairs = createPhotoPairs();
  const currentPair = photoPairs[currentPairIndex];

  const handleVote = useCallback((selectedPhoto: VotingPhoto, rejectedPhoto: VotingPhoto) => {
    setVotedPhoto(selectedPhoto.id);
    
    setTimeout(() => {
      toast({
        title: "Voto registrado",
        description: `Has elegido "${selectedPhoto.title}"`
      });
      
      setVotes(votes + 1);
      setLeftSwipeOffset(0);
      setRightSwipeOffset(0);
      setVotedPhoto(null);
      
      if (currentPairIndex < photoPairs.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
      } else {
        setCurrentPairIndex(0);
        toast({
          title: "¡Votación completada!",
          description: `Has votado ${votes + 1} comparaciones. Gracias por participar.`
        });
      }
    }, 800);
  }, [currentPairIndex, photoPairs.length, votes, toast]);

  const handleTouchStart = useCallback((e: React.TouchEvent, side: 'left' | 'right') => {
    setIsDragging(true);
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - startX;
      
      if (side === 'left' && deltaX > 0) {
        setLeftSwipeOffset(Math.min(deltaX, 100));
      } else if (side === 'right' && deltaX > 0) {
        setRightSwipeOffset(Math.min(deltaX, 100));
      }
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      
      if (side === 'left' && leftSwipeOffset > 50) {
        handleVote(currentPair[0], currentPair[1]);
      } else if (side === 'right' && rightSwipeOffset > 50) {
        handleVote(currentPair[1], currentPair[0]);
      } else {
        setLeftSwipeOffset(0);
        setRightSwipeOffset(0);
      }
      
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [leftSwipeOffset, rightSwipeOffset, currentPair, handleVote]);

  if (!currentPair) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No hay más fotos para comparar</p>
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
            <h1 className="text-lg font-semibold">Votación Comparativa</h1>
            <p className="text-sm opacity-80">{votes} votos • {currentPairIndex + 1}/{photoPairs.length}</p>
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

      {/* Photos Container - Horizontal Layout */}
      <div className="flex h-full pt-20 pb-24">
        {/* Left Photo */}
        <div 
          className="flex-1 relative overflow-hidden"
          style={{ 
            transform: `translateX(${leftSwipeOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onTouchStart={(e) => handleTouchStart(e, 'left')}
          onClick={() => handleVote(currentPair[0], currentPair[1])}
        >
          {/* Swipe Indicator */}
          {(leftSwipeOffset > 0 || votedPhoto === currentPair[0].id) && (
            <div 
              className="absolute inset-0 bg-green-500/30 z-10 flex items-center justify-center"
              style={{ opacity: votedPhoto === currentPair[0].id ? 1 : leftSwipeOffset / 100 }}
            >
              <div className="bg-green-500 rounded-full p-4 animate-pulse">
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
            </div>
          )}
          
          <img
            src={currentPair[0].image}
            alt={currentPair[0].title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
            <Badge className="mb-2 text-xs bg-white/20 text-white border-white/30">
              {currentPair[0].contest}
            </Badge>
            <h3 className="text-lg font-semibold mb-1">{currentPair[0].title}</h3>
            <p className="text-sm opacity-90">por {currentPair[0].photographer}</p>
            <div className="text-xs opacity-75 mt-1">
              Rating ELO: {currentPair[0].rating}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-1 bg-white/30 flex-shrink-0"></div>

        {/* Right Photo */}
        <div 
          className="flex-1 relative overflow-hidden"
          style={{ 
            transform: `translateX(${rightSwipeOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onTouchStart={(e) => handleTouchStart(e, 'right')}
          onClick={() => handleVote(currentPair[1], currentPair[0])}
        >
          {/* Swipe Indicator */}
          {(rightSwipeOffset > 0 || votedPhoto === currentPair[1].id) && (
            <div 
              className="absolute inset-0 bg-green-500/30 z-10 flex items-center justify-center"
              style={{ opacity: votedPhoto === currentPair[1].id ? 1 : rightSwipeOffset / 100 }}
            >
              <div className="bg-green-500 rounded-full p-4 animate-pulse">
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
            </div>
          )}
          
          <img
            src={currentPair[1].image}
            alt={currentPair[1].title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
            <Badge className="mb-2 text-xs bg-white/20 text-white border-white/30">
              {currentPair[1].contest}
            </Badge>
            <h3 className="text-lg font-semibold mb-1">{currentPair[1].title}</h3>
            <p className="text-sm opacity-90">por {currentPair[1].photographer}</p>
            <div className="text-xs opacity-75 mt-1">
              Rating ELO: {currentPair[1].rating}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <div className="text-center space-y-3">
          <p className="text-lg font-medium">¿Cuál te gusta más?</p>
          <p className="text-sm opacity-80">Desliza hacia la derecha la foto que prefieras o toca para elegir</p>
          
          {/* Reset Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLeftSwipeOffset(0);
                setRightSwipeOffset(0);
              }}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSwipeVoting;
