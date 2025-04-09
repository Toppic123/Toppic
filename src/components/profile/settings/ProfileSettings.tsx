
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsProps {
  initialData: {
    name: string;
    email: string;
    bio: string;
    website: string;
    username: string;
  };
}

const ProfileSettings = ({ initialData }: ProfileSettingsProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [bio, setBio] = useState(initialData.bio);
  const [website, setWebsite] = useState(initialData.website);

  const handleProfileSave = () => {
    toast({
      title: "Perfil guardado",
      description: "Los cambios en tu perfil han sido guardados.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Información del perfil</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza tu información personal y cómo te ven otros usuarios.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
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
                value={initialData.username}
                readOnly
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
        <div className="flex justify-end">
          <Button onClick={handleProfileSave}>Guardar cambios</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
