
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  website: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Type assertion to work around missing profiles table in generated types
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil.",
          variant: "destructive"
        });
      } else {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Debes estar autenticado para actualizar tu perfil.",
          variant: "destructive"
        });
        return false;
      }

      // Type assertion to work around missing profiles table in generated types
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "No se pudo actualizar el perfil.",
          variant: "destructive"
        });
        return false;
      }

      await fetchProfile(); // Refresh profile data
      
      toast({
        title: "Éxito",
        description: "Perfil actualizado correctamente."
      });
      return true;
    } catch (error) {
      console.error('Error in updateProfile:', error);
      toast({
        title: "Error",
        description: "Error inesperado al actualizar el perfil.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};
