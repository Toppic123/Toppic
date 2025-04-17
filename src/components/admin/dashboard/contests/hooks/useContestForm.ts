
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ContestFormData } from "../types";
import { supabase } from "@/integrations/supabase/client";

export const useContestForm = (onSuccess: () => void) => {
  const { toast } = useToast();
  const [isEditContestDialogOpen, setIsEditContestDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    location: ""
  });

  const handleEditContest = async (contestId: string) => {
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
          location: data.location || ""
        });
        setIsEditContestDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  const resetFormData = () => {
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
      location: ""
    });
  };

  const handleCreateNewContest = () => {
    resetFormData();
    setIsEditContestDialogOpen(true);
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
        
        toast({
          title: "Cambios guardados",
          description: `El concurso "${contestFormData.title}" ha sido ${isUpdate ? 'actualizado' : 'creado'} correctamente.`,
        });

        onSuccess();
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

  return {
    contestFormData,
    setContestFormData,
    isEditContestDialogOpen,
    setIsEditContestDialogOpen,
    isLoading,
    handleEditContest,
    handleCreateNewContest,
    handleSaveContestChanges
  };
};
