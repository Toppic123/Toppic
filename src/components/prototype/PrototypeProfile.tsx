
import { motion } from "framer-motion";
import { Camera, Trophy, Star, MapPin, Calendar, Settings, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PrototypeProfile = () => {
  const userStats = {
    name: "María González",
    username: "@maria_photo",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    location: "Barcelona, España",
    joinDate: "Enero 2023",
    totalPhotos: 47,
    contestsWon: 8,
    totalLikes: 2849,
    followers: 234,
    following: 189
  };

  const userPhotos = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Atardecer en la montaña",
      likes: 156,
      contest: "Paisajes Naturales",
      status: "winner"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      title: "Reflejos de la ciudad",
      likes: 89,
      contest: "Fotografía Urbana",
      status: "participant"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1576377999785-cf30a129e0da",
      title: "Retrato espontáneo",
      likes: 203,
      contest: "Retratos Humanos",
      status: "winner"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      title: "Festival de música",
      likes: 134,
      contest: "Eventos Culturales",
      status: "participant"
    }
  ];

  const achievements = [
    { title: "Primera Foto Subida", icon: Camera, color: "from-blue-500 to-cyan-500", completed: true },
    { title: "Primer Concurso Ganado", icon: Trophy, color: "from-amber-500 to-yellow-500", completed: true },
    { title: "100 Me Gusta", icon: Star, color: "from-pink-500 to-rose-500", completed: true },
    { title: "10 Concursos Participados", icon: Camera, color: "from-purple-500 to-violet-500", completed: false }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header del perfil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userStats.avatar} alt={userStats.name} />
              <AvatarFallback>{userStats.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-[#4891AA]">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{userStats.name}</h1>
            <p className="text-gray-600 text-lg mb-2">{userStats.username}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {userStats.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Miembro desde {userStats.joinDate}
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="border-[#4891AA] text-[#4891AA] hover:bg-[#4891AA]/10">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4891AA]">{userStats.totalPhotos}</div>
            <div className="text-sm text-gray-600">Fotos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4891AA]">{userStats.contestsWon}</div>
            <div className="text-sm text-gray-600">Victorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4891AA]">{userStats.totalLikes}</div>
            <div className="text-sm text-gray-600">Me Gusta</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4891AA]">{userStats.followers}</div>
            <div className="text-sm text-gray-600">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4891AA]">{userStats.following}</div>
            <div className="text-sm text-gray-600">Siguiendo</div>
          </div>
        </div>
      </motion.div>

      {/* Contenido con pestañas */}
      <Tabs defaultValue="photos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="photos">Mis Fotos</TabsTrigger>
          <TabsTrigger value="contests">Concursos</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        {/* Pestaña de fotos */}
        <TabsContent value="photos">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {userPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${photo.imageUrl}?auto=format&fit=crop&w=600&q=80`}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {photo.status === "winner" && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                          <Trophy className="h-3 w-3 mr-1" />
                          Ganadora
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">{photo.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{photo.contest}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{photo.likes} me gusta</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Ver detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Pestaña de concursos */}
        <TabsContent value="contests">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Concursos Activos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Festival de Primavera Barcelona</p>
                    <p className="text-sm text-gray-600">Termina en 5 días</p>
                  </div>
                  <Badge>Participando</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Street Photography Madrid</p>
                    <p className="text-sm text-gray-600">Termina en 12 días</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Historial de Concursos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Paisajes Naturales 2024</p>
                    <p className="text-sm text-gray-600">Finalizado hace 2 semanas</p>
                  </div>
                  <Badge className="bg-amber-500">1er Lugar</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Retratos Humanos Valencia</p>
                    <p className="text-sm text-gray-600">Finalizado hace 1 mes</p>
                  </div>
                  <Badge className="bg-amber-500">1er Lugar</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Pestaña de logros */}
        <TabsContent value="achievements">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`p-6 ${achievement.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center ${!achievement.completed && 'grayscale'}`}>
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${achievement.completed ? 'text-green-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.completed ? 'text-green-600' : 'text-gray-500'}`}>
                        {achievement.completed ? 'Completado' : 'En progreso'}
                      </p>
                    </div>
                    {achievement.completed && (
                      <Badge className="bg-green-500">✓</Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrototypeProfile;
