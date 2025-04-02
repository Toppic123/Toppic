
import { useState } from "react";
import { Send, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  username: string;
  avatar?: string;
  text: string;
  timestamp: Date;
}

interface PhotoCommentsProps {
  photoId: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const PhotoComments = ({ photoId, onClose, isEmbedded = false }: PhotoCommentsProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  
  // Mock comments - in a real app this would come from an API
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "mariasanchez",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "¡Increíble foto! Me encanta la composición y los colores.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
    },
    {
      id: "2",
      username: "carlosgomez",
      avatar: "https://i.pravatar.cc/150?img=12",
      text: "Buen trabajo con la perspectiva. ¿Qué lente usaste?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    }
  ]);

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    // Add new comment
    const newComment: Comment = {
      id: Date.now().toString(),
      username: "usuario", // In a real app, this would be the current user
      avatar: "https://i.pravatar.cc/150?img=8", // In a real app, this would be the current user's avatar
      text: comment.trim(),
      timestamp: new Date()
    };
    
    setComments([newComment, ...comments]);
    setComment("");
    
    // Show success toast
    toast({
      title: "Comentario añadido",
      description: "Tu comentario ha sido publicado correctamente."
    });
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `Hace ${diffInSeconds} segundos`;
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Different styling for embedded vs modal view
  const commentBoxClasses = isEmbedded 
    ? "border-t border-gray-200 dark:border-gray-800 bg-background" 
    : "border shadow-sm";

  return (
    <Card className={commentBoxClasses}>
      {!isEmbedded && (
        <>
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <h3 className="text-sm font-medium">Comentarios ({comments.length})</h3>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <Separator />
        </>
      )}
      <ScrollArea className={isEmbedded ? "h-[200px]" : "h-[250px]"}>
        <CardContent className="p-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatar} alt={comment.username} />
                  <AvatarFallback>
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">@{comment.username}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay comentarios todavía. ¡Sé el primero en comentar!
            </div>
          )}
        </CardContent>
      </ScrollArea>
      <Separator />
      <CardFooter className="p-3">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Escribe un comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
            className="flex-1 h-9"
          />
          <Button 
            size="icon" 
            onClick={handleSubmitComment} 
            disabled={!comment.trim()}
            className="h-9 w-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PhotoComments;
