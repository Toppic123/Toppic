
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Camera, Trophy, Heart, LogOut, Home, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "María López",
    bio: "Fotógrafa aficionada. Me encanta capturar la belleza en los momentos cotidianos.",
    location: "Barcelona, España",
    email: "maria.lopez@email.com",
    website: "www.marialopezphoto.com"
  });

  const [editingInfo, setEditingInfo] = useState(userInfo);

  const handleStartEdit = () => {
    setEditingInfo(userInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo(editingInfo);
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados correctamente"
    });
  };

  const handleCancel = () => {
    setEditingInfo(userInfo);
    setIsEditing(false);
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
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={handleStartEdit}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="text-white hover:bg-white/20 p-2"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <Input
                  value={editingInfo.name}
                  onChange={(e) => setEditingInfo({...editingInfo, name: e.target.value})}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <Textarea
                  value={editingInfo.bio}
                  onChange={(e) => setEditingInfo({...editingInfo, bio: e.target.value})}
                  placeholder="Cuéntanos sobre ti..."
                  className="w-full"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <Input
                  value={editingInfo.location}
                  onChange={(e) => setEditingInfo({...editingInfo, location: e.target.value})}
                  placeholder="Tu ubicación"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={editingInfo.email}
                  onChange={(e) => setEditingInfo({...editingInfo, email: e.target.value})}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sitio web
                </label>
                <Input
                  value={editingInfo.website}
                  onChange={(e) => setEditingInfo({...editingInfo, website: e.target.value})}
                  placeholder="Tu sitio web"
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600 mt-1">{userInfo.bio}</p>
              <p className="text-gray-500 text-sm mt-2">{userInfo.location}</p>
              {userInfo.website && (
                <p className="text-blue-600 text-sm mt-1">{userInfo.website}</p>
              )}
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

      {/* Logout */}
      <div className="bg-white mt-2 px-4 py-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar sesión
        </Button>
      </div>

      <div className="h-20" /> {/* Bottom spacing */}
    </div>
  );
};

export default MobileProfile;
