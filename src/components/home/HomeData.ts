
// Import the WinningPhoto type from the use-winning-photos hook
import { WinningPhoto } from "@/hooks/use-winning-photos";

// Hero section carousel images
export const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Events"
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Mobile Photography"
  },
  {
    url: "https://images.unsplash.com/photo-1504198453758-3a438de90f0c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Night"
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

// Export winning photos with the correct structure
export const winningPhotos: WinningPhoto[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Cascada en el bosque",
    photographer: "Elena Rivera",
    photographerAvatar: "https://i.pravatar.cc/150?img=1",
    likes: 342
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1682687982470-8f1b17271fc1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Amanecer en la montaña",
    photographer: "Carlos Mendoza",
    photographerAvatar: "https://i.pravatar.cc/150?img=2",
    likes: 289
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Reflejos acuáticos",
    photographer: "Marina Costa",
    photographerAvatar: "https://i.pravatar.cc/150?img=3",
    likes: 412
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1504198453758-3a438de90f0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Estrella fugaz",
    photographer: "Luis Hernández",
    photographerAvatar: "https://i.pravatar.cc/150?img=4",
    likes: 251
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Entre nubes",
    photographer: "Ana Martínez",
    photographerAvatar: "https://i.pravatar.cc/150?img=5",
    likes: 317
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1516616370751-86d6bd8b0651?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Calma en el lago",
    photographer: "Marco Valencia",
    photographerAvatar: "https://i.pravatar.cc/150?img=6",
    likes: 284
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Aurora boreal",
    photographer: "Diana Suárez",
    photographerAvatar: "https://i.pravatar.cc/150?img=7",
    likes: 398
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1560174684-b8253351ecf5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Puente al atardecer",
    photographer: "Javier Acosta",
    photographerAvatar: "https://i.pravatar.cc/150?img=8",
    likes: 275
  },
  {
    id: 9,
    imageUrl: "https://images.unsplash.com/photo-1618035881605-dfe8d7eb387b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Desierto dorado",
    photographer: "Teresa Luna",
    photographerAvatar: "https://i.pravatar.cc/150?img=9",
    likes: 329
  }
];
