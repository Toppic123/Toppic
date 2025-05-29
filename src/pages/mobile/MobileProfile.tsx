
import { useState } from "react";
import { Camera, Edit, Settings, LogOut, Award, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MobileProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("photos");

  // Mock user data - in real app this would come from user profile
  const userProfile = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` 
      : user?.email?.split('@')[0] || 'Usuario',
    email: user?.email || '',
    avatar: null,
    location: "Madrid, España",
    joinDate: "Enero 2024",
    stats: {
      photos: 24,
      contests: 8,
      wins: 3,
      likes: 156
    },
    photos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
        contest: "Paisajes Urbanos"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1494790108755-2616c120e87f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
        contest: "Retratos Callejeros"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
        contest: "Naturaleza Salvaje"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
        contest: "Arquitectura Moderna"
      }
    ],
    achievements: [
      {
        id: 1,
        title: "Primer Lugar",
        description: "Concurso Paisajes Urbanos",
        date: "Mayo 2024",
        icon: "🥇"
      },
      {
        id: 2,
        title: "Participante Destacado",
        description: "10 concursos completados",
        date: "Abril 2024",
        icon: "⭐"
      }
    ]
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-[#4891AA] text-white p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white">
              <AvatarImage src={userProfile.avatar || ""} />
              <AvatarFallback className="bg-white text-[#4891AA] text-xl font-bold">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 bg-white text-[#4891AA] rounded-full p-2">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">{userProfile.name}</h1>
            <p className="text-white/80">{userProfile.location}</p>
            <p className="text-white/70 text-sm">Miembro desde {userProfile.joinDate}</p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.stats.photos}</div>
            <div className="text-xs text-white/80">Fotos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.stats.contests}</div>
            <div className="text-xs text-white/80">Concursos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.stats.wins}</div>
            <div className="text-xs text-white/80">Premios</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.stats.likes}</div>
            <div className="text-xs text-white/80">Likes</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "photos"
                ? "bg-white text-[#4891AA] shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Image className="h-4 w-4 inline mr-1" />
            Fotos
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "achievements"
                ? "bg-white text-[#4891AA] shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Award className="h-4 w-4 inline mr-1" />
            Logros
          </button>
        </div>

        {/* Content */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-2 gap-3">
            {userProfile.photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={`Foto ${photo.id}`}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <CardContent className="p-2">
                  <p className="text-xs text-gray-600 truncate">{photo.contest}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            {userProfile.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center border-[#4891AA] text-[#4891AA] hover:bg-[#4891AA] hover:text-white"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full flex items-center justify-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfile;
