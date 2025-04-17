
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
      // Fetch all contests from the database
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
        
        // Fall back to mock data if there's an error with the database
        console.log('Falling back to mock data');
        const { mockContests } = await import('../contestUtils');
        setContests(mockContests);
        setFilteredContests(mockContests);
        return;
      }
      
      console.log('Fetched contests data:', data);
      
      if (!data || data.length === 0) {
        console.log('No contests found in the database, using mock data');
        const { mockContests } = await import('../contestUtils');
        setContests(mockContests);
        setFilteredContests(mockContests);
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
      
      console.log('Formatted contests:', formattedContests);
      
      setContests(formattedContests);
      setFilteredContests(formattedContests);
    } catch (error) {
      console.error('Error fetching contests:', error);
      
      // Fall back to mock data if there's an error
      console.log('Exception occurred, falling back to mock data');
      const { mockContests } = await import('../contestUtils');
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
      const { error } = await supabase
        .from('contests')
        .delete()
        .eq('id', contestId);
        
      if (error) {
        console.error('Error deleting contest:', error);
        throw error;
      }
      
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
      throw error; // Re-throw the error so the UI can handle it
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
