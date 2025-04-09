
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Trophy, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import ProfileHeader from "@/components/profile/ProfileHeader";
import PhotoGallery from "@/components/profile/PhotoGallery";
import ContestsList from "@/components/profile/ContestsList";
import ProfileSettingsTabs from "@/components/profile/ProfileSettingsTabs";

const Profile = () => {
  const { username } = useParams<{ username?: string }>();
  const { toast } = useToast();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"participant" | "organizer">("participant");

  // Settings states  
  const [name, setName] = useState("Usuario de Ejemplo");
  const [email, setEmail] = useState("usuario@example.com");
  const [bio, setBio] = useState("Fotógrafo aficionado y amante de la naturaleza");
  const [website, setWebsite] = useState("www.mipaginaweb.com");
  
  // Mock user data - in a real app this would come from an API
  const user = {
    id: "1",
    username: username || "usuario",
    name: name,
    bio: bio,
    avatar: profileImagePreview || "https://i.pravatar.cc/150?img=8",
    location: "Madrid, España",
    stats: {
      contests: 12,
      wins: 3,
      photos: 47
    }
  };
  
  // Mock photos data
  const photos = Array(6).fill(null).map((_, i) => ({
    id: i.toString(),
    title: `Foto ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${user.username}${i}/500/300`,
    likes: Math.floor(Math.random() * 100),
    contestName: `Concurso de Fotografía ${i % 3 === 0 ? 'Urbana' : 'Natural'}`
  }));

  // Mock contests data
  const contests = [1, 2, 3].map(contest => ({
    id: contest,
    title: `Concurso Fotográfico ${contest}`,
    date: new Date(2023, contest % 12, contest + 10),
    photos: Array(contest + 1).fill(null).map((_, i) => 
      `https://picsum.photos/seed/${user.username}${contest}${i}/120/80`
    ),
    isWinner: contest === 1
  }));

  const handleProfileImageSelect = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setProfileImagePreview(e.target.result as string);
        
        // In a real app, this would upload the file to a server
        toast({
          title: "Foto de perfil actualizada",
          description: "Tu foto de perfil ha sido actualizada correctamente."
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would make an API call to delete the account
    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada correctamente.",
      variant: "destructive"
    });
    
    // In a real app, this would redirect to home page or login page
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const isCurrentUser = !username || username === "usuario"; // In a real app, this would check if the profile belongs to the logged-in user

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-4xl mx-auto py-12 px-4"
    >
      <ProfileHeader 
        user={user} 
        isCurrentUser={isCurrentUser}
        profileImagePreview={profileImagePreview}
        onProfileImageSelect={handleProfileImageSelect}
      />
      
      <Tabs defaultValue="photos">
        <TabsList className="mb-6">
          <TabsTrigger value="photos">
            <Camera className="h-4 w-4 mr-2" />
            Fotos
          </TabsTrigger>
          <TabsTrigger value="contests">
            <Trophy className="h-4 w-4 mr-2" />
            Concursos
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Ajustes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <PhotoGallery photos={photos} />
        </TabsContent>
        
        <TabsContent value="contests">
          <ContestsList contests={contests} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <ProfileSettingsTabs 
            userData={{ name, email, bio, website, username: user.username }}
            onDeleteAccount={handleDeleteAccount}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Profile;
