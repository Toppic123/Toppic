
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ContestFormDialog from "./contests/ContestFormDialog";
import ContestCard from "./contests/ContestCard";
import { mockContests, filterContests, getNextContestId } from "./contests/contestUtils";
import { Contest, ContestFormData } from "./contests/types";

export const ContestManagement = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [filteredContests, setFilteredContests] = useState<Contest[]>(mockContests);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditContestDialogOpen, setIsEditContestDialogOpen] = useState(false);
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
    commercialUse: true
  });

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
        startDate: "2024-04-15",
        endDate: "2024-05-15",
        photoDeadline: "2024-05-10",
        description: "Contest description goes here...",
        status: contest.status,
        maxParticipants: contest.participants,
        photoOwnership: true,
        commercialUse: true
      });
      setIsEditContestDialogOpen(true);
    }
  };

  // Handle save contest changes
  const handleSaveContestChanges = () => {
    if (contestFormData.title && contestFormData.organizer) {
      // Get the next ID for new contests
      const nextId = getNextContestId(contests);
      
      // If editing an existing contest, update it; otherwise add a new one
      const updatedContests = [...contests];
      const existingIndex = updatedContests.findIndex(c => c.title === contestFormData.title);
      
      if (existingIndex >= 0) {
        // Update existing contest
        updatedContests[existingIndex] = {
          ...updatedContests[existingIndex],
          title: contestFormData.title,
          organizer: contestFormData.organizer,
          status: contestFormData.status,
          participants: contestFormData.maxParticipants
        };
      } else {
        // Add new contest
        updatedContests.push({
          id: nextId,
          title: contestFormData.title,
          organizer: contestFormData.organizer,
          status: contestFormData.status,
          participants: contestFormData.maxParticipants
        });
      }
      
      // Update state
      setContests(updatedContests);
      setFilteredContests(filterContests(updatedContests, searchQuery));
      
      toast({
        title: "Cambios guardados",
        description: `El concurso "${contestFormData.title}" ha sido ${existingIndex >= 0 ? 'actualizado' : 'creado'} correctamente.`,
      });
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
  const handleDeleteContest = (contestId: string) => {
    toast({
      title: "Concurso eliminado",
      description: `El concurso ha sido eliminado correctamente.`,
    });
    const updatedContests = contests.filter(c => c.id !== contestId);
    setContests(updatedContests);
    setFilteredContests(filterContests(updatedContests, searchQuery));
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
            commercialUse: true
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
      
      {filteredContests.map(contest => (
        <ContestCard 
          key={contest.id}
          contest={contest}
          onEdit={handleEditContest}
          onDelete={handleDeleteContest}
        />
      ))}

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
