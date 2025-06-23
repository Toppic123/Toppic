
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Contest {
  id: string;
  title: string;
  organizer: string;
  location: string;
  category: string;
  description?: string;
  imageUrl?: string;
  prize?: string;
  participants: number;
  isActive: boolean;
  endDate: string;
  startDate?: string;
  photoDeadline?: string;
  status: "pending" | "active" | "finished";
  is_private?: boolean;
  contest_password?: string;
  coordinates?: { lat: number; lng: number };
  created_at?: string;
  minimum_distance_km?: number;
}

export const useContestsData = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setIsLoading(true);
    try {
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
        const formattedContests: Contest[] = data.map(contest => ({
          id: contest.id,
          title: contest.title || "Concurso sin título",
          organizer: contest.organizer || "Organizador desconocido",
          location: contest.location || "Madrid, España",
          category: "Fotografía",
          description: contest.description || "Descripción del concurso disponible pronto.",
          imageUrl: contest.image_url || `https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400`,
          prize: "500€",
          participants: contest.participants || 0,
          isActive: contest.status === "active",
          endDate: contest.end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          startDate: contest.start_date || new Date().toISOString(),
          photoDeadline: contest.photo_deadline || new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          status: contest.status as "pending" | "active" | "finished",
          is_private: contest.is_private || false,
          contest_password: contest.contest_password || undefined,
          coordinates: { lat: 40.4168, lng: -3.7038 },
          created_at: contest.created_at,
          minimum_distance_km: contest.minimum_distance_km || 0,
        }));
        
        console.log("Concursos formateados:", formattedContests);
        setContests(formattedContests);
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

  return {
    contests,
    isLoading,
    fetchContests
  };
};
