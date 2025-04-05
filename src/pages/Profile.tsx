import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import UserProfile from "@/components/UserProfile";

// Mock user data
const userData = {
  username: "mariaphotography",
  fullName: "Maria García",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  contestsParticipated: 15,
  contestsWon: 3,
  photosUploaded: 42,
  joinDate: "2023-01-15",
};

const Profile = () => {
  const [language, setLanguage] = useState("es");
  const [notificationSettings, setNotificationSettings] = useState({
    newContests: true,
    contestResults: true,
    votesAndComments: true,
  });
  const [userAvatar, setUserAvatar] = useState(userData.avatarUrl);
  const { toast } = useToast();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    toast({
      title: "Idioma actualizado",
      description: "El idioma de la aplicación ha sido cambiado."
    });
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting]
      };
      
      toast({
        title: newSettings[setting] ? "Notificaciones activadas" : "Notificaciones desactivadas",
        description: `Has ${newSettings[setting] ? "activado" : "desactivado"} las notificaciones de ${
          setting === "newContests" ? "concursos nuevos" : 
          setting === "contestResults" ? "resultados de concursos" :
          "votos y comentarios"
        }.`
      });
      
      return newSettings;
    });
  };

  const handleUpdateAvatar = (imageUrl: string) => {
    setUserAvatar(imageUrl);
  };

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        
        <div className="mb-8">
          <UserProfile 
            {...userData} 
            avatarUrl={userAvatar}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
        
        <Tabs defaultValue="gallery" className="mb-8">
          <TabsList>
            <TabsTrigger value="gallery">Mis fotos</TabsTrigger>
            <TabsTrigger value="contests">Mis concursos</TabsTrigger>
            <TabsTrigger value="settings">Ajustes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Mi galería</CardTitle>
                <CardDescription>Fotos que has subido a concursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Gallery would be rendered here */}
                  <div className="aspect-square bg-muted rounded-md animate-pulse"></div>
                  <div className="aspect-square bg-muted rounded-md animate-pulse"></div>
                  <div className="aspect-square bg-muted rounded-md animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contests">
            <Card>
              <CardHeader>
                <CardTitle>Mis concursos</CardTitle>
                <CardDescription>Concursos en los que has participado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contests would be rendered here */}
                  <div className="h-24 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-24 bg-muted rounded-md animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>
                  Ajustes y preferencias de tu cuenta
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Idioma
                    </h3>
                    <RadioGroup 
                      value={language} 
                      onValueChange={handleLanguageChange}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="es" id="es" />
                        <Label htmlFor="es" className="cursor-pointer">Español</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="en" id="en" />
                        <Label htmlFor="en" className="cursor-pointer">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fr" id="fr" />
                        <Label htmlFor="fr" className="cursor-pointer">Français</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="de" id="de" />
                        <Label htmlFor="de" className="cursor-pointer">Deutsch</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Notificaciones
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Concursos nuevos</h4>
                          <p className="text-sm text-muted-foreground">
                            Notificaciones sobre nuevos concursos disponibles
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.newContests}
                          onCheckedChange={() => handleNotificationToggle("newContests")}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Resultados de concursos</h4>
                          <p className="text-sm text-muted-foreground">
                            Notificaciones sobre resultados de concursos en los que participas
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.contestResults}
                          onCheckedChange={() => handleNotificationToggle("contestResults")}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Votos y comentarios</h4>
                          <p className="text-sm text-muted-foreground">
                            Notificaciones sobre interacciones en tus fotos
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.votesAndComments}
                          onCheckedChange={() => handleNotificationToggle("votesAndComments")}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Información de la cuenta</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Administra los datos asociados a tu cuenta.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline">Editar perfil</Button>
                      <Button variant="outline">Cambiar contraseña</Button>
                      <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                        Eliminar cuenta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
