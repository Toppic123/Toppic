
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ContestPhotoRow = Database['public']['Tables']['contest_photos']['Row'];

export interface ContestPhoto extends ContestPhotoRow {}

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
      console.log('Fetching photos for contest:', contestId);
      
      // Fetch all photos for this contest (approved and pending)
      const { data, error } = await supabase
        .from('contest_photos')
        .select('*')
        .eq('contest_id', contestId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contest photos:', error);
        toast({
          title: "Error al cargar fotos",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Photos fetched successfully:', data);
      
      if (data) {
        setPhotos(data);
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

  const checkUserHasPhoto = async (contestId: string, userId?: string) => {
    if (!userId) return false;
    
    try {
      const { data, error } = await supabase
        .from('contest_photos')
        .select('id')
        .eq('contest_id', contestId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error checking user photo:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking user photo:', error);
      return false;
    }
  };

  const uploadPhoto = async (
    file: File, 
    photographerName: string, 
    description?: string, 
    autoApprove: boolean = false,
    userId?: string
  ) => {
    if (!contestId) return null;

    try {
      console.log('Starting photo upload process...', { 
        contestId, 
        photographerName, 
        description, 
        autoApprove,
        userId,
        fileSize: file.size,
        fileType: file.type
      });

      // Check if user already has a photo in this contest
      if (userId) {
        const hasPhoto = await checkUserHasPhoto(contestId, userId);
        if (hasPhoto) {
          toast({
            title: "Límite alcanzado",
            description: "Solo puedes subir una foto por concurso. Ya tienes una foto en este concurso.",
            variant: "destructive",
          });
          return null;
        }
      }

      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${contestId}/${fileName}`;

      console.log('Uploading to storage:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('contest-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contest-photos')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);

      // Insert photo record with user_id
      const { data, error } = await supabase
        .from('contest_photos')
        .insert({
          contest_id: contestId,
          image_url: publicUrl,
          photographer_name: photographerName,
          description: description,
          votes: 0,
          is_featured: false,
          status: autoApprove ? 'approved' : 'approved',
          user_id: userId || null
        })
        .select()
        .single();

      if (error) {
        console.error('Database insert error:', error);
        
        // Handle unique constraint violation
        if (error.code === '23505') {
          toast({
            title: "Límite alcanzado",
            description: "Solo puedes subir una foto por concurso. Ya tienes una foto en este concurso.",
            variant: "destructive",
          });
          return null;
        }
        
        throw error;
      }

      console.log('Photo record created:', data);

      toast({
        title: "Foto subida exitosamente",
        description: autoApprove 
          ? "La foto ha sido añadida y aprobada automáticamente."
          : "Tu foto ha sido enviada y está disponible en el concurso.",
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
      });

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

  // Get approved photos only (for public display)
  const approvedPhotos = photos.filter(photo => photo.status === 'approved');

  return {
    photos,
    approvedPhotos,
    isLoading,
    uploadPhoto,
    votePhoto,
    fetchContestPhotos,
    checkUserHasPhoto
  };
};
