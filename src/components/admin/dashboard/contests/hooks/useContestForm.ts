
import { useState } from "react";
import { Contest } from "@/hooks/useContestsData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ContestFormData {
  id?: string;
  title: string;
  organizer: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  photoDeadline: string;
  status: "pending" | "active" | "finished";
  maxParticipants: number;
  imageUrl: string;
  isPrivate?: boolean;
  contestPassword?: string;
  photoOwnership: boolean;
  commercialUse: boolean;
  minimumDistanceKm: number;
}

const defaultFormData: ContestFormData = {
  title: "",
  organizer: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  photoDeadline: "",
  status: "pending",
  maxParticipants: 100,
  imageUrl: "",
  isPrivate: false,
  contestPassword: "",
  photoOwnership: true,
  commercialUse: true,
  minimumDistanceKm: 0,
};

export const useContestForm = (refreshContests: () => void) => {
  const [formData, setFormData] = useState<ContestFormData>(defaultFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditContest = (contest: Contest) => {
    console.log("Editing contest:", contest);
    setFormData({
      id: contest.id,
      title: contest.title,
      organizer: contest.organizer,
      description: contest.description || "",
      location: contest.location,
      startDate: contest.startDate ? new Date(contest.startDate).toISOString().split('T')[0] : "",
      endDate: contest.endDate ? new Date(contest.endDate).toISOString().split('T')[0] : "",
      photoDeadline: contest.photoDeadline ? new Date(contest.photoDeadline).toISOString().split('T')[0] : "",
      status: contest.status,
      maxParticipants: contest.participants,
      imageUrl: contest.imageUrl || "",
      isPrivate: contest.is_private || false,
      contestPassword: contest.contest_password || "",
      photoOwnership: true,
      commercialUse: true,
      minimumDistanceKm: 0, // Will be updated when we fetch from the database
    });
    setIsDialogOpen(true);
  };

  const handleCreateNewContest = () => {
    setFormData(defaultFormData);
    setIsDialogOpen(true);
  };

  const handleFormChange = (newData: Partial<ContestFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSaveChanges = async (imageFile?: File) => {
    try {
      let imageUrl = formData.imageUrl;
      
      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `contest-${Date.now()}.${fileExt}`;
        const filePath = `contest-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('contest-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast({
            title: "Error al subir imagen",
            description: uploadError.message,
            variant: "destructive",
          });
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('contest-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const contestData = {
        title: formData.title,
        organizer: formData.organizer,
        description: formData.description,
        location: formData.location,
        start_date: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        end_date: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        photo_deadline: formData.photoDeadline ? new Date(formData.photoDeadline).toISOString() : null,
        status: formData.status,
        participants: formData.maxParticipants,
        image_url: imageUrl,
        is_private: formData.isPrivate,
        contest_password: formData.contestPassword,
        photo_ownership: formData.photoOwnership,
        commercial_use: formData.commercialUse,
        minimum_distance_km: formData.minimumDistanceKm,
      };

      let result;
      
      if (formData.id) {
        // Update existing contest
        console.log("Updating contest with ID:", formData.id, "Data:", contestData);
        result = await supabase
          .from('contests')
          .update(contestData)
          .eq('id', formData.id)
          .select();
      } else {
        // Create new contest
        console.log("Creating new contest with data:", contestData);
        result = await supabase
          .from('contests')
          .insert(contestData)
          .select();
      }

      const { data, error } = result;

      if (error) {
        console.error('Error saving contest:', error);
        toast({
          title: "Error al guardar concurso",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        toast({
          title: formData.id ? "Concurso actualizado" : "Concurso creado",
          description: formData.id ? "El concurso ha sido actualizado correctamente." : "El concurso ha sido creado correctamente.",
        });
        
        setIsDialogOpen(false);
        setFormData(defaultFormData);
        refreshContests();
      }
    } catch (error) {
      console.error('Error in handleSaveChanges:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado.",
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
    handleFormChange,
    handleSaveChanges,
  };
};
