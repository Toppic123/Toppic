
export interface Contest {
  id: string;
  title: string;
  location: string;
  coords: { lat: number; lng: number };
  photosCount: number;
  isPrivate: boolean;
  isActive: boolean;
  endDate: string;
}

export const mockContests: Contest[] = [
  {
    id: "1",
    title: "Festival de Primavera",
    location: "Barcelona",
    coords: { lat: 41.3851, lng: 2.1734 },
    photosCount: 24,
    isPrivate: false,
    isActive: true,
    endDate: "2025-06-01"
  },
  {
    id: "2",
    title: "Concurso Gastronómico",
    location: "Madrid",
    coords: { lat: 40.4168, lng: -3.7038 },
    photosCount: 38,
    isPrivate: true,
    isActive: true,
    endDate: "2025-05-15"
  },
  {
    id: "3",
    title: "Mar y Playa",
    location: "Valencia",
    coords: { lat: 39.4699, lng: -0.3763 },
    photosCount: 17,
    isPrivate: false,
    isActive: false,
    endDate: "2025-01-10"
  },
  {
    id: "4",
    title: "Vida Nocturna",
    location: "Ibiza",
    coords: { lat: 38.9067, lng: 1.4206 },
    photosCount: 42,
    isPrivate: true,
    isActive: false,
    endDate: "2025-02-20"
  },
];

export const activeContests = mockContests.filter(contest => contest.isActive);
