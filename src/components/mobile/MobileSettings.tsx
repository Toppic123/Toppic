
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProfileSettingsTabs from "@/components/profile/ProfileSettingsTabs";
import { AvatarUpload } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface MobileSettingsProps {
  onNavigate: (screen: 'profile' | 'contests' | 'upload' | 'voting') => void;
}

const MobileSettings = ({ onNavigate }: MobileSettingsProps) => {
  const { toast } = useToast();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  
  // Mock user data - in a real app this would come from context/API
  const userData = {
    name: "María García",
    email: "maria@example.com",
    bio: "Fotógrafa aficionada",
    website: "www.mariafotos.com",
    username: "maria_photos"
  };

  const handleProfileImageSelect = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setProfileImagePreview(e.target.result as string);
        toast({
          title: "Foto de perfil actualizada",
          description: "Tu foto de perfil ha sido actualizada correctamente."
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada correctamente.",
      variant: "destructive"
    });
    
    setTimeout(() => {
      onNavigate('contests');
    }, 2000);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('profile')}
          className="text-gray-600 hover:bg-gray-100 p-2 mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Configuración</h1>
      </div>

      {/* Profile Image Section */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Foto de Perfil</h3>
          <AvatarUpload 
            size="lg"
            previewUrl={profileImagePreview || "https://i.pravatar.cc/150?img=8"}
            onImageSelect={handleProfileImageSelect}
          />
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="p-4">
        <ProfileSettingsTabs 
          userData={userData}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default MobileSettings;
