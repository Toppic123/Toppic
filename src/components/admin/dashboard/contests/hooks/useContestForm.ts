
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

  const handleSaveChanges = async (formSubmissionData: any) => {
    try {
      console.log('Original form submission data:', formSubmissionData);
      
      // Ensure all form fields are correctly mapped to database fields
      const contestData = {
        title: formSubmissionData.title,
        organizer: formSubmissionData.organizer,
        location: formSubmissionData.location,
        description: formSubmissionData.description,
        image_url: formSubmissionData.image_url || "",
        prize: formSubmissionData.prize || "",
        start_date: formSubmissionData.startDate instanceof Date ? formSubmissionData.startDate.toISOString() : formSubmissionData.startDate,
        end_date: formSubmissionData.endDate instanceof Date ? formSubmissionData.endDate.toISOString() : formSubmissionData.endDate,
        photo_deadline: formSubmissionData.photoDeadline instanceof Date ? formSubmissionData.photoDeadline.toISOString() : formSubmissionData.photoDeadline,
        status: formSubmissionData.status,
        is_private: formSubmissionData.isPrivate || false,
        contest_password: formSubmissionData.contestPassword || null,
        minimum_distance_km: formSubmissionData.minimumDistanceKm || 0,
        plan: formSubmissionData.plan || "basic", // Ensure plan is properly mapped
        photo_ownership: formSubmissionData.photoOwnership !== undefined ? formSubmissionData.photoOwnership : true,
        commercial_use: formSubmissionData.commercialUse !== undefined ? formSubmissionData.commercialUse : true,
      };

      console.log('Mapped contest data for database (including plan):', contestData);

      if (formData.id) {
        // Update existing contest
        const { data: updateResult, error } = await supabase
          .from('contests')
          .update(contestData)
          .eq('id', formData.id)
          .select();

        if (error) throw error;
        
        console.log('Contest updated successfully:', updateResult);

        toast({
          title: "Concurso actualizado",
          description: "Los datos del concurso se han actualizado correctamente.",
        });
      } else {
        // Create new contest
        const { data: insertResult, error } = await supabase
          .from('contests')
          .insert(contestData)
          .select();

        if (error) throw error;
        
        console.log('Contest created successfully:', insertResult);

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
