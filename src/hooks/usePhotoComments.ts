
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  useEffect(() => {
    if (photoId) {
      fetchComments();
    }
  }, [photoId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
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

      if (data) {
        setComments(data);
      }
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

  const addComment = async (commentText: string) => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para comentar.",
        variant: "destructive",
      });
      return false;
    }

    if (!commentText.trim()) {
      return false;
    }

    try {
      // Get user name from multiple sources, prioritizing display name over email
      let displayName = user.user_metadata?.name || 
                       user.user_metadata?.full_name || 
                       user.user_metadata?.display_name;
      
      // If no name in metadata, try to extract name from email
      if (!displayName && user.email) {
        displayName = user.email.split('@')[0];
      }
      
      // Final fallback
      if (!displayName) {
        displayName = 'Usuario';
      }

      const { data, error } = await supabase
        .from('photo_comments')
        .insert({
          photo_id: photoId,
          user_id: user.id,
          username: displayName,
          avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`,
          comment_text: commentText.trim()
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Error al añadir comentario",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data) {
        setComments(prev => [data, ...prev]);
        toast({
          title: "Comentario añadido",
          description: "Tu comentario ha sido publicado correctamente."
        });
        return true;
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al añadir el comentario.",
        variant: "destructive",
      });
    }
    
    return false;
  };

  const updateComment = async (commentId: string, newText: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('photo_comments')
        .update({ 
          comment_text: newText.trim(),
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

      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, comment_text: newText.trim(), updated_at: new Date().toISOString() }
          : comment
      ));

      toast({
        title: "Comentario actualizado",
        description: "Tu comentario ha sido actualizado correctamente."
      });
      return true;
    } catch (error) {
      console.error('Error updating comment:', error);
      return false;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return false;

    try {
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

      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast({
        title: "Comentario eliminado",
        description: "Tu comentario ha sido eliminado correctamente."
      });
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  };

  return {
    comments,
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    refreshComments: fetchComments
  };
};
