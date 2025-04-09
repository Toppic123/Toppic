
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AccountSettingsProps {
  onDeleteAccount: () => void;
}

const AccountSettings = ({ onDeleteAccount }: AccountSettingsProps) => {
  const { toast } = useToast();

  const handleUpdatePassword = () => {
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada correctamente.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Seguridad de la cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Actualiza tu contraseña y configura la seguridad de tu cuenta.
          </p>
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
          <div className="flex justify-end">
            <Button onClick={handleUpdatePassword}>Actualizar contraseña</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Eliminar cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Eliminar permanentemente tu cuenta y todos tus datos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Esta acción no se puede deshacer. Se eliminarán permanentemente
            todos tus datos, fotos y participación en concursos.
          </p>
          <div className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Eliminar cuenta</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos tus datos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={onDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                    Eliminar cuenta
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountSettings;
