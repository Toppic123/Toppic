
import { useState } from "react";
import { Contest, ContestFormData, ContestStatus } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Default form data for a new contest
const defaultFormData: ContestFormData = {
  title: '',
  description: '',
  status: 'pending',
  organizer: '',
  startDate: '',
  photoDeadline: '',
  endDate: '',
  maxParticipants: 100,
  photoOwnership: false,
  commercialUse: false,
  location: '',
  imageUrl: ''
};

export const useContestForm = (onSuccessfulSave: () => void) => {
  const [formData, setFormData] = useState<ContestFormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch contest details
  const fetchContestById = async (contestId: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .eq('id', contestId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Si encontramos el concurso, actualizamos el formulario
        const status = data.status as ContestStatus; // Cast to ContestStatus type
        setFormData({
          title: data.title || '',
          description: data.description || '',
          status: status || 'pending',
          organizer: data.organizer || '',
          startDate: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
          endDate: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : '',
          photoDeadline: data.photo_deadline ? new Date(data.photo_deadline).toISOString().split('T')[0] : '',
          maxParticipants: data.participants || 100,
          photoOwnership: data.photo_ownership || false,
          commercialUse: data.commercial_use || false,
          location: data.location || '',
          imageUrl: data.image_url || '' // Access the image_url field
        });
      }
    } catch (error: any) {
      console.error('Error al obtener el concurso:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo cargar la información del concurso.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form data to default
  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  // Handle form submission
  const handleSubmit = async (file?: File) => {
    console.log("Guardando concurso:", formData);
    setIsLoading(true);
    
    try {
      // Handle image upload if a new file is provided
      let imageUrl = formData.imageUrl;
      if (file) {
        const fileName = `contest_${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('contests')
          .upload(fileName, file, {
            contentType: file.type,
            upsert: true
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('contests')
          .getPublicUrl(fileName);

        if (urlData) {
          imageUrl = urlData.publicUrl;
        }
      }

      // Format data for Supabase
      const contestData = {
        title: formData.title,
        description: formData.description,
        status: formData.status || 'pending',
        organizer: formData.organizer,
        start_date: formData.startDate,
        end_date: formData.endDate,
        photo_deadline: formData.photoDeadline,
        participants: formData.maxParticipants,
        photo_ownership: formData.photoOwnership,
        commercial_use: formData.commercialUse,
        location: formData.location,
        image_url: imageUrl // Add the image URL field
      };
      
      // Determine if we're creating or updating a contest
      const { data, error } = await supabase
        .from('contests')
        .upsert(contestData)
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Concurso guardado",
        description: "Los datos del concurso se han guardado correctamente."
      });
      
      resetFormData();
      onSuccessfulSave();
    } catch (error: any) {
      console.error('Error al guardar el concurso:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el concurso.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    fetchContestById,
    resetFormData,
    handleSubmit
  };
};
