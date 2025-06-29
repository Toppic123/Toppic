
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Contest } from "@/hooks/useContestsData";
import { supabase } from "@/integrations/supabase/client";

export interface ContestFormData {
  id?: string;
  title: string;
  organizer: string;
  location: string;
  description: string;
  image_url: string;
  prize: string;
  startDate: string;
  endDate: string;
  photoDeadline: string;
  status: "pending" | "active" | "finished";
  is_private: boolean;
  contest_password?: string;
  minimum_distance_km: number;
  plan: "basic" | "professional" | "premium";
}

export const useContestForm = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ContestFormData>({
    title: "",
    organizer: "",
    location: "",
    description: "",
    image_url: "",
    prize: "",
    startDate: new Date().toISOString().slice(0, 16),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    photoDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    status: "pending",
    is_private: false,
    minimum_distance_km: 0,
    plan: "basic",
  });

  const handleCreateNewContest = () => {
    setFormData({
      title: "",
      organizer: "",
      location: "",
      description: "",
      image_url: "",
      prize: "",
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      photoDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      status: "pending",
      is_private: false,
      minimum_distance_km: 0,
      plan: "basic",
    });
    setIsDialogOpen(true);
  };

  const handleEditContest = (contest: Contest) => {
    // Handle both possible field names for backward compatibility
    const imageUrl = contest.imageUrl || "";
    
    setFormData({
      id: contest.id,
      title: contest.title,
      organizer: contest.organizer,
      location: contest.location,
      description: contest.description || "",
      image_url: imageUrl,
      prize: contest.prize || "",
      startDate: contest.startDate ? new Date(contest.startDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      endDate: contest.endDate ? new Date(contest.endDate).toISOString().slice(0, 16) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      photoDeadline: contest.photoDeadline ? new Date(contest.photoDeadline).toISOString().slice(0, 16) : new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      status: contest.status,
      is_private: contest.is_private || false,
      contest_password: contest.contest_password || "",
      minimum_distance_km: contest.minimum_distance_km || 0,
      plan: (contest as any).plan || "basic",
    });
    setIsDialogOpen(true);
  };

  const handleSaveChanges = async (data: any) => {
    try {
      console.log('Saving contest data:', data);
      
      const contestData = {
        title: data.title,
        organizer: data.organizer,
        location: data.location,
        description: data.description,
        image_url: data.image_url,
        prize: data.prize,
        start_date: data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate,
        end_date: data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate,
        photo_deadline: data.photoDeadline instanceof Date ? data.photoDeadline.toISOString() : data.photoDeadline,
        status: data.status,
        is_private: data.isPrivate || false,
        contest_password: data.contestPassword || null,
        minimum_distance_km: data.minimumDistanceKm || 0,
        plan: data.plan, // Fix: ensure plan is correctly mapped from form data
      };

      console.log('Contest data to save (including plan):', contestData);

      if (formData.id) {
        // Editar concurso existente - usar el ID del formData, no crear uno nuevo
        const { data: updateResult, error } = await supabase
          .from('contests')
          .update(contestData)
          .eq('id', formData.id)
          .select();

        if (error) throw error;
        
        console.log('Update result:', updateResult);

        toast({
          title: "Concurso actualizado",
          description: "Los datos del concurso se han actualizado correctamente.",
        });
      } else {
        // Crear nuevo concurso
        const { data: insertResult, error } = await supabase
          .from('contests')
          .insert(contestData)
          .select();

        if (error) throw error;
        
        console.log('Insert result:', insertResult);

        toast({
          title: "Concurso creado",
          description: "El concurso se ha creado correctamente.",
        });
      }

      setIsDialogOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error saving contest:', error);
      toast({
        title: "Error al guardar",
        description: error.message || "Ha ocurrido un error al guardar el concurso.",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    isDialogOpen,
    setIsDialogOpen,
    handleEditContest,
    handleCreateNewContest,
    handleSaveChanges
  };
};
