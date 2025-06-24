
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Users, Search, Trophy, Star, LogIn } from "lucide-react";
import LocationSearchInput from "./LocationSearchInput";
import { winningPhotos } from "@/components/home/WinningPhotosData";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface MobileHomeProps {
  onNavigate: (screen: 'contests' | 'upload' | 'vote' | 'profile' | 'login') => void;
}

const MobileHome = ({ onNavigate }: MobileHomeProps) => {
  const [location, setLocation] = useState("Barcelona, España");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const featuredContests = [
    {
      id: "1",
      title: "Primavera en Barcelona",
      location: "Barcelona",
      participants: 45,
      timeLeft: "5 días",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400"
    },
    {
      id: "2", 
      title: "Arquitectura Moderna",
      location: "Madrid",
      participants: 32,
      timeLeft: "12 días",
      image: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=400"
    }
  ];

  if (loading) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  // Show login screen if user is not authenticated
  if (!user) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white p-6">
        <div className="text-center mb-8">
          <div className="bg-white/20 rounded-full p-4 mb-4 inline-block">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a PhotoContest!</h1>
          <p className="text-white/90 mb-6">
            Descubre concursos de fotografía, vota por las mejores fotos y gana premios increíbles.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => onNavigate('login')}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3 font-semibold"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Iniciar Sesión
          </Button>
          
          <Button 
            onClick={() => onNavigate('contests')}
            variant="outline"
            className="w-full border-white text-white hover:bg-white/10 py-3"
          >
            <Search className="mr-2 h-5 w-5" />
            Explorar sin registrarse
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm mb-2">¿Por qué registrarse?</p>
          <div className="space-y-1 text-white/80 text-xs">
            <p>• Participa en concursos</p>
            <p>• Vota por tus fotos favoritas</p>
            <p>• Gana premios increíbles</p>
            <p>• Conecta con otros fotógrafos</p>
          </div>
        </div>
      </div>
    );
  }

  // Show main home screen for authenticated users
  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header with gradient */}
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

      <div className="p-4 space-y-6 bg-white">
        {/* Winning Photos Gallery */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Fotos Ganadoras
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {winningPhotos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="relative rounded-lg overflow-hidden shadow-md bg-white">
                <img 
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-sm font-medium truncate">{photo.title}</h3>
                  <p className="text-white/80 text-xs truncate">{photo.photographer}</p>
                  <Badge variant="secondary" className="text-xs mt-1 bg-white/90 text-gray-800">
                    {photo.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
            ))}
          </div>
          
          {winningPhotos.length > 4 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => onNavigate('contests')}
            >
              Ver todas las fotos ganadoras
            </Button>
          )}
        </section>

        {/* Featured Contests */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Concursos Destacados</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:bg-blue-50"
              onClick={() => onNavigate('contests')}
            >
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-3">
            {featuredContests.map((contest) => (
              <div key={contest.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
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
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Acciones Rápidas</h2>
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
