import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ContestFormDialog from "./contests/ContestFormDialog";
import ContestCard from "./contests/ContestCard";
import { filterContests, getNextContestId } from "./contests/contestUtils";
import { Contest, ContestFormData } from "./contests/types";
import { supabase } from "@/integrations/supabase/client";

export const ContestManagement = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>([]);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditContestDialogOpen, setIsEditContestDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contestFormData, setContestFormData] = useState<ContestFormData>({
    title: "",
    organizer: "",
    startDate: "",
    endDate: "",
    photoDeadline: "",
    description: "",
    status: "pending",
    maxParticipants: 100,
    photoOwnership: true,
    commercialUse: true,
    location: "",
    latitude: "",
    longitude: ""
  });
  
  useEffect(() => {
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
          location: contest.location || undefined,
          latitude: contest.latitude || undefined,
          longitude: contest.longitude || undefined,
        }));
        
        setContests(formattedContests);
        setFilteredContests(formattedContests);
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, [toast]);

  const handleContestSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredContests(filterContests(contests, query));
  };

  const handleEditContest = (contestId: string) => {
    const contest = contests.find(c => c.id === contestId);
    if (contest) {
      const fetchContestDetails = async () => {
        try {
          const { data, error } = await supabase
            .from('contests')
            .select('*')
            .eq('id', contestId)
            .single();
            
          if (error) {
            console.error('Error fetching contest details:', error);
            return;
          }
          
          if (data) {
            setContestFormData({
              title: data.title,
              organizer: data.organizer,
              startDate: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : "",
              endDate: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : "",
              photoDeadline: data.photo_deadline ? new Date(data.photo_deadline).toISOString().split('T')[0] : "",
              description: data.description || "",
              status: data.status as "pending" | "active" | "finished",
              maxParticipants: data.participants || 100,
              photoOwnership: data.photo_ownership || true,
              commercialUse: data.commercial_use || true,
              location: data.location || "",
              latitude: "",
              longitude: ""
            });
            setIsEditContestDialogOpen(true);
          }
        } catch (error) {
          console.error('Error fetching contest details:', error);
        }
      };
      
      fetchContestDetails();
    }
  };

  const handleSaveContestChanges = async () => {
    if (contestFormData.title && contestFormData.organizer) {
      setIsLoading(true);
      
      try {
        const { data: existingContests, error: fetchError } = await supabase
          .from('contests')
          .select('id, title')
          .eq('title', contestFormData.title);
          
        if (fetchError) {
          throw fetchError;
        }
        
        let contestId;
        let isUpdate = false;
        
        const contestData = {
          title: contestFormData.title,
          organizer: contestFormData.organizer,
          description: contestFormData.description,
          start_date: contestFormData.startDate || null,
          end_date: contestFormData.endDate || null,
          photo_deadline: contestFormData.photoDeadline || null,
          status: contestFormData.status,
          participants: contestFormData.maxParticipants,
          photo_ownership: contestFormData.photoOwnership,
          commercial_use: contestFormData.commercialUse,
          location: contestFormData.location || null
        };
        
        if (existingContests && existingContests.length > 0) {
          contestId = existingContests[0].id;
          isUpdate = true;
          
          const { error: updateError } = await supabase
            .from('contests')
            .update(contestData)
            .eq('id', contestId);
            
          if (updateError) throw updateError;
        } 
        else {
          const { data: newContest, error: insertError } = await supabase
            .from('contests')
            .insert(contestData)
            .select();
            
          if (insertError) throw insertError;
          if (newContest && newContest.length > 0) {
            contestId = newContest[0].id;
          }
        }
        
        const { data: updatedContests, error: refreshError } = await supabase
          .from('contests')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (refreshError) throw refreshError;
        
        if (updatedContests) {
          const formattedContests: Contest[] = updatedContests.map(contest => ({
            id: contest.id,
            title: contest.title,
            organizer: contest.organizer,
            status: contest.status as "pending" | "active" | "finished",
            participants: contest.participants || 0,
            location: contest.location || undefined,
            latitude: contest.latitude || undefined,
            longitude: contest.longitude || undefined,
          }));
          
          setContests(formattedContests);
          setFilteredContests(filterContests(formattedContests, searchQuery));
        }
        
        toast({
          title: "Cambios guardados",
          description: `El concurso "${contestFormData.title}" ha sido ${isUpdate ? 'actualizado' : 'creado'} correctamente.`,
        });
      } catch (error: any) {
        console.error('Error saving contest:', error);
        toast({
          title: "Error al guardar",
          description: error.message || "Ha ocurrido un error al guardar el concurso.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsEditContestDialogOpen(false);
      }
    } else {
      toast({
        title: "Error al guardar",
        description: "El título y el organizador son campos obligatorios.",
        variant: "destructive",
      });
    }
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

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Concursos</h2>
        <Button onClick={() => {
          setContestFormData({
            title: "",
            organizer: "",
            startDate: "",
            endDate: "",
            photoDeadline: "",
            description: "",
            status: "pending",
            maxParticipants: 100,
            photoOwnership: true,
            commercialUse: true,
            location: "",
            latitude: "",
            longitude: ""
          });
          setIsEditContestDialogOpen(true);
        }} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Nuevo Concurso</span>
        </Button>
      </div>
      
      <div className="relative w-full mb-4">
        <Input 
          placeholder="Buscar concursos..." 
          className="w-full" 
          value={searchQuery}
          onChange={(e) => handleContestSearch(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Cargando concursos...</p>
        </div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron concursos{searchQuery ? " con la búsqueda actual" : ""}.</p>
        </div>
      ) : (
        filteredContests.map(contest => (
          <ContestCard 
            key={contest.id}
            contest={contest}
            onEdit={handleEditContest}
            onDelete={handleDeleteContest}
          />
        ))
      )}

      <ContestFormDialog 
        isOpen={isEditContestDialogOpen}
        setIsOpen={setIsEditContestDialogOpen}
        contestFormData={contestFormData}
        setContestFormData={setContestFormData}
        handleSaveChanges={handleSaveContestChanges}
      />
    </>
  );
};

export default ContestManagement;
