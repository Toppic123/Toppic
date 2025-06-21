
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type FeaturedGalleryRow = Database['public']['Tables']['featured_gallery']['Row'];
type ContestPhotoRow = Database['public']['Tables']['contest_photos']['Row'];

export interface FeaturedPhoto extends FeaturedGalleryRow {
  contest_photos?: ContestPhotoRow;
}

export const useFeaturedGallery = () => {
  const [featuredPhotos, setFeaturedPhotos] = useState<FeaturedPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedPhotos();
  }, []);

  const fetchFeaturedPhotos = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('featured_gallery')
        .select(`
          *,
          contest_photos (
            image_url,
            photographer_name,
            photographer_avatar,
            contest_id
          )
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching featured photos:', error);
        toast({
          title: "Error al cargar galería destacada",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setFeaturedPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching featured photos:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar la galería destacada.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToFeatured = async (photoId: string, title: string, description?: string) => {
    try {
      // Get the next display order
      const { data: maxOrder } = await supabase
        .from('featured_gallery')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      const nextOrder = (maxOrder?.display_order || 0) + 1;

      const { error } = await supabase
        .from('featured_gallery')
        .insert({
          photo_id: photoId,
          title,
          description,
          display_order: nextOrder,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Foto añadida a destacados",
        description: "La foto ha sido añadida a la galería destacada.",
      });

      fetchFeaturedPhotos();
    } catch (error: any) {
      console.error('Error adding to featured:', error);
      toast({
        title: "Error al destacar foto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromFeatured = async (featuredId: string) => {
    try {
      const { error } = await supabase
        .from('featured_gallery')
        .update({ is_active: false })
        .eq('id', featuredId);

      if (error) throw error;

      toast({
        title: "Foto removida de destacados",
        description: "La foto ya no aparece en la galería destacada.",
      });

      fetchFeaturedPhotos();
    } catch (error: any) {
      console.error('Error removing from featured:', error);
      toast({
        title: "Error al remover foto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    featuredPhotos,
    isLoading,
    addToFeatured,
    removeFromFeatured,
    fetchFeaturedPhotos
  };
};
