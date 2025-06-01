
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageCircle, Share, ArrowLeft, Send, User, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileVotingProps {
  onNavigate: (screen: 'contests' | 'home' | 'profile') => void;
}

interface Photo {
  id: number;
  image: string;
  photographer: string;
  title: string;
  contest: string;
  comments: Comment[];
  votes: number;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

const mockPhotos: Photo[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    photographer: "María López",
    title: "Flores de primavera",
    contest: "Primavera en Barcelona",
    votes: 142,
    comments: [
      { id: "1", user: "Carlos", text: "¡Increíble foto!", timestamp: new Date() },
      { id: "2", user: "Ana", text: "Me encanta la composición", timestamp: new Date() }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    photographer: "Carlos Ruiz",
    title: "Geometría urbana",
    contest: "Arquitectura Urbana",
    votes: 98,
    comments: [
      { id: "3", user: "Pedro", text: "Excelente perspectiva", timestamp: new Date() }
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    photographer: "Ana García",
    title: "Atardecer dorado",
    contest: "Vida en la Playa",
    votes: 205,
    comments: []
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    photographer: "Luis Martín",
    title: "Bosque misterioso",
    contest: "Naturaleza Salvaje",
    votes: 167,
    comments: []
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    photographer: "Sofia Chen",
    title: "Refugio en la montaña",
    contest: "Arquitectura Rural",
    votes: 89,
    comments: []
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1544737151500-6e4b999de2a9?w=400",
    photographer: "Roberto Silva",
    title: "Reflejos urbanos",
    contest: "Ciudad Nocturna",
    votes: 234,
    comments: []
  }
];

const MobileVoting = ({ onNavigate }: MobileVotingProps) => {
  const { toast } = useToast();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [newComment, setNewComment] = useState("");

  const handleShare = (photo: Photo) => {
    const shareData = {
      title: `${photo.title} por ${photo.photographer}`,
      text: `Mira esta increíble foto de ${photo.photographer} en TOPPICS`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        console.error('Error al compartir:', err);
        fallbackShare(photo);
      });
    } else {
      fallbackShare(photo);
    }
  };

  const fallbackShare = (photo: Photo) => {
    const text = `Mira esta increíble foto: ${photo.title} por ${photo.photographer}`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles"
      });
    });
  };

  const handleAddComment = (photoId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "Tú",
      text: newComment.trim(),
      timestamp: new Date()
    };

    const updatedPhotos = photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, comments: [...photo.comments, comment] }
        : photo
    );
    
    setPhotos(updatedPhotos);

    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto({
        ...selectedPhoto,
        comments: [...selectedPhoto.comments, comment]
      });
    }

    setNewComment("");
    toast({
      title: "Comentario añadido",
      description: "Tu comentario ha sido publicado"
    });
  };

  const openPhotoDetail = (photo: Photo) => {
    const updatedPhoto = photos.find(p => p.id === photo.id) || photo;
    setSelectedPhoto(updatedPhoto);
  };

  const closePhotoDetail = () => {
    setSelectedPhoto(null);
  };

  if (selectedPhoto) {
    return (
      <div className="h-full bg-black overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center justify-between p-4 text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={closePhotoDetail}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Foto</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('profile')}
              className="text-white hover:bg-white/20 p-2"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Photo */}
        <div className="relative h-1/2">
          <img 
            src={selectedPhoto.image}
            alt={selectedPhoto.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Photo Info and Comments */}
        <div className="h-1/2 bg-white p-4 flex flex-col">
          <div className="mb-4">
            <Badge className="mb-2">{selectedPhoto.contest}</Badge>
            <h3 className="text-xl font-semibold mb-1">{selectedPhoto.title}</h3>
            <p className="text-gray-600">por {selectedPhoto.photographer}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">{selectedPhoto.votes} votos</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShare(selectedPhoto)}
                className="text-gray-600"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 flex flex-col">
            <h4 className="font-semibold mb-3">Comentarios ({selectedPhoto.comments.length})</h4>
            
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {selectedPhoto.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
              {selectedPhoto.comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex items-center space-x-2 pt-2 border-t">
              <Input
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment(selectedPhoto.id);
                  }
                }}
              />
              <Button 
                size="sm"
                onClick={() => handleAddComment(selectedPhoto.id)}
                disabled={!newComment.trim()}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Fotos</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('profile')}
            className="text-gray-600 hover:bg-gray-100 p-2"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => openPhotoDetail(photo)}
            >
              <div className="aspect-square relative">
                <img 
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{photo.title}</h3>
                <p className="text-xs text-gray-500 truncate">por {photo.photographer}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-gray-600">{photo.votes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{photo.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileVoting;
