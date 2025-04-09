
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SocialSettings = () => {
  const { toast } = useToast();

  const handleSocialProfileSave = () => {
    toast({
      title: "Perfiles sociales actualizados",
      description: "Tus perfiles sociales se han actualizado correctamente.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Perfiles Sociales</h3>
        <p className="text-sm text-muted-foreground">
          Conecta tus redes sociales para mostrarlas en tu perfil.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input id="twitter" placeholder="@nombreusuario" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" placeholder="@nombreusuario" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input id="facebook" placeholder="facebook.com/nombreusuario" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" placeholder="linkedin.com/in/nombreusuario" />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSocialProfileSave}>Conectar perfiles</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialSettings;
