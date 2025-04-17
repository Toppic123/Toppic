
import { useState, useEffect } from 'react';
import { winningPhotos as defaultPhotos } from "@/components/home/HomeData";
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

export interface WinningPhoto {
  id: number;
  imageUrl: string;
  title: string;
  photographer: string;
  photographerAvatar: string;
  likes: number;
}

export const useWinningPhotos = () => {
  const [photos, setPhotos] = useState<WinningPhoto[]>(defaultPhotos);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Cargar fotos iniciales
  useEffect(() => {
    console.log("Fotos iniciales cargadas:", photos);
  }, []);

  const updatePhoto = async (id: number, newPhotoData: Partial<WinningPhoto>, file?: File) => {
    setLoading(true);
    try {
      let imageUrl = newPhotoData.imageUrl;
      
      // Si se proporciona un archivo, subirlo a Supabase Storage
      if (file) {
        const fileName = `photo_${id}_${Date.now()}`;
        const { data, error } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, {
            upsert: true,
            contentType: file.type
          });
          
        if (error) {
          throw error;
        }
        
        // Obtener URL pública
        const { data: urlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Actualizar el estado local
      setPhotos(currentPhotos => 
        currentPhotos.map(photo => 
          photo.id === id ? { ...photo, ...newPhotoData, ...(imageUrl ? { imageUrl } : {}) } : photo
        )
      );
      
      toast({
        title: "Foto actualizada",
        description: "La información de la foto ha sido actualizada correctamente."
      });
    } catch (error: any) {
      console.error("Error al actualizar la foto:", error);
      toast({
        title: "Error al actualizar",
        description: error.message || "No se pudo actualizar la foto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async (newPhoto: Omit<WinningPhoto, "id">, file?: File) => {
    setLoading(true);
    try {
      let imageUrl = newPhoto.imageUrl;
      
      // Si se proporciona un archivo, subirlo a Supabase Storage
      if (file) {
        const fileName = `photo_new_${Date.now()}`;
        const { data, error } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, {
            contentType: file.type
          });
          
        if (error) {
          throw error;
        }
        
        // Obtener URL pública
        const { data: urlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Crear nueva foto con URL de imagen actualizada
      const newId = Math.max(0, ...photos.map(p => p.id)) + 1;
      const photoWithUrl = { ...newPhoto, imageUrl, id: newId };
      
      // Actualizar estado local
      setPhotos(currentPhotos => [...currentPhotos, photoWithUrl]);
      
      toast({
        title: "Foto añadida",
        description: "La nueva foto ha sido añadida a la galería."
      });
    } catch (error: any) {
      console.error("Error al añadir la foto:", error);
      toast({
        title: "Error al añadir",
        description: error.message || "No se pudo añadir la foto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (id: number) => {
    setPhotos(currentPhotos => currentPhotos.filter(photo => photo.id !== id));
    
    toast({
      title: "Foto eliminada",
      description: "La foto ha sido eliminada de la galería."
    });
  };

  const reorderPhotos = (newOrder: WinningPhoto[]) => {
    setPhotos(newOrder);
    
    toast({
      title: "Orden actualizado",
      description: "El orden de las fotos ha sido actualizado."
    });
  };

  return {
    photos,
    loading,
    updatePhoto,
    addPhoto,
    removePhoto,
    reorderPhotos
  };
};
