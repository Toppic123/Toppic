
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const DashboardSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [defaultDistance, setDefaultDistance] = useState("5");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente."
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="space-y-0.5 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Administra tus preferencias y ajustes de la cuenta.
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configura cómo quieres recibir actualizaciones sobre concursos y actividades.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe actualizaciones importantes sobre tus concursos y participaciones.
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Notificaciones push</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe alertas en tu navegador cuando haya actividad relevante.
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Privacidad</CardTitle>
            <CardDescription>
              Administra tu privacidad y permisos de ubicación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="location-sharing">Compartir ubicación</Label>
                <p className="text-sm text-muted-foreground">
                  Permite acceso a tu ubicación para encontrar concursos cercanos.
                </p>
              </div>
              <Switch
                id="location-sharing"
                checked={location}
                onCheckedChange={setLocation}
              />
            </div>
            
            <Separator />
            
            <div>
              <Label htmlFor="default-distance">Distancia predeterminada (km)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Radio máximo para buscar concursos cercanos.
              </p>
              <Input
                id="default-distance"
                type="number"
                min="1"
                max="50"
                value={defaultDistance}
                onChange={(e) => setDefaultDistance(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Apariencia</CardTitle>
            <CardDescription>
              Personaliza la apariencia de la aplicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Modo oscuro</Label>
                <p className="text-sm text-muted-foreground">
                  Cambia entre los temas claro y oscuro.
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Guardar cambios</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
