
import { useState } from "react";
import { Contest, ContestFormData } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const emptyContestForm: ContestFormData = {
  title: '',
  description: '',
  status: 'pending',
  organizer: '',
  startDate: '',
  endDate: '',
  photoDeadline: '',
  maxParticipants: 100,
  photoOwnership: false,
  commercialUse: false,
  location: '',
  imageUrl: '' // Añadimos el campo para la imagen
};

export const useContestForm = (onSuccessfulSave: () => void) => {
  // Renamed to formData to follow standard naming conventions
  const [formData, setFormData] = useState<ContestFormData>(emptyContestForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ContestFormData, string>>>({});
  const { toast } = useToast();

  const handleFormChange = (updatedFormData: Partial<ContestFormData>) => {
    setFormData(prev => ({ ...prev, ...updatedFormData }));
  };

  const handleCreateNewContest = () => {
    setFormData(emptyContestForm);
    setIsDialogOpen(true);
  };

  const handleEditContest = async (id: string) => {
    try {
      // Intentamos buscar el concurso en la base de datos
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        // Si encontramos el concurso, actualizamos el formulario
        setFormData({
          title: data.title || '',
          description: data.description || '',
          status: data.status || 'pending',
          organizer: data.organizer || '',
          startDate: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
          endDate: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : '',
          photoDeadline: data.photo_deadline ? new Date(data.photo_deadline).toISOString().split('T')[0] : '',
          maxParticipants: data.participants || 100,
          photoOwnership: data.photo_ownership !== undefined ? data.photo_ownership : false,
          commercialUse: data.commercial_use !== undefined ? data.commercial_use : false,
          location: data.location || '',
          imageUrl: data.image_url || ''
        });
      } else {
        // Si no encontramos el concurso, usamos datos simulados
        console.log("Editing contest ID:", id);
        const mockContest: ContestFormData = {
          ...emptyContestForm,
          title: `Contest ${id}`,
          description: 'Sample contest description',
          status: 'active',
        };
        
        setFormData(mockContest);
      }
      
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching contest:", error);
      toast({
        title: "Error al cargar concurso",
        description: "No se pudo cargar la información del concurso",
        variant: "destructive"
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContestFormData, string>> = {};
    
    if (!formData.title) newErrors.title = "El título es obligatorio";
    if (!formData.description) newErrors.description = "La descripción es obligatoria";
    if (!formData.location) newErrors.location = "La ubicación es obligatoria";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Convertir fechas a formato ISO para Supabase
      const contestData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        organizer: formData.organizer,
        start_date: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        end_date: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        photo_deadline: formData.photoDeadline ? new Date(formData.photoDeadline).toISOString() : null,
        participants: formData.maxParticipants,
        photo_ownership: formData.photoOwnership,
        commercial_use: formData.commercialUse,
        location: formData.location,
        image_url: formData.imageUrl
      };
      
      // Guardar en Supabase
      const { error } = await supabase
        .from('contests')
        .insert([contestData]);
      
      if (error) throw error;
      
      console.log("Contest saved successfully");
      toast({
        title: "Concurso guardado",
        description: "El concurso se ha guardado correctamente",
      });
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      setFormData(emptyContestForm);
      
      // Call the callback function to refresh the contests list
      onSuccessfulSave();
    } catch (error: any) {
      console.error("Error saving contest:", error);
      setSubmitError(error.message || "No se pudo guardar el concurso");
      toast({
        title: "Error al guardar",
        description: error.message || "No se pudo guardar el concurso",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyContestForm);
    setErrors({});
    setSubmitError('');
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    isDialogOpen,
    setIsDialogOpen,
    handleEditContest,
    handleCreateNewContest,
    handleFormChange,
    handleSaveChanges,
    resetForm
  };
};
