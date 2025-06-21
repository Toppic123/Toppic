
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

  const fetchProfile = async () => {
    try {
      console.log('Fetching user profile...');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user found');
        setProfile(null);
        setLoading(false);
        return;
      }

      console.log('User found, fetching profile for:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, create one
          console.log('No profile found, creating new profile');
          const newProfile = {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || null,
            bio: null,
            website: null,
            username: null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating profile:', createError);
            toast({
              title: "Error",
              description: "No se pudo crear el perfil.",
              variant: "destructive"
            });
          } else {
            console.log('Profile created successfully:', createdProfile);
            setProfile(createdProfile);
          }
        } else {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error",
            description: "No se pudo cargar el perfil.",
            variant: "destructive"
          });
        }
      } else {
        console.log('Profile fetched successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      toast({
        title: "Error",
        description: "Error inesperado al cargar el perfil.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      console.log('Starting profile update with:', updates);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user for profile update');
        toast({
          title: "Error",
          description: "Debes estar autenticado para actualizar tu perfil.",
          variant: "destructive"
        });
        return false;
      }

      // Remove any undefined or null values that shouldn't be updated
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      console.log('Updating profile for user:', user.id, 'with clean data:', cleanUpdates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...cleanUpdates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "No se pudo actualizar el perfil.",
          variant: "destructive"
        });
        return false;
      }

      console.log('Profile updated successfully:', data);
      setProfile(data); // Update local state immediately
      
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
