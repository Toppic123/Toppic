
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileEloVotingProps {
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
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    photographer: "David Martín",
    title: "Bosque primaveral",
    contest: "Naturaleza Salvaje",
    rating: 1190
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
    photographer: "Laura Sánchez",
    title: "Tulipanes en flor",
    contest: "Primavera en Barcelona",
    rating: 1210
  }
];

const MobileEloVoting = ({ onNavigate }: MobileEloVotingProps) => {
  const { toast } = useToast();
  const [currentPair, setCurrentPair] = useState([0, 1]);
  const [votes, setVotes] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedSide, setDraggedSide] = useState<'left' | 'right' | null>(null);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const leftPhoto = mockVotingPhotos[currentPair[0]];
  const rightPhoto = mockVotingPhotos[currentPair[1]];

  const getNextPair = () => {
    const availablePhotos = mockVotingPhotos.length;
    let newLeft, newRight;
    
    do {
      newLeft = Math.floor(Math.random() * availablePhotos);
      newRight = Math.floor(Math.random() * availablePhotos);
    } while (newLeft === newRight);
    
    return [newLeft, newRight];
  };

  const handleVote = useCallback((preferredSide: 'left' | 'right') => {
    const winner = preferredSide === 'left' ? leftPhoto : rightPhoto;
    const loser = preferredSide === 'left' ? rightPhoto : leftPhoto;
    
    toast({
      title: "Voto registrado",
      description: `Elegiste: "${winner.title}" sobre "${loser.title}"`
    });
    
    setVotes(votes + 1);
    setSwipeDirection(null);
    setSwipeDistance(0);
    setDraggedSide(null);
    
    // Generate new pair
    const newPair = getNextPair();
    setCurrentPair(newPair);
    
    if (votes > 0 && votes % 10 === 0) {
      toast({
        title: "¡Buen trabajo!",
        description: `Has votado ${votes + 1} comparaciones. Gracias por participar.`
      });
    }
  }, [leftPhoto, rightPhoto, votes, toast]);

  const handleTouchStart = useCallback((e: React.TouchEvent, side: 'left' | 'right') => {
    setIsDragging(true);
    setDraggedSide(side);
    startX.current = e.touches[0].clientX;
    setSwipeDirection(null);
    setSwipeDistance(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !draggedSide) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX.current;
    const maxSwipe = 150;
    const normalizedDistance = Math.min(Math.abs(deltaX), maxSwipe);
    
    setSwipeDistance(normalizedDistance);
    
    if (deltaX > 20) {
      setSwipeDirection('right');
    } else {
      setSwipeDirection(null);
    }
  }, [isDragging, draggedSide]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !draggedSide) return;
    
    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - startX.current;
    const threshold = 80;
    
    if (deltaX > threshold) {
      // Swipe right means this photo is preferred
      handleVote(draggedSide);
    } else {
      // Reset if swipe wasn't far enough
      setSwipeDirection(null);
      setSwipeDistance(0);
    }
    
    setIsDragging(false);
    setDraggedSide(null);
  }, [isDragging, draggedSide, handleVote]);

  const getSwipeOpacity = () => {
    return Math.min(swipeDistance / 100, 0.8);
  };

  const getSwipeTransform = (side: 'left' | 'right') => {
    if (draggedSide !== side) return 'none';
    
    if (swipeDirection === 'right') {
      return `translateX(${swipeDistance}px) scale(${1 + swipeDistance / 300})`;
    }
    return 'none';
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
            <h1 className="text-lg font-semibold text-gray-900">Votación ELO</h1>
            <p className="text-sm text-gray-500">{votes} comparaciones</p>
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

      {/* Instructions */}
      <div className="bg-blue-50 p-3 border-b border-blue-100">
        <p className="text-sm text-blue-800 text-center">
          Desliza hacia la derecha → la foto que prefieras
        </p>
      </div>

      {/* Split Screen Photos */}
      <div 
        ref={containerRef}
        className="flex-1 flex"
      >
        {/* Left Photo */}
        <div 
          className="flex-1 relative bg-gray-100 border-r-2 border-gray-300"
          onTouchStart={(e) => handleTouchStart(e, 'left')}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: getSwipeTransform('left'),
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Vote Indicator */}
          {draggedSide === 'left' && swipeDirection === 'right' && (
            <div 
              className="absolute top-4 left-4 z-20 bg-green-500 text-white px-3 py-2 rounded-full font-bold text-sm transform rotate-12"
              style={{ opacity: getSwipeOpacity() }}
            >
              ✓ ELEGIDA
            </div>
          )}
          
          <img
            src={leftPhoto.image}
            alt={leftPhoto.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <Badge className="mb-2 text-xs bg-blue-100 text-blue-800 border-blue-200">
              {leftPhoto.contest}
            </Badge>
            <h3 className="text-white font-semibold text-sm mb-1">{leftPhoto.title}</h3>
            <p className="text-white/90 text-xs mb-1">por {leftPhoto.photographer}</p>
            <div className="text-white/80 text-xs">
              ELO: {leftPhoto.rating}
            </div>
          </div>
        </div>

        {/* Right Photo */}
        <div 
          className="flex-1 relative bg-gray-100"
          onTouchStart={(e) => handleTouchStart(e, 'right')}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: getSwipeTransform('right'),
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Vote Indicator */}
          {draggedSide === 'right' && swipeDirection === 'right' && (
            <div 
              className="absolute top-4 right-4 z-20 bg-green-500 text-white px-3 py-2 rounded-full font-bold text-sm transform -rotate-12"
              style={{ opacity: getSwipeOpacity() }}
            >
              ✓ ELEGIDA
            </div>
          )}
          
          <img
            src={rightPhoto.image}
            alt={rightPhoto.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <Badge className="mb-2 text-xs bg-blue-100 text-blue-800 border-blue-200">
              {rightPhoto.contest}
            </Badge>
            <h3 className="text-white font-semibold text-sm mb-1">{rightPhoto.title}</h3>
            <p className="text-white/90 text-xs mb-1">por {rightPhoto.photographer}</p>
            <div className="text-white/80 text-xs">
              ELO: {rightPhoto.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-4 mb-3">
          <Button
            onClick={() => handleVote('left')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            disabled={isDragging}
          >
            Izquierda
          </Button>
          
          <Button
            onClick={() => handleVote('right')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            disabled={isDragging}
          >
            Derecha
          </Button>
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPair = getNextPair();
              setCurrentPair(newPair);
              setSwipeDirection(null);
              setSwipeDistance(0);
              setDraggedSide(null);
            }}
            className="text-gray-600 border-gray-300"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Omitir comparación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileEloVoting;
