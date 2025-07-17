
import { Contest } from "@/hooks/useContestsData";

export const filterContests = (contests: Contest[], searchQuery: string): Contest[] => {
  if (!searchQuery.trim()) return contests;
  
  const query = searchQuery.toLowerCase();
  return contests.filter(contest => 
    contest.title.toLowerCase().includes(query) ||
    contest.organizer.toLowerCase().includes(query) ||
    (contest.location && contest.location.toLowerCase().includes(query))
  );
};

export const mockContests: Contest[] = [
  {
    id: "1",
    title: "Concurso de Fotografía Urbana Madrid",
    organizer: "TOPPIC",
    location: "Madrid, España",
    category: "Fotografía",
    description: "Captura la esencia de Madrid en tus fotografías urbanas.",
    imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    prize: "500€",
    participants: 45,
    isActive: true,
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    photoDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    is_private: false,
    coordinates: { lat: 40.4168, lng: -3.7038 },
    created_at: new Date().toISOString(),
    minimum_distance_km: 0,
  },
  {
    id: "2", 
    title: "Gastronomía Española",
    organizer: "FoodLens",
    location: "Barcelona, España",
    category: "Fotografía",
    description: "Muestra la riqueza culinaria de España.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    prize: "300€",
    participants: 32,
    isActive: true,
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    photoDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    is_private: false,
    coordinates: { lat: 41.3851, lng: 2.1734 },
    created_at: new Date().toISOString(),
    minimum_distance_km: 0,
  },
  {
    id: "3",
    title: "Paisajes Costeros",
    organizer: "CoastalShots", 
    location: "Valencia, España",
    category: "Fotografía",
    description: "Captura la belleza de nuestras costas.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    prize: "400€",
    participants: 28,
    isActive: false,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    photoDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending" as const,
    is_private: false,
    coordinates: { lat: 39.4699, lng: -0.3763 },
    created_at: new Date().toISOString(),
    minimum_distance_km: 0,
  },
  {
    id: "4",
    title: "Fotografía Nocturna",
    organizer: "NightOwl",
    location: "Sevilla, España", 
    category: "Fotografía",
    description: "Explora la magia de la noche en tus fotografías.",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400",
    prize: "600€",
    participants: 18,
    isActive: false,
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    photoDeadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "finished" as const,
    is_private: false,
    coordinates: { lat: 37.3886, lng: -5.9823 },
    created_at: new Date().toISOString(),
    minimum_distance_km: 0,
  }
];
