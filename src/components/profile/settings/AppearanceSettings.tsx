
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // useEffect only runs on the client, so we can safely access window
  useEffect(() => {
    setMounted(true);
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeChange = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  // If not mounted yet, don't render to avoid hydration mismatch
  if (!mounted) return null;

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
              Activa el modo oscuro para reducir el brillo de la pantalla y mejorar la visualización de fotografías.
            </p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={handleThemeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
