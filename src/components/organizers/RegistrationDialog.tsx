
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerCompany, setOrganizerCompany] = useState("");

  const handleOrganizerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    setTimeout(() => {
      toast({
        title: "Registro exitoso",
        description: "Tu solicitud como organizador ha sido enviada. Te contactaremos pronto.",
      });
      setIsRegistering(false);
      setOrganizerName("");
      setOrganizerEmail("");
      setOrganizerCompany("");
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Registro de Organizador
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleOrganizerRegistration} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organizer-name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nombre completo
            </Label>
            <Input
              id="organizer-name"
              value={organizerName}
              onChange={(e) => setOrganizerName(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizer-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="organizer-email"
              type="email"
              value={organizerEmail}
              onChange={(e) => setOrganizerEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizer-company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Empresa/Organización
            </Label>
            <Input
              id="organizer-company"
              value={organizerCompany}
              onChange={(e) => setOrganizerCompany(e.target.value)}
              placeholder="Nombre de tu empresa"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Enviando solicitud..." : "Enviar Solicitud"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
