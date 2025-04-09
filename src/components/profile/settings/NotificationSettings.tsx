
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PushNotificationSettings from "@/components/PushNotificationSettings";

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const handleNotificationSave = () => {
    toast({
      title: "Preferencias de notificación actualizadas",
      description: "Tus preferencias de notificación se han actualizado.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Preferencias de correo</h3>
          <p className="text-sm text-muted-foreground">
            Configura cómo quieres recibir notificaciones por correo electrónico.
          </p>
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
          <div className="flex justify-end">
            <Button onClick={handleNotificationSave}>Guardar preferencias</Button>
          </div>
        </CardContent>
      </Card>
      
      <PushNotificationSettings />
    </>
  );
};

export default NotificationSettings;
