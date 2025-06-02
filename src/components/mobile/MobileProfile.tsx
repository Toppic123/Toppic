
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Camera, Trophy, Users, Calendar, MapPin } from "lucide-react";

interface MobileProfileProps {
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'vote' | 'settings') => void;
}

const userStats = {
  name: "María García",
  username: "@maria_photos",
  contestsWon: 3,
  contestsParticipated: 12,
  totalPhotos: 28,
  totalLikes: 1240,
  location: "Barcelona, España",
  memberSince: "Marzo 2024"
};

const userPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300",
    contest: "Primavera en Barcelona",
    likes: 45,
    position: "1º"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1464822759844-d150baec81f2?w=300",
    contest: "Flores Urbanas",
    likes: 38,
    position: "3º"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300",
    contest: "Naturaleza Pura",
    likes: 52,
    position: "1º"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
    contest: "Bosques Mágicos",
    likes: 41,
    position: "2º"
  }
];

const userContests = [
  {
    id: 1,
    title: "Primavera en Barcelona",
    status: "Ganador",
    date: "Abril 2024",
    prize: "500€"
  },
  {
    id: 2,
    title: "Arquitectura Urbana",
    status: "Participante",
    date: "Marzo 2024",
    prize: "300€"
  },
  {
    id: 3,
    title: "Naturaleza Pura",
    status: "Ganador",
    date: "Febrero 2024",
    prize: "750€"
  }
];

const MobileProfile = ({ onNavigate }: MobileProfileProps) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'contests'>('photos');

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Mi Perfil</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {userStats.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{userStats.name}</h2>
          <p className="text-gray-600">{userStats.username}</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
            <MapPin size={14} />
            <span>{userStats.location}</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1 text-sm text-gray-500">
            <Calendar size={14} />
            <span>Miembro desde {userStats.memberSince}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.contestsWon}</div>
            <div className="text-sm text-gray-600">Concursos Ganados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.contestsParticipated}</div>
            <div className="text-sm text-gray-600">Participaciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.totalPhotos}</div>
            <div className="text-sm text-gray-600">Fotos Subidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{userStats.totalLikes}</div>
            <div className="text-sm text-gray-600">Me Gusta</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mx-4 mt-6">
        <div className="flex bg-white rounded-lg shadow-sm p-1">
          <Button
            variant={activeTab === 'photos' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('photos')}
            className="flex-1"
            size="sm"
          >
            <Camera size={16} className="mr-2" />
            Mis Fotos
          </Button>
          <Button
            variant={activeTab === 'contests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('contests')}
            className="flex-1"
            size="sm"
          >
            <Trophy size={16} className="mr-2" />
            Concursos
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 gap-3">
            {userPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={photo.url} 
                    alt={photo.contest}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge 
                      className={`text-xs ${
                        photo.position === "1º" ? "bg-yellow-500" :
                        photo.position === "2º" ? "bg-gray-400" :
                        "bg-orange-600"
                      } text-white`}
                    >
                      {photo.position}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    ❤️ {photo.likes}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900">{photo.contest}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contests' && (
          <div className="space-y-3">
            {userContests.map((contest) => (
              <div key={contest.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{contest.title}</h3>
                  <Badge 
                    className={`text-xs ${
                      contest.status === "Ganador" ? "bg-green-500" : "bg-blue-500"
                    } text-white`}
                  >
                    {contest.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{contest.date}</span>
                  <span>Premio: {contest.prize}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileProfile;
