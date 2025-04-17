
import { Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContestFormProps } from "./types";
import LocationCombobox from "./LocationCombobox";

// Contest form dialog component
export const ContestFormDialog = ({ 
  isOpen, 
  setIsOpen, 
  contestFormData, 
  setContestFormData, 
  handleSaveChanges 
}: ContestFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{contestFormData.title ? "Editar Concurso" : "Crear Nuevo Concurso"}</DialogTitle>
          <DialogDescription>
            {contestFormData.title ? "Modifica los detalles del concurso seleccionado." : "Introduce los datos para el nuevo concurso."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={contestFormData.title}
                onChange={(e) => setContestFormData({...contestFormData, title: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="organizer">Organizador</Label>
              <Select 
                value={contestFormData.organizer}
                onValueChange={(value) => setContestFormData({...contestFormData, organizer: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar organizador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PictureThis">PictureThis</SelectItem>
                  <SelectItem value="FoodLens">FoodLens</SelectItem>
                  <SelectItem value="CoastalShots">CoastalShots</SelectItem>
                  <SelectItem value="NightOwl">NightOwl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={contestFormData.description}
                onChange={(e) => setContestFormData({...contestFormData, description: e.target.value})}
                className="mt-1"
              />
            </div>
            
            {/* Location field with Google Maps predictive search */}
            <div>
              <Label htmlFor="location">Ubicación</Label>
              <div className="mt-1">
                <LocationCombobox 
                  value={contestFormData.location || ""}
                  onChange={(value) => setContestFormData({...contestFormData, location: value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={contestFormData.startDate}
                  onChange={(e) => setContestFormData({...contestFormData, startDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="photoDeadline">Fecha límite de fotos</Label>
                <Input
                  id="photoDeadline"
                  type="date"
                  value={contestFormData.photoDeadline}
                  onChange={(e) => setContestFormData({...contestFormData, photoDeadline: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Fecha de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={contestFormData.endDate}
                  onChange={(e) => setContestFormData({...contestFormData, endDate: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select 
                  value={contestFormData.status}
                  onValueChange={(value: "active" | "pending" | "finished") => 
                    setContestFormData({...contestFormData, status: value})
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="finished">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxParticipants">Participantes máximos</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={contestFormData.maxParticipants}
                  onChange={(e) => setContestFormData({...contestFormData, maxParticipants: parseInt(e.target.value)})}
                  className="mt-1"
                />
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <h3 className="text-sm font-semibold">Configuración de propiedad y uso</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="photoOwnership"
                checked={contestFormData.photoOwnership}
                onCheckedChange={(checked) => setContestFormData({...contestFormData, photoOwnership: checked})}
              />
              <Label htmlFor="photoOwnership">Transferir propiedad de las fotos al organizador (el número de fotos puede variar según el tipo de suscripción)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="commercialUse"
                checked={contestFormData.commercialUse}
                onCheckedChange={(checked) => setContestFormData({...contestFormData, commercialUse: checked})}
              />
              <Label htmlFor="commercialUse">Permitir uso comercial de las fotos ganadoras</Label>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Al activar esta opción, los participantes aceptan que las fotos ganadoras puedan ser utilizadas con fines comerciales
              y otorgan su consentimiento de derechos de imagen para aparecer en ellas.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContestFormDialog;
