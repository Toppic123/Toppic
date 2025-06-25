
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PhotoComment {
  id: string;
  photo_id: string;
  user_id?: string;
  username: string;
  avatar_url?: string;
  comment_text: string;
  created_at: string;
  updated_at: string;
}

export const usePhotoComments = (photoId: string) => {
  const [comments, setComments] = useState<PhotoComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (photoId) {
      fetchComments();
    }
  }, [photoId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      
      // Simplified query without joining profiles table to avoid relation issues
      const { data, error } = await supabase
        .from('photo_comments')
        .select('*')
        .eq('photo_id', photoId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: "Error al cargar comentarios",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar los comentarios.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (commentText: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para comentar.",
          variant: "destructive",
        });
        return false;
      }

      // Get user profile for the name
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, avatar_url')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('photo_comments')
        .insert({
          photo_id: photoId,
          user_id: user.id,
          username: profile?.name || 'Usuario Anónimo',
          avatar_url: profile?.avatar_url,
          comment_text: commentText,
        });

      if (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Error al añadir comentario",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado exitosamente.",
      });

      // Refresh comments
      fetchComments();
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al añadir el comentario.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateComment = async (commentId: string, newText: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para editar comentarios.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('photo_comments')
        .update({ 
          comment_text: newText,
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating comment:', error);
        toast({
          title: "Error al actualizar comentario",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Comentario actualizado",
        description: "Tu comentario ha sido actualizado exitosamente.",
      });

      // Refresh comments
      fetchComments();
      return true;
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al actualizar el comentario.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteComment = async (commentId: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para eliminar comentarios.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('photo_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting comment:', error);
        toast({
          title: "Error al eliminar comentario",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Comentario eliminado",
        description: "Tu comentario ha sido eliminado exitosamente.",
      });

      // Refresh comments
      fetchComments();
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al eliminar el comentario.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    comments,
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    fetchComments
  };
};
