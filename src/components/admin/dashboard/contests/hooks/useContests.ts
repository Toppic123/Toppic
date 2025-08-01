
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Contest } from "@/hooks/useContestsData";
import { filterContests, mockContests } from "../contestUtils";
import { supabase } from "@/integrations/supabase/client";

export const useContests = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>([]);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        // Usar datos simulados si hay error en la base de datos
        console.info("No contests found in the database, using mock data");
        setContests(mockContests);
        setFilteredContests(mockContests);
        return;
      }
      
      if (!data || data.length === 0) {
        console.info("No contests found in the database, using mock data");
        setContests(mockContests);
        setFilteredContests(mockContests);
      } else {
        const formattedContests: Contest[] = data.map(contest => ({
          id: contest.id,
          title: contest.title,
          organizer: contest.organizer,
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
        
        setContests(formattedContests);
        setFilteredContests(formattedContests);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
      // Usar datos simulados si hay error
      setContests(mockContests);
      setFilteredContests(mockContests);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContestSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredContests(filterContests(contests, query));
  };

  const handleDeleteContest = async (contestId: string) => {
    try {
      // Primero comprobamos si es un ID de simulación (formato numérico)
      const isMockId = !contestId.includes('-');
      
      if (isMockId) {
        // Para datos simulados, solo actualizamos el estado
        const updatedContests = contests.filter(c => c.id !== contestId);
        setContests(updatedContests);
        setFilteredContests(filterContests(updatedContests, searchQuery));
        
        toast({
          title: "Concurso eliminado",
          description: `El concurso ha sido eliminado correctamente.`,
        });
        return;
      }
      
      // Para datos reales, intentamos eliminar de la base de datos
      const { error } = await supabase
        .from('contests')
        .delete()
        .eq('id', contestId);
        
      if (error) throw error;
      
      const updatedContests = contests.filter(c => c.id !== contestId);
      setContests(updatedContests);
      setFilteredContests(filterContests(updatedContests, searchQuery));
      
      toast({
        title: "Concurso eliminado",
        description: `El concurso ha sido eliminado correctamente.`,
      });
    } catch (error: any) {
      console.error('Error deleting contest:', error);
      toast({
        title: "Error al eliminar",
        description: error.message || "Ha ocurrido un error al eliminar el concurso.",
        variant: "destructive",
      });
    }
  };

  return {
    contests,
    filteredContests,
    searchQuery,
    isLoading,
    handleContestSearch,
    handleDeleteContest,
    fetchContests
  };
};
