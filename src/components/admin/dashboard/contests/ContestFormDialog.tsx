
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ContestImageUpload from "./ContestImageUpload";
import LocationCombobox from "./LocationCombobox";
import OrganizerSelect from "./OrganizerSelect";
import type { Contest } from "./types";

interface ContestFormDialogProps {
  contest: Partial<Contest> | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (contest: Partial<Contest>) => void;
  isLoading: boolean;
}

const ContestFormDialog = ({ contest, isOpen, onClose, onSave, isLoading }: ContestFormDialogProps) => {
  const [formData, setFormData] = useState<Partial<Contest>>({
    title: "",
    organizer: "",
    location: "",
    description: "",
    prize: "",
    imageUrl: "",
    startDate: undefined,
    endDate: undefined,
    photoDeadline: undefined,
    status: "pending",
    isPrivate: false,
    contestPassword: "",
    minimumDistanceKm: 0,
    ...contest
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {contest?.id ? "Editar Concurso" : "Crear Nuevo Concurso"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título del concurso *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Fotografía Urbana 2024"
                  required
                />
              </div>
              
              <OrganizerSelect
                value={formData.organizer || ""}
                onChange={(organizer) => setFormData(prev => ({ ...prev, organizer }))}
              />
            </div>

            <LocationCombobox
              value={formData.location || ""}
              onChange={(location) => setFormData(prev => ({ ...prev, location }))}
            />

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe el concurso, sus objetivos y características especiales..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="prize">Premio *</Label>
              <Input
                id="prize"
                value={formData.prize}
                onChange={(e) => setFormData(prev => ({ ...prev, prize: e.target.value }))}
                placeholder="Ej: 500€ en efectivo, Cámara profesional, etc."
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <ContestImageUpload
            value={formData.imageUrl || ""}
            onChange={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
          />

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fechas del Concurso</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Fecha de inicio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleDateChange('startDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Fecha límite fotos</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.photoDeadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.photoDeadline ? format(formData.photoDeadline, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.photoDeadline}
                      onSelect={(date) => handleDateChange('photoDeadline', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Fecha de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleDateChange('endDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Contest Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuración del Concurso</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(status) => setFormData(prev => ({ ...prev, status: status as Contest['status'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="finished">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="minimumDistance">Distancia mínima (km)</Label>
                <Input
                  id="minimumDistance"
                  type="number"
                  min="0"
                  value={formData.minimumDistanceKm}
                  onChange={(e) => setFormData(prev => ({ ...prev, minimumDistanceKm: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isPrivate}
                onCheckedChange={(isPrivate) => setFormData(prev => ({ ...prev, isPrivate }))}
              />
              <Label>Concurso privado</Label>
            </div>

            {formData.isPrivate && (
              <div>
                <Label htmlFor="password">Contraseña del concurso</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.contestPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, contestPassword: e.target.value }))}
                  placeholder="Contraseña para acceder al concurso"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : (contest?.id ? "Actualizar" : "Crear")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContestFormDialog;
