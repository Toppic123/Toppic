
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, Trophy, Camera, Star } from "lucide-react";

interface MobileProfileProps {
  onNavigate: (screen: 'contests' | 'home') => void;
  onLogout: () => void;
}

const MobileProfile = ({ onNavigate, onLogout }: MobileProfileProps) => {
  const userStats = {
    contestsWon: 3,
    photosUploaded: 24,
    totalVotes: 156,
    followers: 89,
    following: 42
  };

  const recentContests = [
    {
      id: 1,
      title: "Primavera en Barcelona",
      status: "Ganador",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100",
      prize: "500€"
    },
    {
      id: 2,
      title: "Arquitectura Urbana",
      status: "2º lugar",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100",
      prize: "200€"
    },
    {
      id: 3,
      title: "Vida en la Playa",
      status: "Participante",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100",
      prize: "-"
    }
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Perfil</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">MG</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">María García</h2>
            <p className="text-gray-600">@maria_photographer</p>
            <Badge variant="secondary" className="mt-1">
              <Star className="h-3 w-3 mr-1" />
              Fotógrafa Premium
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{userStats.contestsWon}</div>
            <div className="text-xs text-gray-600">Concursos ganados</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{userStats.photosUploaded}</div>
            <div className="text-xs text-gray-600">Fotos subidas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{userStats.totalVotes}</div>
            <div className="text-xs text-gray-600">Votos recibidos</div>
          </div>
        </div>
      </div>

      {/* Recent Contests */}
      <div className="bg-white mt-4 mx-4 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Concursos Recientes</h3>
        </div>
        <div className="space-y-1">
          {recentContests.map((contest) => (
            <div key={contest.id} className="flex items-center p-4 hover:bg-gray-50">
              <img 
                src={contest.image} 
                alt={contest.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="ml-3 flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{contest.title}</h4>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={contest.status === "Ganador" ? "default" : contest.status === "2º lugar" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {contest.status === "Ganador" && <Trophy className="h-3 w-3 mr-1" />}
                    {contest.status}
                  </Badge>
                  {contest.prize !== "-" && (
                    <span className="text-xs text-green-600 font-medium">{contest.prize}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onNavigate('contests')}
        >
          <Camera className="h-4 w-4 mr-2" />
          Ver todos mis concursos
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default MobileProfile;
