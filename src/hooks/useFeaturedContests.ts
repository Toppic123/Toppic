
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type FeaturedContestRow = Database['public']['Tables']['featured_contests']['Row'];

export interface FeaturedContest extends FeaturedContestRow {
  contests?: {
    id: string;
    title: string;
    organizer: string;
    location: string;
    image_url: string;
    status: string;
  };
}

export const useFeaturedContests = () => {
  const [featuredContests, setFeaturedContests] = useState<FeaturedContest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedContests();
  }, []);

  const fetchFeaturedContests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('featured_contests')
        .select(`
          *,
          contests (
            id,
            title,
            organizer,
            location,
            image_url,
            status
          )
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching featured contests:', error);
        toast({
          title: "Error al cargar concursos destacados",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setFeaturedContests(data);
      }
    } catch (error) {
      console.error('Error fetching featured contests:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar los concursos destacados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToFeatured = async (contestId: string) => {
    try {
      // Get the next display order
      const { data: maxOrder } = await supabase
        .from('featured_contests')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      const nextOrder = (maxOrder?.display_order || 0) + 1;

      const { error } = await supabase
        .from('featured_contests')
        .insert({
          contest_id: contestId,
          display_order: nextOrder,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Concurso destacado",
        description: "El concurso ha sido añadido a la página principal.",
      });

      fetchFeaturedContests();
    } catch (error: any) {
      console.error('Error adding to featured:', error);
      toast({
        title: "Error al destacar concurso",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromFeatured = async (featuredId: string) => {
    try {
      const { error } = await supabase
        .from('featured_contests')
        .update({ is_active: false })
        .eq('id', featuredId);

      if (error) throw error;

      toast({
        title: "Concurso removido",
        description: "El concurso ya no aparece en la página principal.",
      });

      fetchFeaturedContests();
    } catch (error: any) {
      console.error('Error removing from featured:', error);
      toast({
        title: "Error al remover concurso",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateDisplayOrder = async (featuredId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('featured_contests')
        .update({ display_order: newOrder })
        .eq('id', featuredId);

      if (error) throw error;

      fetchFeaturedContests();
    } catch (error: any) {
      console.error('Error updating display order:', error);
      toast({
        title: "Error al actualizar orden",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    featuredContests,
    isLoading,
    addToFeatured,
    removeFromFeatured,
    updateDisplayOrder,
    fetchFeaturedContests
  };
};
