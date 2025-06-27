
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Building, CreditCard } from "lucide-react";
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
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    { value: "basico", label: "Básico - €89", description: "Hasta 300 participantes" },
    { value: "profesional", label: "Profesional - €119", description: "Hasta 700 participantes" },
    { value: "premium", label: "Premium - €159", description: "Participantes ilimitados" }
  ];

  const handleOrganizerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate sending to admin panel or email
    setTimeout(() => {
      toast({
        title: "Registro exitoso",
        description: `Tu solicitud como organizador con el plan ${selectedPlan} ha sido enviada. Las solicitudes se revisan en el panel de administración y también recibirás un email de confirmación.`,
        duration: 5000,
      });
      setIsRegistering(false);
      setOrganizerName("");
      setOrganizerEmail("");
      setOrganizerCompany("");
      setSelectedPlan("");
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
          <div className="space-y-2">
            <Label htmlFor="plan-select" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Plan seleccionado
            </Label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.label}</span>
                      <span className="text-xs text-muted-foreground">{plan.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isRegistering || !selectedPlan}>
            {isRegistering ? "Enviando solicitud..." : "Enviar Solicitud"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Tu solicitud será revisada por nuestro equipo. Recibirás una confirmación por email y podrás seguir el estado en el panel de administración.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
