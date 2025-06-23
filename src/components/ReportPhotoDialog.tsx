
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";
import { usePhotoReports } from "@/hooks/usePhotoReports";
import { useAuth } from "@/contexts/AuthContext";

interface ReportPhotoDialogProps {
  photoId: string;
  trigger?: React.ReactNode;
}

const REPORT_REASONS = [
  { value: "inappropriate", label: "Contenido inapropiado" },
  { value: "spam", label: "Spam o contenido irrelevante" },
  { value: "copyright", label: "Violación de derechos de autor" },
  { value: "harassment", label: "Acoso o intimidación" },
  { value: "fake", label: "Imagen falsa o manipulada" },
  { value: "other", label: "Otro motivo" }
];

export const ReportPhotoDialog = ({ photoId, trigger }: ReportPhotoDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reportPhoto } = usePhotoReports();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!reason || !user) return;

    setIsSubmitting(true);
    try {
      await reportPhoto(photoId, reason, description);
      setIsOpen(false);
      setReason("");
      setDescription("");
    } catch (error) {
      console.error("Error reporting photo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
            <Flag className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reportar Foto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Motivo del reporte</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un motivo" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((reportReason) => (
                  <SelectItem key={reportReason.value} value={reportReason.value}>
                    {reportReason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Descripción adicional (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Proporciona más detalles sobre el problema..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!reason || isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? "Enviando..." : "Reportar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPhotoDialog;
