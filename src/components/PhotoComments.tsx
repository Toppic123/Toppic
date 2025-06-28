
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePhotoComments } from "@/hooks/usePhotoComments";
import { useAuth } from "@/contexts/AuthContext";
import ClickableUserProfile from "@/components/ClickableUserProfile";

interface PhotoCommentsProps {
  photoId: string;
  isEmbedded?: boolean;
}

const PhotoComments = ({ photoId, isEmbedded = false }: PhotoCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const { comments, isLoading, addComment } = usePhotoComments(photoId);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para comentar",
        variant: "destructive"
      });
      return;
    }

    try {
      await addComment(newComment.trim());
      setNewComment("");
      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado correctamente"
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el comentario",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className={`${isEmbedded ? 'h-full' : ''} flex items-center justify-center p-4`}>
        <p className="text-muted-foreground">Cargando comentarios...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isEmbedded ? 'h-full' : 'min-h-[400px]'}`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold">Comentarios ({comments.length})</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay comentarios aún. ¡Sé el primero en comentar!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.avatar_url} alt={comment.username} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ClickableUserProfile 
                      photographer={comment.username}
                      photographerAvatar={comment.avatar_url}
                      size="sm"
                      showAvatar={false}
                    />
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm break-words">{comment.comment_text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      {user && (
        <div className="p-4 border-t">
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="min-h-[80px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {newComment.length}/500 caracteres
              </span>
              <Button 
                type="submit" 
                size="sm" 
                disabled={!newComment.trim()}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Comentar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhotoComments;
