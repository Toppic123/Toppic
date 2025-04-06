
import { useState } from "react";
import { Trophy, Camera, Calendar } from "lucide-react";
import { AvatarUpload } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type UserProfileProps = {
  username: string;
  fullName: string;
  avatarUrl?: string;
  contestsParticipated: number;
  contestsWon: number;
  photosUploaded: number;
  joinDate: string;
  onUpdateAvatar?: (imageUrl: string) => void;
};

const UserProfile = ({
  username,
  fullName,
  avatarUrl,
  contestsParticipated,
  contestsWon,
  photosUploaded,
  joinDate,
  onUpdateAvatar,
}: UserProfileProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(avatarUrl);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    // Create a preview of the selected image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);
    
    // In a real application, we would upload the file to a server here
    // For demo purposes, we'll just use the local preview
    if (onUpdateAvatar) {
      // Simulating an upload delay
      setTimeout(() => {
        onUpdateAvatar(objectUrl);
        setIsUploading(false);
        toast({
          title: "Foto actualizada",
          description: "Tu foto de perfil ha sido actualizada exitosamente."
        });
      }, 1000);
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <AvatarUpload 
              previewUrl={previewUrl}
              onImageSelect={handleImageSelect}
              size="lg"
              className="cursor-pointer"
              isUploading={isUploading}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground">@{username}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm">{contestsWon} ganados</span>
              </div>
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{photosUploaded} fotos</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Desde {new Date(joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Concursos participados</p>
            <p className="text-2xl font-bold">{contestsParticipated}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Concursos ganados</p>
            <p className="text-2xl font-bold">{contestsWon}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ratio de victoria</p>
            <p className="text-2xl font-bold">
              {contestsParticipated > 0 
                ? `${Math.round((contestsWon / contestsParticipated) * 100)}%` 
                : "0%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
