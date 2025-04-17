
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ContestGallery from "@/components/ContestGallery";

// Simulated data for contest gallery
const mockContestData = {
  id: "1",
  title: "Festival de Primavera",
  description: "Captura la belleza y el color de la primavera en Barcelona. Este concurso busca las mejores fotografías que representen el renacimiento y la vitalidad de la estación.",
  location: "Barcelona",
  startDate: "2025-03-15",
  endDate: "2025-04-15",
  availableUntil: "2026-04-15", // Available for 1 year after end date
  photos: [
    {
      id: "photo1",
      imageUrl: "https://images.unsplash.com/photo-1582560486382-347f58937685",
      photographer: "María López",
      photographerAvatar: "https://i.pravatar.cc/150?img=1",
      votes: 156,
      position: 1
    },
    {
      id: "photo2",
      imageUrl: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa",
      photographer: "Carlos Rodríguez",
      photographerAvatar: "https://i.pravatar.cc/150?img=2",
      votes: 142,
      position: 2
    },
    {
      id: "photo3",
      imageUrl: "https://images.unsplash.com/photo-1496062031456-07b8f162a322",
      photographer: "Ana García",
      photographerAvatar: "https://i.pravatar.cc/150?img=3",
      votes: 124,
      position: 3
    },
    {
      id: "photo4",
      imageUrl: "https://images.unsplash.com/photo-1554080772-19595be31572",
      photographer: "Juan Martínez",
      votes: 98
    },
    {
      id: "photo5",
      imageUrl: "https://images.unsplash.com/photo-1502464731840-344efddd52ae",
      photographer: "Lucía Fernández",
      votes: 82
    },
    {
      id: "photo6",
      imageUrl: "https://images.unsplash.com/photo-1531845116688-48819b3aa0b3",
      photographer: "Pedro Sánchez",
      votes: 76
    },
    {
      id: "photo7",
      imageUrl: "https://images.unsplash.com/photo-1523666294298-66db22733de3",
      photographer: "Elena Ruiz",
      votes: 65
    },
    {
      id: "photo8",
      imageUrl: "https://images.unsplash.com/photo-1586190848861-e393f5e6e8a3",
      photographer: "Javier Torres",
      votes: 58
    }
  ]
};

const ContestGalleryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [contestData, setContestData] = useState<typeof mockContestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API fetch based on the contestId
    const fetchContestData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setContestData(mockContestData);
        setIsLoading(false);
      } catch (err) {
        setError("No se pudo cargar la información del concurso");
        setIsLoading(false);
      }
    };
    
    fetchContestData();
  }, [id]);
  
  // Extract winners from photos
  const getWinners = () => {
    if (!contestData) return [];
    return contestData.photos
      .filter(photo => photo.position && photo.position <= 3)
      .sort((a, b) => (a.position || 99) - (b.position || 99));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4891AA]" />
      </div>
    );
  }
  
  if (error || !contestData) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p>{error || "No se encontró el concurso solicitado"}</p>
      </div>
    );
  }
  
  return (
    <ContestGallery
      contestId={id || contestData.id}
      contestTitle={contestData.title}
      contestDescription={contestData.description}
      location={contestData.location}
      startDate={contestData.startDate}
      endDate={contestData.endDate}
      availableUntil={contestData.availableUntil}
      photos={contestData.photos}
      winners={getWinners()}
    />
  );
};

export default ContestGalleryPage;
