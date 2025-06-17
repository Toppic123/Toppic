
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

interface MobilePhotoDetailProps {
  photo: {
    id: number;
    url: string;
    author: string;
    description: string;
    likes: number;
  };
  onBack: () => void;
}

const mockComments = [
  {
    id: 1,
    author: "Ana López",
    text: "¡Qué foto tan hermosa! Me encanta la composición.",
    time: "hace 2 horas"
  },
  {
    id: 2,
    author: "Carlos Ruiz",
    text: "Excelente captura del momento. Los colores son perfectos.",
    time: "hace 1 día"
  },
  {
    id: 3,
    author: "María González",
    text: "Esta imagen transmite mucha paz. Felicidades!",
    time: "hace 2 días"
  }
];

const MobilePhotoDetail = ({ photo, onBack }: MobilePhotoDetailProps) => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Tú",
        text: newComment.trim(),
        time: "ahora"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 flex items-center flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600 hover:bg-gray-100 p-2 mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Foto de {photo.author}</h1>
      </div>

      {/* Photo */}
      <div className="bg-black flex items-center justify-center flex-shrink-0">
        <img 
          src={photo.url} 
          alt={photo.description}
          className="max-w-full max-h-80 object-contain"
        />
      </div>

      {/* Photo Info */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{photo.author}</h3>
          <div className="text-sm text-gray-500">
            {photo.likes} me gusta
          </div>
        </div>
        <p className="text-gray-600 text-sm">{photo.description}</p>
      </div>

      {/* Comments Section - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Comentarios ({comments.length})</h4>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Spacer to ensure content is not hidden behind comment input */}
        <div className="h-24"></div>
      </div>

      {/* Add Comment - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0 pb-20">
        <div className="flex space-x-3">
          <Textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 resize-none min-h-[40px] max-h-[100px]"
            rows={1}
          />
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobilePhotoDetail;
