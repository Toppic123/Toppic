
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface WinningPhoto {
  id: string | number;
  imageUrl: string;
  title: string;
  photographer: string;
  photographerAvatar: string;
  likes: number;
}

export const useWinningPhotosSimple = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<WinningPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  // Datos de fotos ganadoras sincronizados con la homepage
  const defaultWinningPhotos: WinningPhoto[] = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Evento deportivo comunitario",
      photographer: "María García",
      photographerAvatar: "https://i.pravatar.cc/150?img=1",
      likes: 124
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Montañas serenas",
      photographer: "Juan Pérez",
      photographerAvatar: "https://i.pravatar.cc/150?img=2",
      likes: 89
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Café matutino",
      photographer: "Ana López",
      photographerAvatar: "https://i.pravatar.cc/150?img=3",
      likes: 156
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Deliciosa comida local",
      photographer: "Carlos Martín",
      photographerAvatar: "https://i.pravatar.cc/150?img=4",
      likes: 201
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Arquitectura moderna",
      photographer: "Elena Ruiz",
      photographerAvatar: "https://i.pravatar.cc/150?img=5",
      likes: 143
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Concierto nocturno",
      photographer: "Diego Herrera",
      photographerAvatar: "https://i.pravatar.cc/150?img=6",
      likes: 178
    }
  ];

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    setLoading(true);
    setTimeout(() => {
      const savedPhotos = localStorage.getItem('homeWinningPhotos');
      if (savedPhotos) {
        try {
          const parsedPhotos = JSON.parse(savedPhotos);
          setPhotos(parsedPhotos);
          console.log('Photos loaded from localStorage:', parsedPhotos);
        } catch (error) {
          console.error('Error parsing saved photos:', error);
          setPhotos(defaultWinningPhotos);
          savePhotosToStorage(defaultWinningPhotos);
        }
      } else {
        setPhotos(defaultWinningPhotos);
        savePhotosToStorage(defaultWinningPhotos);
      }
      setLoading(false);
    }, 500);
  };

  const savePhotosToStorage = (newPhotos: WinningPhoto[]) => {
    try {
      // Guardar en la clave correcta que usa la homepage
      localStorage.setItem('homeWinningPhotos', JSON.stringify(newPhotos));
      console.log('Photos saved to localStorage:', newPhotos);
      
      // También actualizar el evento para sincronizar con otros componentes
      window.dispatchEvent(new CustomEvent('winningPhotosUpdated', { 
        detail: newPhotos 
      }));
    } catch (error) {
      console.error('Error saving photos to localStorage:', error);
      toast({
        title: "Error de almacenamiento",
        description: "No se pudieron guardar los cambios localmente.",
        variant: "destructive"
      });
    }
  };

  const updatePhoto = async (
    id: string | number, 
    updates: Partial<WinningPhoto>, 
    file?: File
  ) => {
    try {
      console.log('Updating photo:', id, updates);
      
      let imageUrl = updates.imageUrl;
      if (file) {
        imageUrl = URL.createObjectURL(file);
        console.log('File uploaded, new URL:', imageUrl);
      }

      const updatedPhotos = photos.map(photo => 
        photo.id === id 
          ? { ...photo, ...updates, imageUrl: imageUrl || photo.imageUrl }
          : photo
      );
      
      setPhotos(updatedPhotos);
      savePhotosToStorage(updatedPhotos);
      
      toast({
        title: "Foto actualizada",
        description: "Los cambios se han guardado correctamente y se reflejarán en la homepage."
      });
      
      console.log('Photo updated successfully:', updatedPhotos);
    } catch (error) {
      console.error('Error updating photo:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la foto.",
        variant: "destructive"
      });
    }
  };

  const addPhoto = async (newPhoto: Omit<WinningPhoto, "id">, file?: File) => {
    try {
      console.log('Adding new photo:', newPhoto);
      
      let imageUrl = newPhoto.imageUrl;
      if (file) {
        imageUrl = URL.createObjectURL(file);
        console.log('File uploaded for new photo, URL:', imageUrl);
      }

      const photoWithId: WinningPhoto = {
        ...newPhoto,
        id: Date.now(),
        imageUrl: imageUrl || newPhoto.imageUrl
      };
      
      const updatedPhotos = [...photos, photoWithId];
      setPhotos(updatedPhotos);
      savePhotosToStorage(updatedPhotos);
      
      toast({
        title: "Foto añadida",
        description: "La nueva foto se ha agregado correctamente y aparecerá en la homepage."
      });
      
      console.log('Photo added successfully:', updatedPhotos);
    } catch (error) {
      console.error('Error adding photo:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir la foto.",
        variant: "destructive"
      });
    }
  };

  const removePhoto = async (id: string | number) => {
    try {
      console.log('Removing photo:', id);
      const updatedPhotos = photos.filter(photo => photo.id !== id);
      setPhotos(updatedPhotos);
      savePhotosToStorage(updatedPhotos);
      
      toast({
        title: "Foto eliminada",
        description: "La foto se ha eliminado correctamente de la homepage."
      });
      
      console.log('Photo removed successfully:', updatedPhotos);
    } catch (error) {
      console.error('Error removing photo:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la foto.",
        variant: "destructive"
      });
    }
  };

  const reorderPhotos = async (newOrder: WinningPhoto[]) => {
    try {
      console.log('Reordering photos:', newOrder);
      setPhotos(newOrder);
      savePhotosToStorage(newOrder);
      
      toast({
        title: "Orden actualizado",
        description: "El orden de las fotos se ha actualizado en la homepage."
      });
      
      console.log('Photos reordered successfully:', newOrder);
    } catch (error) {
      console.error('Error reordering photos:', error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el orden de las fotos.",
        variant: "destructive"
      });
    }
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
