
import { useState } from "react";
import { Contest, ContestFormData } from "../types";

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
  location: ''
};

export const useContestForm = (onSuccessfulSave: () => void) => {
  // Renamed to formData to follow standard naming conventions
  const [formData, setFormData] = useState<ContestFormData>(emptyContestForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ContestFormData, string>>>({});

  const handleFormChange = (updatedFormData: Partial<ContestFormData>) => {
    setFormData(prev => ({ ...prev, ...updatedFormData }));
  };

  const handleCreateNewContest = () => {
    setFormData(emptyContestForm);
    setIsDialogOpen(true);
  };

  const handleEditContest = (id: string) => {
    // In a real app, you'd fetch contest by ID here
    // For now we'll simulate finding the contest
    console.log("Editing contest ID:", id);
    const mockContest: ContestFormData = {
      ...emptyContestForm,
      title: `Contest ${id}`,
      description: 'Sample contest description',
      status: 'active',
    };
    
    setFormData(mockContest);
    setIsDialogOpen(true);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Saving contest:", formData);
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      setFormData(emptyContestForm);
      
      // Call the callback function to refresh the contests list
      onSuccessfulSave();
    } catch (error: any) {
      console.error("Error saving contest:", error);
      setSubmitError(error.message || "No se pudo guardar el concurso");
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
