
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Contest {
  id: string;
  title: string;
  organizer: string;
  location: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  photoDeadline?: string;
  status: 'active' | 'pending' | 'finished';
  participants: number;
  category: string;
  coordinates?: { lat: number; lng: number };
  isActive: boolean;
  is_private?: boolean;
  contest_password?: string;
  minimum_distance_km?: number;
  prize?: string;
  created_at?: string;
}

// Comprehensive location coordinates mapping
const getCoordinatesForLocation = (location: string) => {
  const locationMap: { [key: string]: { lat: number, lng: number } } = {
    // Andorra - Coordenadas muy precisas
    'andorra': { lat: 42.5063, lng: 1.5218 },
    'andorra la vella': { lat: 42.5063, lng: 1.5218 },
    'escaldes-engordany': { lat: 42.5079, lng: 1.5346 },
    'escaldes': { lat: 42.5079, lng: 1.5346 },
    'encamp': { lat: 42.5313, lng: 1.5839 },
    'la massana': { lat: 42.5456, lng: 1.5149 },
    'ordino': { lat: 42.5563, lng: 1.5331 },
    'sant julià de lòria': { lat: 42.4639, lng: 1.4913 },
    'sant julia de loria': { lat: 42.4639, lng: 1.4913 },
    'canillo': { lat: 42.5676, lng: 1.5976 },
    'pas de la casa': { lat: 42.5428, lng: 1.7333 },
    'soldeu': { lat: 42.5761, lng: 1.6703 },
    'el tarter': { lat: 42.5683, lng: 1.6558 },
    'arinsal': { lat: 42.5725, lng: 1.4861 },
    'pal': { lat: 42.5556, lng: 1.4889 },
    'grandvalira': { lat: 42.5444, lng: 1.6500 },
    'caldea': { lat: 42.5079, lng: 1.5346 },
    
    // España - ciudades principales
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'valencia': { lat: 39.4699, lng: -0.3763 },
    'sevilla': { lat: 37.3891, lng: -5.9845 },
    'bilbao': { lat: 43.2627, lng: -2.9253 },
    'zaragoza': { lat: 41.6488, lng: -0.8891 },
    'málaga': { lat: 36.7213, lng: -4.4213 },
    'palma': { lat: 39.5696, lng: 2.6502 },
    'palma de mallorca': { lat: 39.5696, lng: 2.6502 },
    'las palmas': { lat: 28.1248, lng: -15.4300 },
    'santander': { lat: 43.4623, lng: -3.8099 },
    'córdoba': { lat: 37.8882, lng: -4.7794 },
    
    // Cataluña - ciudades cercanas a Andorra
    'la seu d\'urgell': { lat: 42.3586, lng: 1.4582 },
    'puigcerdà': { lat: 42.4303, lng: 1.9272 },
    'berga': { lat: 42.1006, lng: 1.8447 },
    'manresa': { lat: 41.7287, lng: 1.8308 },
    'vic': { lat: 41.9301, lng: 2.2547 },
    'ripoll': { lat: 42.1989, lng: 2.1914 },
    'camprodon': { lat: 42.3167, lng: 2.3667 },
    'olot': { lat: 42.1817, lng: 2.4889 },
    
    // Francia - ciudades cercanas a Andorra
    'toulouse': { lat: 43.6047, lng: 1.4442 },
    'perpignan': { lat: 42.6886, lng: 2.8955 },
    'foix': { lat: 42.9635, lng: 1.6053 },
    'ax-les-thermes': { lat: 42.7167, lng: 1.8333 },
    'font-romeu': { lat: 42.5000, lng: 2.0333 }
  };

  const locationKey = location.toLowerCase().trim();
  
  // Búsqueda exacta
  if (locationMap[locationKey]) {
    console.log(`Exact match found for location "${location}":`, locationMap[locationKey]);
    return locationMap[locationKey];
  }
  
  // Búsqueda parcial más específica para Andorra
  for (const [key, coords] of Object.entries(locationMap)) {
    if (locationKey.includes(key) || key.includes(locationKey)) {
      console.log(`Partial match found for location "${location}" -> "${key}":`, coords);
      return coords;
    }
  }
  
  // Búsqueda por palabras clave mejorada
  if (locationKey.includes('andorra')) {
    console.log(`Andorra keyword match for location "${location}":`, locationMap['andorra']);
    return locationMap['andorra'];
  }
  
  if (locationKey.includes('barcelona') || locationKey.includes('cataluña') || locationKey.includes('catalunya')) {
    console.log(`Barcelona keyword match for location "${location}":`, locationMap['barcelona']);
    return locationMap['barcelona'];
  }
  
  if (locationKey.includes('madrid')) {
    console.log(`Madrid keyword match for location "${location}":`, locationMap['madrid']);
    return locationMap['madrid'];
  }
  
  // Default a Andorra si no se encuentra nada específico
  console.log(`No match found for location "${location}", defaulting to Andorra:`, locationMap['andorra']);
  return locationMap['andorra'];
};

export const useContestsData = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchContests = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contests:', error);
        toast({
          title: "Error al cargar concursos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const transformedContests: Contest[] = data.map(contest => {
          // Use database coordinates if available, otherwise use location-based coordinates
          let coordinates;
          if (contest.latitude && contest.longitude) {
            coordinates = { lat: Number(contest.latitude), lng: Number(contest.longitude) };
            console.log(`Contest "${contest.title}" using database coordinates:`, coordinates);
          } else {
            coordinates = getCoordinatesForLocation(contest.location || 'andorra');
            console.log(`Contest "${contest.title}" using location-based coordinates for "${contest.location}":`, coordinates);
          }

          return {
            id: contest.id,
            title: contest.title || 'Sin título',
            organizer: contest.organizer || 'Organizador desconocido',
            location: contest.location || 'Ubicación no especificada',
            description: contest.description || 'Sin descripción',
            imageUrl: contest.image_url || '', // Allow empty string, will be handled by fallback
            startDate: contest.start_date || new Date().toISOString(),
            endDate: contest.end_date || new Date().toISOString(),
            photoDeadline: contest.photo_deadline,
            status: contest.status as 'active' | 'pending' | 'finished',
            participants: contest.participants || 0,
            category: 'Fotografía', // Default category
            coordinates: coordinates,
            isActive: contest.status === 'active',
            is_private: contest.is_private,
            contest_password: contest.contest_password,
            minimum_distance_km: contest.minimum_distance_km,
            prize: contest.prize
          };
        });
        
        console.log('Transformed contests with coordinates:', transformedContests.map(c => ({
          title: c.title,
          location: c.location,
          coordinates: c.coordinates
        })));
        
        setContests(transformedContests);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar los concursos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return {
    contests,
    isLoading,
    fetchContests
  };
};
