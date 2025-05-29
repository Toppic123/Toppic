
import { useState } from "react";
import { Search, Filter, Heart, Eye, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MobileGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock gallery data
  const photos = [
    {
      id: 1,
      title: "Atardecer en Gran Vía",
      photographer: "Ana García",
      contest: "Paisajes Urbanos Madrid",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 156,
      views: 1234,
      award: "1st",
      category: "urban"
    },
    {
      id: 2,
      title: "Retrato Callejero",
      photographer: "Carlos López",
      contest: "Retratos Callejeros",
      image: "https://images.unsplash.com/photo-1494790108755-2616c120e87f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 89,
      views: 567,
      award: null,
      category: "portrait"
    },
    {
      id: 3,
      title: "Bosque Mágico",
      photographer: "María Rodríguez",
      contest: "Naturaleza Salvaje",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 234,
      views: 2100,
      award: "2nd",
      category: "nature"
    },
    {
      id: 4,
      title: "Arquitectura Moderna",
      photographer: "David Martín",
      contest: "Arquitectura Moderna",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 67,
      views: 445,
      award: "3rd",
      category: "architecture"
    },
    {
      id: 5,
      title: "Calle Nocturna",
      photographer: "Elena Fernández",
      contest: "Paisajes Urbanos Madrid",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 123,
      views: 890,
      award: null,
      category: "urban"
    },
    {
      id: 6,
      title: "Montañas al Amanecer",
      photographer: "Javier Santos",
      contest: "Naturaleza Salvaje",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      likes: 198,
      views: 1567,
      award: null,
      category: "nature"
    }
  ];

  const filters = [
    { id: "all", name: "Todas" },
    { id: "urban", name: "Urbano" },
    { id: "portrait", name: "Retrato" },
    { id: "nature", name: "Naturaleza" },
    { id: "architecture", name: "Arquitectura" }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.photographer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.contest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || photo.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getAwardBadge = (award: string | null) => {
    if (!award) return null;
    
    const awardColors = {
      "1st": "bg-yellow-500 text-white",
      "2nd": "bg-gray-400 text-white", 
      "3rd": "bg-orange-600 text-white"
    };
    
    const awardEmojis = {
      "1st": "🥇",
      "2nd": "🥈",
      "3rd": "🥉"
    };
    
    return (
      <Badge className={`${awardColors[award as keyof typeof awardColors]} text-xs`}>
        {awardEmojis[award as keyof typeof awardEmojis]} {award === "1st" ? "1er" : award === "2nd" ? "2do" : "3er"} Lugar
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Galería de Fotos
        </h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar fotos, fotógrafos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={`whitespace-nowrap ${
                selectedFilter === filter.id
                  ? "bg-[#4891AA] text-white"
                  : "border-[#4891AA] text-[#4891AA] hover:bg-[#4891AA] hover:text-white"
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                
                {/* Award Badge */}
                {photo.award && (
                  <div className="absolute top-3 left-3">
                    {getAwardBadge(photo.award)}
                  </div>
                )}
                
                {/* Stats Overlay */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {photo.likes}
                  </div>
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {photo.views}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  por <span className="font-medium">{photo.photographer}</span>
                </p>
                <p className="text-gray-500 text-xs">
                  {photo.contest}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron fotos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileGallery;
