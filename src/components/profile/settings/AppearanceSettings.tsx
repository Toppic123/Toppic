
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Apariencia</h3>
        <p className="text-sm text-muted-foreground">
          Personaliza la apariencia de la plataforma.
        </p>
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
  );
};

export default AppearanceSettings;
