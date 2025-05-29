
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit2, Camera, Trophy, Heart, Settings, LogOut, Home, ExternalLink } from "lucide-react";

interface MobileProfileProps {
  onNavigate: (screen: 'contests' | 'home') => void;
  onLogout: () => void;
}

const mockUserPhotos = [
  "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
  "https://images.unsplash.com/photo-1582560486382-347f58937685?w=300"
];

const MobileProfile = ({ onNavigate, onLogout }: MobileProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "María López",
    bio: "Fotógrafa aficionada. Me encanta capturar la belleza en los momentos cotidianos.",
    location: "Barcelona, España"
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleOpenWebSettings = () => {
    // Abrir la versión web en una nueva ventana/pestaña
    window.open('/dashboard/settings', '_blank');
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-white">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="text-white hover:bg-white/20 p-2"
            >
              <Home className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-6 -mt-16 relative">
          <div className="flex items-end space-x-4 mb-4">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <img 
                src="https://i.pravatar.cc/150?img=1"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <Button size="sm" variant="outline" className="mb-2">
              <Camera className="h-4 w-4 mr-1" />
              Cambiar foto
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                className="font-semibold text-lg"
              />
              <Input
                value={userInfo.bio}
                onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                placeholder="Cuéntanos sobre ti..."
              />
              <Input
                value={userInfo.location}
                onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                placeholder="Tu ubicación"
              />
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="flex-1">Guardar</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600 mt-1">{userInfo.bio}</p>
              <p className="text-gray-500 text-sm mt-2">{userInfo.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-semibold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Fotos</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Concursos</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Votos</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="font-semibold text-gray-900 mb-3">Logros</h3>
        <div className="flex space-x-2">
          <Badge variant="outline" className="flex items-center">
            <Trophy className="h-3 w-3 mr-1" />
            1er lugar
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="bg-white mt-2 px-4 py-4">
        <h3 className="font-semibold text-gray-900 mb-3">Mis fotos</h3>
        <div className="grid grid-cols-2 gap-2">
          {mockUserPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Foto ${index + 1}`}
              className="aspect-square object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="space-y-3">
          <Button 
            variant="ghost" 
            className="w-full justify-between"
            onClick={handleOpenWebSettings}
          >
            <div className="flex items-center">
              <Settings className="h-4 w-4 mr-3" />
              Configuración completa
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </Button>
          <div className="text-xs text-gray-500 px-4">
            Accede a todas las opciones de configuración en la versión web
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="h-20" /> {/* Bottom spacing */}
    </div>
  );
};

export default MobileProfile;
