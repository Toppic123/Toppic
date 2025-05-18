
import { useState } from "react";
import { z } from "zod";

export interface ContestFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  isPrivate: boolean;
  maxParticipants: number | null;
  maxPhotosPerUser: number | null;
  prizeDescription: string;
  bannerImage: string;
  allowedRadius: number;
  contestId?: string; // Añadido para ediciones
}

export const useContestForm = (onSubmitSuccess: () => void, initialData?: ContestFormData) => {
  const [formData, setFormData] = useState<ContestFormData>(
    initialData || {
      title: "",
      description: "",
      category: "landscape",
      location: "",
      latitude: 0,
      longitude: 0,
      startDate: null,
      endDate: null,
      isActive: true,
      isPrivate: false,
      maxParticipants: null,
      maxPhotosPerUser: null,
      prizeDescription: "",
      bannerImage: "",
      allowedRadius: 500,
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ContestFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isEditMode = !!initialData;

  const updateFormData = (
    field: keyof ContestFormData,
    value: string | number | boolean | Date | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleLocationSelect = (place: any) => {
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      
      setFormData((prev) => ({
        ...prev,
        location: place.formatted_address || place.name,
        latitude: lat,
        longitude: lng,
      }));
    }
  };

  const validateForm = () => {
    const schema = z.object({
      title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
      description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
      category: z.string().min(1, "Seleccione una categoría"),
      location: z.string().min(3, "Especifique una ubicación válida"),
      latitude: z.number().refine((val) => val !== 0, "Latitud no válida"),
      longitude: z.number().refine((val) => val !== 0, "Longitud no válida"),
      startDate: z
        .date({ invalid_type_error: "La fecha de inicio es obligatoria" })
        .nullable()
        .refine((date) => date !== null, "La fecha de inicio es requerida"),
      endDate: z
        .date({ invalid_type_error: "La fecha de fin es obligatoria" })
        .nullable()
        .refine((date) => date !== null, "La fecha de fin es requerida"),
      isActive: z.boolean(),
      isPrivate: z.boolean(),
      maxParticipants: z.number().nullable(),
      maxPhotosPerUser: z.number().nullable(),
      prizeDescription: z.string(),
      bannerImage: z.string(),
      allowedRadius: z.number().min(1, "El radio debe ser mayor que 0"),
    });

    try {
      schema.parse(formData);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof ContestFormData;
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // En un caso real, aquí enviaríamos los datos al servidor
      console.log("Enviando datos del concurso:", formData);
      
      // Simular una llamada a la API exitosa después de un tiempo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Aquí iría la lógica para enviar los datos al backend
      console.log(isEditMode ? "Concurso actualizado" : "Concurso creado", {
        ...formData,
        contestId: formData.contestId // Este es el ID para ediciones
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Error al guardar el concurso:", error);
      setSubmitError("Error al guardar el concurso. Por favor, inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "landscape",
      location: "",
      latitude: 0,
      longitude: 0,
      startDate: null,
      endDate: null,
      isActive: true,
      isPrivate: false,
      maxParticipants: null,
      maxPhotosPerUser: null,
      prizeDescription: "",
      bannerImage: "",
      allowedRadius: 500,
    });
    setErrors({});
    setSubmitError(null);
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    isEditMode,
    updateFormData,
    handleLocationSelect,
    handleSubmit,
    resetForm,
  };
};
