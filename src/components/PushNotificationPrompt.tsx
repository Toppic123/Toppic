import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PushNotificationPromptProps {
  onClose: () => void;
  onEnable: () => void;
}

const PushNotificationPrompt = ({ onClose, onEnable }: PushNotificationPromptProps) => {
  const { toast } = useToast();

  const handleEnableNotifications = async () => {
    try {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
          toast({
            title: "¡Notificaciones activadas!",
            description: "Ahora recibirás notificaciones de concursos y actualizaciones.",
          });
          onEnable();
        } else {
          toast({
            title: "Notificaciones no activadas",
            description: "Puedes activarlas más tarde desde la configuración de tu navegador.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Notificaciones no disponibles",
          description: "Tu navegador no soporta notificaciones push.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al activar las notificaciones.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Activa las notificaciones</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Recibe notificaciones sobre nuevos concursos cerca de ti y actualizaciones importantes.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={handleEnableNotifications} className="flex-1">
            <Bell className="h-4 w-4 mr-2" />
            Activar notificaciones
          </Button>
          <Button variant="outline" onClick={onClose}>
            Ahora no
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationPrompt;