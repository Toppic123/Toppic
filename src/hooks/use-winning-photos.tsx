
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

export interface WinningPhoto {
  id: number;
  imageUrl: string;
  image_url?: string;
  title: string;
  photographer: string;
  photographer_name?: string;
  photographerAvatar: string;
  likes: number;
  description?: string;
}

// Import the default photos directly to ensure correct typing
import { winningPhotos as defaultWinningPhotos } from "@/components/home/HomeData";

export const useWinningPhotos = () => {
  const [photos, setPhotos] = useState<WinningPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Cargar fotos iniciales
  useEffect(() => {
    // Always load default photos initially to ensure we have data
    setPhotos(defaultWinningPhotos as WinningPhoto[]);
    setLoading(false);
    console.log("Fotos iniciales cargadas:", defaultWinningPhotos);
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
          
        if (urlData) {
          imageUrl = urlData.publicUrl;
        }
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

      // Log success for debugging
      console.log("Foto actualizada:", id, newPhotoData, imageUrl);
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
          
        if (urlData) {
          imageUrl = urlData.publicUrl;
        }
      }
      
      // Crear nueva foto con URL de imagen actualizada
      const newId = Math.max(0, ...photos.map(p => p.id)) + 1;
      const photoWithUrl: WinningPhoto = { ...newPhoto, imageUrl, id: newId };
      
      // Actualizar estado local
      const updatedPhotos = [...photos, photoWithUrl];
      setPhotos(updatedPhotos);
      
      toast({
        title: "Foto añadida",
        description: "La nueva foto ha sido añadida a la galería."
      });

      // Log success for debugging
      console.log("Nueva foto añadida:", photoWithUrl);
      console.log("Total fotos ahora:", updatedPhotos.length);
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
    setPhotos(currentPhotos => {
      const updated = currentPhotos.filter(photo => photo.id !== id);
      console.log(`Foto ${id} eliminada. Quedan ${updated.length} fotos.`);
      return updated;
    });
    
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
    
    console.log("Nuevo orden de fotos:", newOrder.map(p => p.id));
  };

  return {
    photos: photos.length > 0 ? photos : defaultWinningPhotos as WinningPhoto[], // Fallback to default photos if empty
    loading,
    updatePhoto,
    addPhoto,
    removePhoto,
    reorderPhotos
  };
};
