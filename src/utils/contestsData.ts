
// Mock data for contests with isActive flag
export const allContests = [
  {
    id: "1",
    title: "Festival de Fotografía Urbana",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    location: "Barcelona",
    locationCoords: { lat: 41.3851, lng: 2.1734 },
    maxDistance: 1,
    dateStart: "2023-06-15",
    dateEnd: "2023-06-30",
    participantsCount: 124,
    photosCount: 348,
    category: "urbana",
    isActive: true,
  },
  {
    id: "2",
    title: "Naturaleza Salvaje",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Parque Nacional de Doñana",
    locationCoords: { lat: 37.0559, lng: -6.4408 },
    maxDistance: 2,
    dateStart: "2023-07-01",
    dateEnd: "2023-07-10",
    participantsCount: 78,
    photosCount: 215,
    category: "naturaleza",
    isActive: true,
  },
  {
    id: "3",
    title: "Gastronomía Local",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Madrid",
    locationCoords: { lat: 40.4168, lng: -3.7038 },
    maxDistance: 1,
    dateStart: "2023-07-15",
    dateEnd: "2023-07-20",
    participantsCount: 56,
    photosCount: 189,
    category: "gastronomía",
    isActive: false,
  },
  {
    id: "4",
    title: "Arquitectura Moderna",
    imageUrl: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2276&q=80",
    location: "Valencia",
    locationCoords: { lat: 39.4699, lng: -0.3763 },
    maxDistance: 0.5,
    dateStart: "2023-08-01",
    dateEnd: "2023-08-10",
    participantsCount: 42,
    photosCount: 127,
    category: "arquitectura",
    isActive: false,
  },
  {
    id: "5",
    title: "Retratos Creativos",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Sevilla",
    locationCoords: { lat: 37.3891, lng: -5.9845 },
    maxDistance: 1,
    dateStart: "2023-08-15",
    dateEnd: "2023-08-25",
    participantsCount: 89,
    photosCount: 203,
    category: "retratos",
    isActive: true,
  },
  {
    id: "6",
    title: "Paisajes Costeros",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80",
    location: "Málaga",
    locationCoords: { lat: 36.7213, lng: -4.4214 },
    maxDistance: 1.5,
    dateStart: "2023-09-01",
    dateEnd: "2023-09-10",
    participantsCount: 67,
    photosCount: 178,
    category: "paisajes",
    isActive: false,
  },
  {
    id: "7",
    title: "Fotografía de Personas",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2271&q=80",
    location: "Barcelona",
    locationCoords: { lat: 41.3851, lng: 2.1734 },
    maxDistance: 1,
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15",
    participantsCount: 94,
    photosCount: 267,
    category: "people",
    isActive: true,
  },
];

// Categories for filtering
export const categories = [
  { id: "all", name: "Todos" },
  { id: "urbana", name: "Urbana" },
  { id: "naturaleza", name: "Naturaleza" },
  { id: "gastronomía", name: "Gastronomía" },
  { id: "arquitectura", name: "Arquitectura" },
  { id: "retratos", name: "Retratos" },
  { id: "paisajes", name: "Paisajes" },
  { id: "people", name: "People" },
  { id: "food", name: "Food" }, // Added "Food" category per user request
];

// Locations for filtering
export const locations = [
  { id: "all", name: "Todos" },
  { id: "barcelona", name: "Barcelona" },
  { id: "madrid", name: "Madrid" },
  { id: "valencia", name: "Valencia" },
  { id: "sevilla", name: "Sevilla" },
  { id: "malaga", name: "Málaga" },
];

// Calculate distance between two coordinates in km
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

export const deg2rad = (deg: number) => {
  return deg * (Math.PI/180);
};
