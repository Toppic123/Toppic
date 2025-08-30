
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Users, Search, Trophy, Star } from "lucide-react";
import LocationSearchInput from "./LocationSearchInput";
import { useWinningPhotos } from "@/hooks/use-winning-photos";

interface MobileHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'vote' | 'profile') => void;
}

// Function to clean contest titles by removing "FOTOGRAFIA" and similar words
const cleanContestTitle = (title: string): string => {
  if (!title) return 'Sin título';
  
  // Remove "FOTOGRAFIA", "FOTOGRAFÍA", "DE FOTOGRAFIA", etc. (case insensitive)
  const cleanedTitle = title
    .replace(/\b(de\s+)?fotograf[íi]a\b/gi, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return cleanedTitle || 'Sin título';
};

const MobileHome = ({ onNavigate }: MobileHomeProps) => {
  const [location, setLocation] = useState("Barcelona, España");
  const [searchQuery, setSearchQuery] = useState("");
  const { photos: winningPhotos, loading: isLoadingWinning } = useWinningPhotos();

  const featuredContests = [
    {
      id: "1",
      title: cleanContestTitle("Primavera en Barcelona"),
      location: "Barcelona",
      participants: 45,
      timeLeft: "5 días",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400"
    },
    {
      id: "2", 
      title: cleanContestTitle("Arquitectura Moderna"),
      location: "Madrid",
      participants: 32,
      timeLeft: "12 días",
      image: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=400"
    }
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">¡Hola!</h1>
            <div className="flex items-center text-sm opacity-90">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('profile')}
          >
            👤
          </Button>
        </div>

        {/* Search */}
        <LocationSearchInput 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar concursos..."
        />
      </div>

      <div className="p-4 space-y-6">
        {/* Winning Photos Gallery */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Fotos Ganadoras
            </h2>
          </div>
          
          {isLoadingWinning ? (
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="w-full h-32 bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {winningPhotos.slice(0, 4).map((photo) => (
                <div key={photo.id} className="relative rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={photo.imageUrl || photo.image_url}
                    alt={cleanContestTitle(photo.title)}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-sm font-medium truncate">{cleanContestTitle(photo.title)}</h3>
                    <p className="text-white/80 text-xs truncate">{photo.photographer || photo.photographer_name}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {winningPhotos.length > 4 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => onNavigate('contests')}
            >
              Ver todas las fotos ganadoras
            </Button>
          )}
        </section>

        {/* Featured Contests */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Concursos Destacados</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('contests')}
            >
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-3">
            {featuredContests.map((contest) => (
              <div key={contest.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex gap-3">
                  <img 
                    src={contest.image}
                    alt={contest.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{contest.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{contest.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={12} className="mr-1" />
                        <span>{contest.participants} participantes</span>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {contest.timeLeft}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => onNavigate('contests')}
              className="h-20 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center"
            >
              <Search className="h-6 w-6 mb-1" />
              <span>Explorar</span>
            </Button>
            <Button 
              onClick={() => onNavigate('upload')}
              className="h-20 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center"
            >
              📷
              <span className="mt-1">Subir Foto</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MobileHome;
