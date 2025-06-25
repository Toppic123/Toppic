
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
      
      // Join with profiles table to get user names instead of emails
      const { data, error } = await supabase
        .from('photo_comments')
        .select(`
          id,
          photo_id,
          user_id,
          comment_text,
          created_at,
          updated_at,
          profiles!inner(name, avatar_url)
        `)
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

      // Transform the data to include profile information as username
      const transformedComments = data?.map(comment => ({
        id: comment.id,
        photo_id: comment.photo_id,
        user_id: comment.user_id,
        username: comment.profiles?.name || 'Usuario Anónimo', // Use name instead of email
        avatar_url: comment.profiles?.avatar_url,
        comment_text: comment.comment_text,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      })) || [];

      setComments(transformedComments);
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para comentar.",
          variant: "destructive",
        });
        return;
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
          username: profile?.name || 'Usuario Anónimo', // Store name instead of email
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
        return;
      }

      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado exitosamente.",
      });

      // Refresh comments
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al añadir el comentario.",
        variant: "destructive",
      });
    }
  };

  return {
    comments,
    isLoading,
    addComment,
    fetchComments
  };
};
