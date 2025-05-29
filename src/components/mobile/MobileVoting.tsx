
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, ArrowLeft, ArrowRight } from "lucide-react";

interface MobileVotingProps {
  onNavigate: (screen: 'contests') => void;
}

const mockPhotos = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    photographer: "María López",
    title: "Flores de primavera",
    votes: 24,
    contest: "Primavera en Barcelona"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    photographer: "Carlos Ruiz",
    title: "Geometría urbana",
    votes: 31,
    contest: "Arquitectura Urbana"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    photographer: "Ana García",
    title: "Atardecer dorado",
    votes: 18,
    contest: "Vida en la Playa"
  }
];

const MobileVoting = ({ onNavigate }: MobileVotingProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [votedPhotos, setVotedPhotos] = useState<number[]>([]);

  const currentPhoto = mockPhotos[currentPhotoIndex];

  const handleVote = () => {
    if (!votedPhotos.includes(currentPhoto.id)) {
      setVotedPhotos([...votedPhotos, currentPhoto.id]);
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % mockPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + mockPhotos.length) % mockPhotos.length);
  };

  const hasVoted = votedPhotos.includes(currentPhoto.id);

  return (
    <div className="h-full bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Votación</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </div>

      {/* Photo */}
      <div className="relative h-full">
        <img 
          src={currentPhoto.image}
          alt={currentPhoto.title}
          className="w-full h-full object-cover"
        />

        {/* Navigation */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>

        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white">
          <div className="mb-4">
            <Badge className="mb-2">{currentPhoto.contest}</Badge>
            <h3 className="text-xl font-semibold mb-1">{currentPhoto.title}</h3>
            <p className="text-white/80">por {currentPhoto.photographer}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVote}
                className={`text-white hover:bg-white/20 ${hasVoted ? 'text-red-400' : ''}`}
              >
                <Heart className={`h-5 w-5 mr-1 ${hasVoted ? 'fill-current' : ''}`} />
                {currentPhoto.votes + (hasVoted ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MessageCircle className="h-5 w-5 mr-1" />
                Comentar
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-white/60 text-sm">
              {currentPhotoIndex + 1} de {mockPhotos.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVoting;
