
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Bell, Lock, Eye, Image, Shield, Sun, Moon, SunMoon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente."
    });
  };
  
  return (
    <div className="container max-w-5xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground mb-8">
          Administra tus preferencias y configuración de la cuenta.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Cuenta</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Privacidad</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Apariencia</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Contenido</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Información de la cuenta</CardTitle>
                <CardDescription>
                  Actualiza tu información personal y preferencias de la cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Input id="bio" placeholder="Cuéntanos un poco sobre ti..." />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Preferencias de la cuenta</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-profile">Perfil público</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que otros usuarios vean tu perfil
                      </p>
                    </div>
                    <Switch id="public-profile" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-email">Mostrar correo electrónico</Label>
                      <p className="text-sm text-muted-foreground">
                        Mostrar tu correo electrónico en tu perfil público
                      </p>
                    </div>
                    <Switch id="show-email" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-[#4891AA] hover:bg-[#4891AA]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo y cuándo recibes notificaciones.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-contests">Nuevos concursos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones sobre nuevos concursos
                      </p>
                    </div>
                    <Switch id="new-contests" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="contest-results">Resultados de concursos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones cuando se anuncien resultados
                      </p>
                    </div>
                    <Switch id="contest-results" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="votes">Votos recibidos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones cuando alguien vote tus fotos
                      </p>
                    </div>
                    <Switch id="votes" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comments">Comentarios</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones cuando alguien comente tus fotos
                      </p>
                    </div>
                    <Switch id="comments" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Correos promocionales</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir correos sobre ofertas y novedades
                      </p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-[#4891AA] hover:bg-[#4891AA]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacidad y seguridad</CardTitle>
                <CardDescription>
                  Gestiona la privacidad de tu cuenta y opciones de seguridad.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Seguridad de la cuenta</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="text-sm font-medium">Privacidad</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Autenticación de dos factores</Label>
                      <p className="text-sm text-muted-foreground">
                        Añade una capa extra de seguridad a tu cuenta
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-sharing">Compartir datos de uso</Label>
                      <p className="text-sm text-muted-foreground">
                        Ayúdanos a mejorar compartiendo datos anónimos de uso
                      </p>
                    </div>
                    <Switch id="data-sharing" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-[#4891AA] hover:bg-[#4891AA]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>
                  Personaliza la apariencia de la plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Tema</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col justify-center">
                      <Sun className="h-10 w-10" />
                      <span className="mt-2">Claro</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col justify-center">
                      <Moon className="h-10 w-10" />
                      <span className="mt-2">Oscuro</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col justify-center">
                      <SunMoon className="h-10 w-10" />
                      <span className="mt-2">Sistema</span>
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="text-sm font-medium">Idioma</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Button variant="outline" className="justify-start">Español</Button>
                    <Button variant="outline" className="justify-start">English</Button>
                    <Button variant="outline" className="justify-start">Français</Button>
                    <Button variant="outline" className="justify-start">Deutsch</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-[#4891AA] hover:bg-[#4891AA]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de contenido</CardTitle>
                <CardDescription>
                  Administra la visibilidad de tus fotografías y participación en concursos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-in-gallery">Mostrar en la galería pública</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que tus fotografías aparezcan en la galería pública
                      </p>
                    </div>
                    <Switch id="show-in-gallery" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-comments">Permitir comentarios</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que otros usuarios comenten tus fotografías
                      </p>
                    </div>
                    <Switch id="allow-comments" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-exif">Mostrar datos EXIF</Label>
                      <p className="text-sm text-muted-foreground">
                        Muestra los metadatos técnicos de tus fotografías
                      </p>
                    </div>
                    <Switch id="show-exif" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="text-sm font-medium">Preferencias de concursos</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notify-contests">Notificar concursos relevantes</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir sugerencias de concursos basados en tu perfil y estilo
                      </p>
                    </div>
                    <Switch id="notify-contests" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-submit">Envío automático a concursos</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que tus fotos sean enviadas automáticamente a concursos compatibles
                      </p>
                    </div>
                    <Switch id="auto-submit" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-[#4891AA] hover:bg-[#4891AA]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default DashboardSettings;
