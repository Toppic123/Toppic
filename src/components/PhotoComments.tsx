
import { useState, useEffect } from "react";
import { Send, X, UserCircle, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePhotoComments } from "@/hooks/usePhotoComments";
import { useAuth } from "@/contexts/AuthContext";
import ClickableUserProfile from "@/components/ClickableUserProfile";

interface PhotoCommentsProps {
  photoId: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const PhotoComments = ({ photoId, onClose, isEmbedded = false }: PhotoCommentsProps) => {
  const { user } = useAuth();
  const { comments, isLoading, addComment, updateComment, deleteComment } = usePhotoComments(photoId);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [commentInputVisible, setCommentInputVisible] = useState(true);
  
  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      setCommentInputVisible(true);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;
    
    const success = await addComment(comment);
    if (success) {
      setComment("");
    }
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const handleSaveEdit = async () => {
    if (!editingCommentId || !editingText.trim()) return;
    
    const success = await updateComment(editingCommentId, editingText);
    if (success) {
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleDeleteComment = async () => {
    if (!deletingCommentId) return;
    
    const success = await deleteComment(deletingCommentId);
    if (success) {
      setDeletingCommentId(null);
    }
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
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

  if (isLoading) {
    return (
      <Card className={commentBoxClasses}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-3 animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
        
        <ScrollArea className={isEmbedded ? (isMobile ? "h-[150px]" : "h-[200px]") : "h-[250px]"}>
          <CardContent className="p-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar_url} alt={comment.username} />
                    <AvatarFallback>
                      <UserCircle className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClickableUserProfile
                          photographer={comment.username}
                          photographerAvatar={comment.avatar_url}
                          size="sm"
                          showAvatar={false}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(comment.created_at)}
                          {comment.updated_at !== comment.created_at && " (editado)"}
                        </span>
                        {user && user.id === comment.user_id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditComment(comment.id, comment.comment_text)}>
                                <Edit className="h-3 w-3 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setDeletingCommentId(comment.id)}
                                className="text-destructive"
                              >
                                <Trash className="h-3 w-3 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSaveEdit();
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleSaveEdit} disabled={!editingText.trim()}>
                            Guardar
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm">{comment.comment_text}</p>
                    )}
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
        {commentInputVisible && (
          <CardFooter className="p-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder={user ? "Escribe un comentario..." : "Inicia sesión para comentar"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                className="flex-1 h-9"
                disabled={!user}
              />
              <Button 
                size="icon" 
                onClick={handleSubmitComment} 
                disabled={!comment.trim() || !user}
                className="h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deletingCommentId} onOpenChange={() => setDeletingCommentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente tu comentario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PhotoComments;
