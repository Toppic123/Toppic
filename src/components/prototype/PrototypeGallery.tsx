
import { motion } from "framer-motion";
import { Heart, Share2, Trophy, User, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PrototypeGallery = () => {
  const mockPhotos = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Valle del Amanecer",
      photographer: "Carlos Montoya",
      photographerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      contestName: "Paisajes Naturales 2024",
      likes: 542,
      category: "Naturaleza",
      position: 1
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      title: "Reflejos Urbanos",
      photographer: "María Sánchez",
      photographerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      contestName: "Fotografía Urbana",
      likes: 478,
      category: "Urbana",
      position: 2
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1576377999785-cf30a129e0da",
      title: "Conexión Humana",
      photographer: "Javier Rodríguez",
      photographerAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      contestName: "Retratos 2024",
      likes: 396,
      category: "Retrato",
      position: 3
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      title: "Concierto en el Parque",
      photographer: "Ana Martín",
      photographerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      contestName: "Eventos Culturales",
      likes: 412,
      category: "Eventos"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a",
      title: "El Gato Curioso",
      photographer: "Elena Torres",
      photographerAvatar: "https://randomuser.me/api/portraits/women/54.jpg",
      contestName: "Fauna Doméstica",
      likes: 521,
      category: "Animales"
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
      title: "Arquitectura Moderna",
      photographer: "David García",
      photographerAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      contestName: "Líneas y Formas",
      likes: 387,
      category: "Arquitectura"
    }
  ];

  const categories = ["Todas", "Naturaleza", "Urbana", "Retrato", "Eventos", "Animales", "Arquitectura"];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Galería de Ganadores</h1>
        <p className="text-xl text-gray-600">Las mejores fotografías seleccionadas por nuestra comunidad</p>
      </motion.div>

      {/* Filtros de categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {categories.map((category, index) => (
          <Button
            key={category}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className={index === 0 ? "bg-[#4891AA] hover:bg-[#3a7a8b]" : "border-[#4891AA]/30 text-[#4891AA] hover:bg-[#4891AA]/10"}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Fotos ganadoras destacadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top 3 del Mes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPhotos.slice(0, 3).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="relative"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${photo.imageUrl}?auto=format&fit=crop&w=600&q=80`}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                      <Trophy className="h-3 w-3 mr-1" />
                      #{photo.position}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0 bg-white/90">
                        <Heart className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0 bg-white/90">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{photo.contestName}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={photo.photographerAvatar} alt={photo.photographer} />
                        <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{photo.photographer}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{photo.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Grid de todas las fotos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {mockPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={`${photo.imageUrl}?auto=format&fit=crop&w=400&q=80`}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm font-medium truncate">{photo.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/80 text-xs">{photo.photographer}</span>
                    <div className="flex items-center gap-1 text-white/80">
                      <Heart className="h-3 w-3 fill-current" />
                      <span className="text-xs">{photo.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center bg-gradient-to-r from-[#4891AA] to-blue-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">¿Tienes una foto increíble?</h2>
        <p className="text-xl mb-6 opacity-90">
          Participa en nuestros concursos y forma parte de esta galería
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-[#4891AA] hover:bg-gray-100">
            Subir Foto
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Instagram className="mr-2 h-5 w-5" />
            Compartir en Instagram
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PrototypeGallery;
