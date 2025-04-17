
import { useState } from 'react';
import { winningPhotos as defaultPhotos } from "@/components/home/HomeData";
import { useToast } from '@/hooks/use-toast';

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

  const updatePhoto = (id: number, newPhotoData: Partial<WinningPhoto>) => {
    setPhotos(currentPhotos => 
      currentPhotos.map(photo => 
        photo.id === id ? { ...photo, ...newPhotoData } : photo
      )
    );
    
    toast({
      title: "Foto actualizada",
      description: "La información de la foto ha sido actualizada correctamente."
    });
  };

  const addPhoto = (newPhoto: Omit<WinningPhoto, "id">) => {
    const newId = Math.max(0, ...photos.map(p => p.id)) + 1;
    setPhotos(currentPhotos => [...currentPhotos, { ...newPhoto, id: newId }]);
    
    toast({
      title: "Foto añadida",
      description: "La nueva foto ha sido añadida a la galería."
    });
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
