
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsProps {
  initialData?: {
    name: string;
    email: string;
    bio: string;
    website: string;
    username: string;
  };
}

const ProfileSettings = ({ initialData }: ProfileSettingsProps) => {
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('Profile data updated:', profile);
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setBio(profile.bio || "");
      setWebsite(profile.website || "");
      setUsername(profile.username || "");
    } else if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setBio(initialData.bio);
      setWebsite(initialData.website);
      setUsername(initialData.username);
    }
  }, [profile, initialData]);

  const handleProfileSave = async () => {
    console.log('Saving profile with data:', { name, email, bio, website, username });
    setIsSaving(true);
    
    try {
      const success = await updateProfile({
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
        website: website.trim(),
        username: username.trim()
      });
      
      if (success) {
        toast({
          title: "Perfil actualizado",
          description: "Los cambios se han guardado correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudieron guardar los cambios. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado al guardar los cambios.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu_usuario"
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
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Sitio web</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://tuweb.com"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleProfileSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar cambios'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
