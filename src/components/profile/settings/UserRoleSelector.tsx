
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "participant" | "organizer";

interface UserRoleSelectorProps {
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

const UserRoleSelector = ({ currentRole = "participant", onRoleChange }: UserRoleSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const { toast } = useToast();

  const handleSaveRole = () => {
    if (onRoleChange) {
      onRoleChange(selectedRole);
    }
    
    toast({
      title: "Rol actualizado",
      description: `Tu rol ha sido cambiado a ${selectedRole === "participant" ? "Participante" : "Organizador"}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Tipo de cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Selecciona tu rol principal en la plataforma
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <RadioGroupItem value="participant" id="participant" />
            <div className="flex items-center space-x-3 flex-1">
              <Camera className="h-6 w-6 text-blue-500" />
              <div>
                <Label htmlFor="participant" className="text-base font-medium cursor-pointer">
                  Participante
                </Label>
                <p className="text-sm text-muted-foreground">
                  Participa en concursos, sube fotos y vota
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <RadioGroupItem value="organizer" id="organizer" />
            <div className="flex items-center space-x-3 flex-1">
              <Building className="h-6 w-6 text-purple-500" />
              <div>
                <Label htmlFor="organizer" className="text-base font-medium cursor-pointer">
                  Organizador
                </Label>
                <p className="text-sm text-muted-foreground">
                  Crea y gestiona concursos fotográficos
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
        
        {selectedRole !== currentRole && (
          <div className="flex justify-end">
            <Button onClick={handleSaveRole}>
              Guardar cambios
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRoleSelector;
