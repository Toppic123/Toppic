
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const [language, setLanguage] = useState("es");
  const { toast } = useToast();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    toast({
      title: "Idioma actualizado",
      description: "El idioma de la aplicación ha sido cambiado."
    });
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground mb-8">
          Administra las preferencias de tu cuenta y del sistema.
        </p>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cuenta</CardTitle>
            <CardDescription>
              Ajustes relacionados con tu información personal y preferencias.
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
          
          <CardFooter className="flex justify-end">
            <Button>Guardar cambios</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configura cómo y cuándo recibes notificaciones.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Concursos nuevos</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones sobre nuevos concursos disponibles
                  </p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Resultados de concursos</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones sobre resultados de concursos en los que participas
                  </p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Votos y comentarios</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificaciones sobre interacciones en tus fotos
                  </p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button>Guardar preferencias</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardSettings;
