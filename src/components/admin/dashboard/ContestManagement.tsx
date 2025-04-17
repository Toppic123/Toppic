
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
  });
  
  // Cargar concursos desde Supabase al montar el componente
  useEffect(() => {
    fetchContests();
  }, []);
  
  // Obtener los concursos desde Supabase
  const fetchContests = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching contests:", error);
        toast({
          title: "Error al cargar concursos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Transformar el formato de datos y asegurar que el status sea del tipo correcto
      const formattedContests = data.map(contest => ({
        id: contest.id,
        title: contest.title,
        organizer: contest.organizer,
        status: (contest.status === "pending" || contest.status === "active" || contest.status === "finished") 
          ? contest.status as "pending" | "active" | "finished" 
          : "pending",
        participants: contest.participants || 0,
        location: contest.location || "",
      }));
      
      setContests(formattedContests);
      setFilteredContests(formattedContests);
    } catch (error) {
      console.error("Error fetching contests:", error);
      toast({
        title: "Error al cargar concursos",
        description: "No se pudieron cargar los concursos. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle contest search
  const handleContestSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredContests(filterContests(contests, query));
  };

  // Handle edit contest
  const handleEditContest = (contestId: string) => {
    const contest = contests.find(c => c.id === contestId);
    if (contest) {
      setContestFormData({
        title: contest.title,
        organizer: contest.organizer,
        startDate: "",
        endDate: "",
        photoDeadline: "",
        description: "",
        status: contest.status,
        maxParticipants: contest.participants,
        photoOwnership: true,
        commercialUse: true,
        location: contest.location || "",
      });
      setIsEditContestDialogOpen(true);
    }
  };

  // Handle save contest changes
  const handleSaveContestChanges = async () => {
    if (contestFormData.title && contestFormData.organizer) {
      try {
        // Si estamos editando un concurso existente
        const existingContest = contests.find(c => c.title === contestFormData.title);
        
        if (existingContest) {
          // Actualizar concurso existente
          const { error } = await supabase
            .from('contests')
            .update({
              title: contestFormData.title,
              organizer: contestFormData.organizer,
              description: contestFormData.description,
              status: contestFormData.status,
              participants: contestFormData.maxParticipants,
              location: contestFormData.location,
              start_date: contestFormData.startDate ? new Date(contestFormData.startDate).toISOString() : null,
              end_date: contestFormData.endDate ? new Date(contestFormData.endDate).toISOString() : null,
              photo_deadline: contestFormData.photoDeadline ? new Date(contestFormData.photoDeadline).toISOString() : null,
              photo_ownership: contestFormData.photoOwnership,
              commercial_use: contestFormData.commercialUse,
            })
            .eq('id', existingContest.id);
            
          if (error) throw error;
          
          toast({
            title: "Cambios guardados",
            description: `El concurso "${contestFormData.title}" ha sido actualizado correctamente.`,
          });
        } else {
          // Crear nuevo concurso
          const { data, error } = await supabase
            .from('contests')
            .insert({
              title: contestFormData.title,
              organizer: contestFormData.organizer,
              description: contestFormData.description,
              status: contestFormData.status,
              participants: contestFormData.maxParticipants,
              location: contestFormData.location,
              start_date: contestFormData.startDate ? new Date(contestFormData.startDate).toISOString() : null,
              end_date: contestFormData.endDate ? new Date(contestFormData.endDate).toISOString() : null,
              photo_deadline: contestFormData.photoDeadline ? new Date(contestFormData.photoDeadline).toISOString() : null,
              photo_ownership: contestFormData.photoOwnership,
              commercial_use: contestFormData.commercialUse,
            })
            .select();
            
          if (error) throw error;
          
          toast({
            title: "Concurso creado",
            description: `El concurso "${contestFormData.title}" ha sido creado correctamente.`,
          });
        }
        
        // Recargar los concursos
        await fetchContests();
        
      } catch (error: any) {
        console.error("Error saving contest:", error);
        toast({
          title: "Error al guardar",
          description: error.message || "No se pudo guardar el concurso. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error al guardar",
        description: "El título y el organizador son campos obligatorios.",
        variant: "destructive",
      });
    }
    
    setIsEditContestDialogOpen(false);
  };

  // Handle delete contest
  const handleDeleteContest = async (contestId: string) => {
    try {
      const { error } = await supabase
        .from('contests')
        .delete()
        .eq('id', contestId);
        
      if (error) throw error;
      
      toast({
        title: "Concurso eliminado",
        description: `El concurso ha sido eliminado correctamente.`,
      });
      
      // Actualizar la lista de concursos
      await fetchContests();
      
    } catch (error: any) {
      console.error("Error deleting contest:", error);
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el concurso. Inténtalo de nuevo.",
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
        <div className="text-center py-8">Cargando concursos...</div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? "No se encontraron concursos con ese criterio de búsqueda" : "No hay concursos creados aún"}
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
