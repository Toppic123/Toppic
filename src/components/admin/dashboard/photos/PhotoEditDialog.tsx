
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContestPhoto } from "@/hooks/useContestPhotos";

interface PhotoEditDialogProps {
  photo: ContestPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (photoId: string, updates: Partial<ContestPhoto>) => void;
}

const PhotoEditDialog = ({ photo, isOpen, onClose, onSave }: PhotoEditDialogProps) => {
  const [formData, setFormData] = useState({
    photographer_name: "",
    description: "",
    status: "approved" as "approved" | "pending" | "rejected",
    is_featured: false,
  });

  useEffect(() => {
    if (photo) {
      setFormData({
        photographer_name: photo.photographer_name || "",
        description: photo.description || "",
        status: photo.status as "approved" | "pending" | "rejected",
        is_featured: photo.is_featured || false,
      });
    }
  }, [photo]);

  const handleSave = () => {
    if (!photo) return;
    
    onSave(photo.id, formData);
    onClose();
  };

  if (!photo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Foto</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Preview */}
          <div className="space-y-4">
            <Label>Vista previa</Label>
            <img
              src={photo.image_url}
              alt="Foto del concurso"
              className="w-full h-64 object-cover rounded-lg border"
            />
            <div className="text-sm text-muted-foreground">
              <p><strong>Votos:</strong> {photo.votes}</p>
              <p><strong>Creada:</strong> {new Date(photo.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photographer_name">Nombre del Fotógrafo</Label>
              <Input
                id="photographer_name"
                value={formData.photographer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, photographer_name: e.target.value }))}
                placeholder="Nombre del fotógrafo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción de la foto"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: "approved" | "pending" | "rejected") => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Aprobada</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="rejected">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="is_featured">Foto destacada</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Guardar Cambios
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoEditDialog;
