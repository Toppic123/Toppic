
import { useState, useEffect } from 'react';
import { winningPhotos as defaultPhotos } from "@/components/home/HomeData";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const { toast } = useToast();
  
  // Carga inicial de fotos
  useEffect(() => {
    // Intentamos cargar las fotos desde localStorage primero
    const savedPhotos = localStorage.getItem('winningPhotos');
    if (savedPhotos) {
      try {
        const parsedPhotos = JSON.parse(savedPhotos);
        setPhotos(parsedPhotos);
      } catch (e) {
        console.error('Error parsing saved photos:', e);
      }
    }
  }, []);

  // Guarda las fotos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('winningPhotos', JSON.stringify(photos));
  }, [photos]);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (error) {
      throw new Error('Error uploading image');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const updatePhoto = async (id: number, newPhotoData: Partial<WinningPhoto>, file?: File) => {
    try {
      let imageUrl = newPhotoData.imageUrl;
      
      if (file) {
        imageUrl = await uploadImage(file);
      }

      setPhotos(currentPhotos => 
        currentPhotos.map(photo => 
          photo.id === id ? { ...photo, ...newPhotoData, imageUrl: imageUrl || photo.imageUrl } : photo
        )
      );
      
      toast({
        title: "Foto actualizada",
        description: "La información de la foto ha sido actualizada correctamente."
      });
    } catch (error) {
      console.error('Error updating photo:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar la foto.",
        variant: "destructive"
      });
    }
  };

  const addPhoto = async (newPhoto: Omit<WinningPhoto, "id">, file?: File) => {
    try {
      let imageUrl = newPhoto.imageUrl;
      
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const newId = Math.max(0, ...photos.map(p => p.id)) + 1;
      setPhotos(currentPhotos => [...currentPhotos, { ...newPhoto, id: newId, imageUrl }]);
      
      toast({
        title: "Foto añadida",
        description: "La nueva foto ha sido añadida a la galería."
      });
    } catch (error) {
      console.error('Error adding photo:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al añadir la foto.",
        variant: "destructive"
      });
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
    updatePhoto,
    addPhoto,
    removePhoto,
    reorderPhotos
  };
};
