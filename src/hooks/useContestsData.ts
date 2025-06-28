
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
        const transformedContests: Contest[] = data.map(contest => ({
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
          coordinates: contest.latitude && contest.longitude 
            ? { lat: Number(contest.latitude), lng: Number(contest.longitude) }
            : { lat: 40.4168, lng: -3.7038 }, // Default to Madrid coordinates
          isActive: contest.status === 'active',
          is_private: contest.is_private,
          contest_password: contest.contest_password,
          minimum_distance_km: contest.minimum_distance_km,
          prize: contest.prize
        }));
        
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
