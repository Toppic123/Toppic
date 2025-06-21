
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ContestFormData {
  id?: string;
  title: string;
  organizer: string;
  description: string;
  location: string;
  startDate: string;
  photoDeadline: string;
  endDate: string;
  status: "active" | "pending" | "finished";
  maxParticipants: number;
  isPrivate: boolean;
  contestPassword: string;
  photoOwnership: boolean;
  commercialUse: boolean;
  imageUrl: string;
}

const defaultFormData: ContestFormData = {
  title: "",
  organizer: "",
  description: "",
  location: "",
  startDate: "",
  photoDeadline: "",
  endDate: "",
  status: "pending",
  maxParticipants: 100,
  isPrivate: false,
  contestPassword: "",
  photoOwnership: true,
  commercialUse: true,
  imageUrl: ""
};

export const useContestForm = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContestFormData>(defaultFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  const handleEditContest = (contest: any) => {
    console.log("Editando concurso:", contest); // Debug log
    setFormData({
      id: contest.id, // Asegurar que el ID se establece correctamente
      title: contest.title || "",
      organizer: contest.organizer || "",
      description: contest.description || "",
      location: contest.location || "",
      startDate: contest.start_date ? contest.start_date.split('T')[0] : "",
      photoDeadline: contest.photo_deadline ? contest.photo_deadline.split('T')[0] : "",
      endDate: contest.end_date ? contest.end_date.split('T')[0] : "",
      status: contest.status || "pending",
      maxParticipants: contest.participants || 100,
      isPrivate: contest.is_private || false,
      contestPassword: contest.contest_password || "",
      photoOwnership: contest.photo_ownership !== false,
      commercialUse: contest.commercial_use !== false,
      imageUrl: contest.image_url || ""
    });
    setIsDialogOpen(true);
  };

  const handleCreateNewContest = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleFormChange = (newData: Partial<ContestFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `contest-${Date.now()}.${fileExt}`;
      const filePath = `contests/${fileName}`;

      const { data, error } = await supabase.storage
        .from('contest-images')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('contest-images')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      return null;
    }
  };

  const handleSaveChanges = async (imageFile?: File) => {
    try {
      console.log("Guardando cambios con formData:", formData); // Debug log
      
      let imageUrl = formData.imageUrl;

      // Upload image if provided
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const contestData = {
        title: formData.title,
        organizer: formData.organizer,
        description: formData.description,
        location: formData.location,
        start_date: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        photo_deadline: formData.photoDeadline ? new Date(formData.photoDeadline).toISOString() : null,
        end_date: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        status: formData.status,
        participants: formData.maxParticipants,
        is_private: formData.isPrivate,
        contest_password: formData.contestPassword,
        photo_ownership: formData.photoOwnership,
        commercial_use: formData.commercialUse,
        image_url: imageUrl
      };

      let result;
      if (formData.id) {
        // Update existing contest - ASEGURAR que el ID existe
        console.log("Actualizando concurso existente con ID:", formData.id);
        result = await supabase
          .from('contests')
          .update(contestData)
          .eq('id', formData.id)
          .select(); // Agregar select() para obtener la respuesta
      } else {
        // Create new contest
        console.log("Creando nuevo concurso");
        result = await supabase
          .from('contests')
          .insert([contestData])
          .select(); // Agregar select() para obtener la respuesta
      }

      if (result.error) {
        console.error('Database error:', result.error);
        toast({
          title: "Error",
          description: `Error al ${formData.id ? 'actualizar' : 'crear'} el concurso: ${result.error.message}`,
          variant: "destructive"
        });
        return;
      }

      console.log("Operación exitosa:", result.data); // Debug log

      toast({
        title: "Éxito",
        description: `Concurso ${formData.id ? 'actualizado' : 'creado'} correctamente`
      });

      setIsDialogOpen(false);
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving contest:', error);
      toast({
        title: "Error",
        description: "Error inesperado al guardar el concurso",
        variant: "destructive"
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
    handleSaveChanges
  };
};
