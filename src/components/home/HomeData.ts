
// Import the WinningPhoto type from the use-winning-photos hook
import { WinningPhoto } from "@/hooks/use-winning-photos";

// Hero section carousel images - Updated with new diverse images
export const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Concierto al aire libre"
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", 
    category: "Evento Deportivo"
  },
  {
    url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Momento Social"
  },
  {
    url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Sagrada Familia Barcelona"
  }
];

// Popular contests section
export const popularContests = [
  {
    id: "1",
    title: "Festival de Fotografía Urbana",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    location: "Barcelona",
    dateStart: "2025-06-15",
    dateEnd: "2025-06-30",
    participantsCount: 124,
    photosCount: 348,
  },
  {
    id: "2",
    title: "Naturaleza Salvaje",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Parque Nacional de Doñana",
    dateStart: "2025-07-01",
    dateEnd: "2025-07-10",
    participantsCount: 78,
    photosCount: 215,
  },
  {
    id: "3",
    title: "Arquitectura Histórica",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    location: "Toledo",
    dateStart: "2025-06-20",
    dateEnd: "2025-07-20",
    participantsCount: 56,
    photosCount: 189,
  }
];

// Export winning photos with updated images
export const winningPhotos: WinningPhoto[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Concierto al aire libre",
    photographer: "Elena Rivera",
    photographerAvatar: "https://i.pravatar.cc/150?img=1",
    likes: 342
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Diversión en el festival",
    photographer: "Carlos Mendoza",
    photographerAvatar: "https://i.pravatar.cc/150?img=2",
    likes: 289
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Captura móvil perfecta",
    photographer: "Marina Costa",
    photographerAvatar: "https://i.pravatar.cc/150?img=3",
    likes: 412
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Selfie en el evento",
    photographer: "Luis Hernández",
    photographerAvatar: "https://i.pravatar.cc/150?img=4",
    likes: 251
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Momento deportivo épico",
    photographer: "Ana Martínez",
    photographerAvatar: "https://i.pravatar.cc/150?img=5",
    likes: 317
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Sagrada Familia de Barcelona",
    photographer: "Marco Valencia",
    photographerAvatar: "https://i.pravatar.cc/150?img=6",
    likes: 284
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Festival de música",
    photographer: "Diana Suárez",
    photographerAvatar: "https://i.pravatar.cc/150?img=7",
    likes: 398
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Sagrada Familia",
    photographer: "Javier Acosta",
    photographerAvatar: "https://i.pravatar.cc/150?img=8",
    likes: 275
  },
  {
    id: 9,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Momento compartido",
    photographer: "Teresa Luna",
    photographerAvatar: "https://i.pravatar.cc/150?img=9",
    likes: 329
  }
];
