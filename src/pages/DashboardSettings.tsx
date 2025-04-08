
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import PushNotificationSettings from "@/components/PushNotificationSettings";

const DashboardSettings = () => {
  const { toast } = useToast();
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const [username, setUsername] = useState("usuario_fotografo");
  const [name, setName] = useState("Juan García");
  const [email, setEmail] = useState("juan.garcia@example.com");
  const [bio, setBio] = useState("Fotógrafo aficionado, amante de los paisajes");
  const [website, setWebsite] = useState("www.mipaginaweb.com");
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");

  const handleProfileSave = () => {
    // Mock API call
    toast({
      title: "Perfil guardado",
      description: "Los cambios en tu perfil han sido guardados.",
    });
  };

  const handleSocialProfileSave = () => {
    // Mock API call
    toast({
      title: "Perfiles sociales actualizados",
      description: "Tus perfiles sociales se han actualizado correctamente.",
    });
  };

  const handleNotificationSave = () => {
    // Mock API call
    toast({
      title: "Preferencias de notificación actualizadas",
      description: "Tus preferencias de notificación se han actualizado.",
    });
  };

  const handleDeleteAccount = () => {
    // Show confirmation dialog in real app
    toast({
      title: "Esta acción requiere confirmación",
      description: "Para eliminar tu cuenta, contacta con soporte.",
      variant: "destructive",
    });
  };

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Gestiona tu cuenta y preferencias.
          </p>
        </div>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="social">Perfiles Sociales</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>
                  Actualiza tu información de perfil y cómo te ven otros usuarios.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarUrl} alt="Avatar" />
                      <AvatarFallback>JG</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-4">
                      Cambiar avatar
                    </Button>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio web</Label>
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleProfileSave}>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfiles Sociales</CardTitle>
                <CardDescription>
                  Conecta tus redes sociales para mostrarlas en tu perfil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="@nombreusuario" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="@nombreusuario" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="facebook.com/nombreusuario" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/nombreusuario" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSocialProfileSave}>Conectar perfiles</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de correo</CardTitle>
                <CardDescription>
                  Configura cómo quieres recibir notificaciones por correo electrónico.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones vía correo electrónico.
                    </p>
                  </div>
                  <Switch
                    checked={notificationEmail}
                    onCheckedChange={setNotificationEmail}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletters</p>
                    <p className="text-sm text-muted-foreground">
                      Recibe actualizaciones sobre concursos y eventos.
                    </p>
                  </div>
                  <Switch
                    checked={newsletter}
                    onCheckedChange={setNewsletter}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Correos promocionales</p>
                    <p className="text-sm text-muted-foreground">
                      Recibe ofertas y promociones de nuestros socios.
                    </p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationSave}>Guardar preferencias</Button>
              </CardFooter>
            </Card>
            
            <PushNotificationSettings />
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>
                  Personaliza la apariencia de la plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo oscuro</p>
                    <p className="text-sm text-muted-foreground">
                      Activa el modo oscuro para reducir el brillo de la pantalla.
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad de la cuenta</CardTitle>
                <CardDescription>
                  Actualiza tu contraseña y configura la seguridad de tu cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Actualizar contraseña</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eliminar cuenta</CardTitle>
                <CardDescription>
                  Eliminar permanentemente tu cuenta y todos tus datos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Esta acción no se puede deshacer. Se eliminarán permanentemente
                  todos tus datos, fotos y participación en concursos.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  Eliminar cuenta
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardSettings;
