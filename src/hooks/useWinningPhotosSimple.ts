
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

  // Mock data inicial para propósitos de demostración
  const initialPhotos: WinningPhoto[] = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Atardecer urbano",
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
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadPhotos = () => {
      setLoading(true);
      setTimeout(() => {
        const savedPhotos = localStorage.getItem('winningPhotos');
        if (savedPhotos) {
          try {
            setPhotos(JSON.parse(savedPhotos));
          } catch (error) {
            console.error('Error parsing saved photos:', error);
            setPhotos(initialPhotos);
            localStorage.setItem('winningPhotos', JSON.stringify(initialPhotos));
          }
        } else {
          setPhotos(initialPhotos);
          localStorage.setItem('winningPhotos', JSON.stringify(initialPhotos));
        }
        setLoading(false);
      }, 500);
    };

    loadPhotos();
  }, []);

  const savePhotosToStorage = (newPhotos: WinningPhoto[]) => {
    try {
      localStorage.setItem('winningPhotos', JSON.stringify(newPhotos));
      console.log('Photos saved to localStorage:', newPhotos);
    } catch (error) {
      console.error('Error saving photos to localStorage:', error);
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
        // En un caso real, aquí subirías el archivo a un servicio como Supabase Storage
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
        description: "Los cambios se han guardado correctamente."
      });
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
        description: "La nueva foto se ha agregado correctamente."
      });
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
        description: "La foto se ha eliminado correctamente."
      });
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
        description: "El orden de las fotos se ha actualizado."
      });
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
