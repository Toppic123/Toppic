
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Contest } from "../types";
import { filterContests } from "../contestUtils";
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
        return;
      }
      
      const formattedContests: Contest[] = data.map(contest => ({
        id: contest.id,
        title: contest.title,
        organizer: contest.organizer,
        status: contest.status as "pending" | "active" | "finished",
        participants: contest.participants || 0,
        location: contest.location || undefined
      }));
      
      setContests(formattedContests);
      setFilteredContests(formattedContests);
    } catch (error) {
      console.error('Error fetching contests:', error);
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
