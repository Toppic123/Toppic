
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage, AvatarUpload } from "@/components/ui/avatar";
import { Camera, Trophy, MapPin, MessageCircle, Send, Trash2, AlertTriangle, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import PhotoComments from "@/components/PhotoComments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const { username } = useParams<{ username?: string }>();
  const { toast } = useToast();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  // Mock user data - in a real app this would come from an API
  const user = {
    id: "1",
    username: username || "usuario",
    name: "Usuario de Ejemplo",
    bio: "Fotógrafo aficionado y amante de la naturaleza",
    avatar: "https://i.pravatar.cc/150?img=8",
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

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const isCurrentUser = !username || username === "usuario"; // In a real app, this would check if the profile belongs to the logged-in user

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-4xl mx-auto py-12 px-4"
    >
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {isCurrentUser ? (
              <AvatarUpload
                size="md"
                previewUrl={profileImagePreview || user.avatar}
                onImageSelect={handleProfileImageSelect}
                className="h-24 w-24"
              />
            ) : (
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
              
              <p className="mb-4">{user.bio}</p>
              
              <div className="flex justify-center md:justify-start space-x-6">
                <div className="text-center">
                  <div className="font-medium">{user.stats.contests}</div>
                  <div className="text-xs text-muted-foreground">Concursos</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{user.stats.wins}</div>
                  <div className="text-xs text-muted-foreground">Victorias</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{user.stats.photos}</div>
                  <div className="text-xs text-muted-foreground">Fotos</div>
                </div>
              </div>
              
              {isCurrentUser && (
                <div className="mt-6 flex justify-center md:justify-start">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar cuenta
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos tus datos asociados.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                          Eliminar cuenta
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
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
        </TabsList>
        <TabsContent value="photos">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="space-y-3">
                <div 
                  className="group relative overflow-hidden rounded-lg cursor-pointer" 
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white font-medium truncate">{photo.title}</h3>
                    <p className="text-white/80 text-sm truncate">{photo.contestName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="contests">
          <div className="space-y-4">
            {[1, 2, 3].map((contest) => (
              <Card key={contest}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Concurso Fotográfico {contest}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(2023, contest % 12, contest + 10).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {contest === 1 && (
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        <Trophy className="h-3 w-3 mr-1" /> Ganador
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array(contest + 1).fill(null).map((_, i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/${user.username}${contest}${i}/120/80`}
                        alt={`Foto ${i + 1} del concurso ${contest}`}
                        className="w-20 h-14 object-cover rounded"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Photo Detail Dialog with Comments */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[800px] flex flex-col p-0 gap-0">
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base">{selectedPhoto?.title}</DialogTitle>
              <div className="text-sm text-muted-foreground">
                {selectedPhoto?.contestName}
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhoto?.imageUrl} 
                alt={selectedPhoto?.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="col-span-2 flex flex-col border-l">
              {selectedPhoto && <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Profile;
