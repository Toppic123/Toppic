
import { useState, useEffect } from "react";
import { Bell, MessageSquare, Award, Trophy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: JSX.Element;
}

const PushNotificationSettings = () => {
  const { toast } = useToast();
  const [notificationPermission, setNotificationPermission] = useState<string>("default");
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "comments",
      title: "Comentarios en fotos",
      description: "Recibe notificaciones cuando alguien comente en tus fotos",
      enabled: true,
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />
    },
    {
      id: "contest_results",
      title: "Resultados de concursos",
      description: "Recibe notificaciones sobre los resultados de concursos en los que participas",
      enabled: true,
      icon: <Award className="h-4 w-4 text-amber-500" />
    },
    {
      id: "contest_winner",
      title: "Ganador de concurso",
      description: "Recibe notificaciones cuando ganes un concurso",
      enabled: true,
      icon: <Trophy className="h-4 w-4 text-green-500" />
    },
    {
      id: "voter_winner",
      title: "Ganador como votante",
      description: "Recibe notificaciones si ganas un premio como votante",
      enabled: true,
      icon: <Check className="h-4 w-4 text-purple-500" />
    }
  ]);

  // Check notification permission status on load
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === "granted") {
          toast({
            title: "Notificaciones activadas",
            description: "Ahora recibirás notificaciones de actividad importante"
          });
        } else {
          toast({
            title: "Notificaciones no permitidas",
            description: "No recibirás notificaciones push. Puedes cambiar esto en la configuración del navegador.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        toast({
          title: "Error",
          description: "No se pudo solicitar permiso para notificaciones",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Notificaciones no soportadas",
        description: "Tu navegador no soporta notificaciones push",
        variant: "destructive"
      });
    }
  };

  const toggleNotificationSetting = (id: string) => {
    setNotificationSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
    
    toast({
      title: "Preferencia actualizada",
      description: "Tu configuración de notificaciones ha sido actualizada"
    });
  };

  const saveNotificationSettings = () => {
    // Here you would typically save these settings to a database
    console.log("Saving notification settings:", notificationSettings);
    
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias de notificaciones han sido guardadas"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notificaciones Push
        </CardTitle>
        <CardDescription>
          Configura qué notificaciones deseas recibir en tu dispositivo
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {notificationPermission !== "granted" && (
          <Alert className="mb-6">
            <AlertDescription>
              {notificationPermission === "denied" ? (
                <span>Las notificaciones están bloqueadas. Por favor, permite las notificaciones en la configuración de tu navegador.</span>
              ) : (
                <div className="flex items-center justify-between">
                  <span>Necesitamos tu permiso para enviar notificaciones</span>
                  <Button size="sm" onClick={requestNotificationPermission}>
                    Permitir notificaciones
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-6">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  {setting.icon}
                  <h3 className="ml-2 font-medium">{setting.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <Switch
                checked={setting.enabled}
                onCheckedChange={() => toggleNotificationSetting(setting.id)}
                disabled={notificationPermission !== "granted"}
              />
            </div>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex justify-end">
          <Button onClick={saveNotificationSettings}>
            Guardar preferencias
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationSettings;
