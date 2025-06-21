
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ContestPhoto {
  id: string;
  contest_id: string;
  image_url: string;
  photographer_name: string;
  photographer_avatar?: string;
  description?: string;
  votes: number;
  ai_score?: number;
  is_featured: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export const useContestPhotos = (contestId?: string) => {
  const [photos, setPhotos] = useState<ContestPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (contestId) {
      fetchContestPhotos();
    }
  }, [contestId]);

  const fetchContestPhotos = async () => {
    if (!contestId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contest_photos' as any)
        .select('*')
        .eq('contest_id', contestId)
        .eq('status', 'approved')
        .order('ai_score', { ascending: false });
      
      if (error) {
        console.error('Error fetching contest photos:', error);
        toast({
          title: "Error al cargar fotos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setPhotos(data as ContestPhoto[]);
      }
    } catch (error) {
      console.error('Error fetching contest photos:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar las fotos del concurso.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPhoto = async (file: File, photographerName: string, description?: string) => {
    if (!contestId) return null;

    try {
      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `contest-photos/${contestId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('contest-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contest-photos')
        .getPublicUrl(filePath);

      // Insert photo record
      const { data, error } = await supabase
        .from('contest_photos' as any)
        .insert({
          contest_id: contestId,
          image_url: publicUrl,
          photographer_name: photographerName,
          description: description,
          votes: 0,
          is_featured: false,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Foto subida exitosamente",
        description: "Tu foto está siendo procesada por nuestro sistema de IA.",
      });

      // Refresh photos list
      fetchContestPhotos();
      return data;
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error al subir foto",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const votePhoto = async (photoId: string) => {
    try {
      const { error } = await supabase.rpc('increment_photo_votes', {
        photo_id: photoId
      } as any);

      if (error) throw error;

      // Update local state
      setPhotos(prev => prev.map(photo => 
        photo.id === photoId 
          ? { ...photo, votes: photo.votes + 1 }
          : photo
      ));

      toast({
        title: "Voto registrado",
        description: "Tu voto ha sido registrado exitosamente.",
      });
    } catch (error: any) {
      console.error('Error voting photo:', error);
      toast({
        title: "Error al votar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    photos,
    isLoading,
    uploadPhoto,
    votePhoto,
    fetchContestPhotos
  };
};
