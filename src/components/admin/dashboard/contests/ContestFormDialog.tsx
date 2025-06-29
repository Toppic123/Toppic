
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import LocationCombobox from "./LocationCombobox";
import OrganizerSelect from "./OrganizerSelect";
import ContestImageUpload from "./ContestImageUpload";
import { Contest, ContestPlan } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContestFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contest?: Contest | null;
  onSubmit: (contestData: any) => void;
}

const getPlanLimits = (plan: ContestPlan) => {
  switch (plan) {
    case 'basic':
      return { maxParticipants: 100, features: ['Hasta 100 participantes', 'Soporte básico'] };
    case 'professional':
      return { maxParticipants: 500, features: ['Hasta 500 participantes', 'Soporte prioritario', 'Análisis avanzado'] };
    case 'premium':
      return { maxParticipants: 1000, features: ['Hasta 1000 participantes', 'Soporte dedicado', 'Análisis completo', 'Branding personalizado'] };
    default:
      return { maxParticipants: 100, features: ['Hasta 100 participantes'] };
  }
};

export const ContestFormDialog = ({ isOpen, onClose, contest, onSubmit }: ContestFormDialogProps) => {
  // Simple form state management within the component
  const [formData, setFormData] = React.useState({
    title: contest?.title || '',
    organizer: contest?.organizer || '',
    description: contest?.description || '',
    location: contest?.location || '',
    image_url: contest?.image_url || '',
    prize: contest?.prize || '',
    startDate: contest?.startDate ? new Date(contest.startDate) : contest?.start_date ? new Date(contest.start_date) : undefined,
    photoDeadline: contest?.photoDeadline ? new Date(contest.photoDeadline) : contest?.photo_deadline ? new Date(contest.photo_deadline) : undefined,
    endDate: contest?.endDate ? new Date(contest.endDate) : contest?.end_date ? new Date(contest.end_date) : undefined,
    status: contest?.status || 'pending' as "pending" | "active" | "finished",
    minimumDistanceKm: contest?.minimum_distance_km || 0,
    isPrivate: contest?.is_private || false,
    contestPassword: contest?.contest_password || '',
    photoOwnership: contest?.photo_ownership !== undefined ? contest.photo_ownership : true,
    commercialUse: contest?.commercial_use !== undefined ? contest.commercial_use : true,
    plan: contest?.plan || 'basic' as ContestPlan,
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Update form data when contest prop changes
  React.useEffect(() => {
    console.log('ContestFormDialog - contest prop changed:', contest);
    if (contest) {
      // Use image_url as the primary field (database field name)
      const imageUrl = contest.image_url || contest.imageUrl || '';
      console.log('Setting image_url from contest:', imageUrl);
      setFormData({
        title: contest.title || '',
        organizer: contest.organizer || '',
        description: contest.description || '',
        location: contest.location || '',
        image_url: imageUrl,
        prize: contest.prize || '',
        startDate: contest.startDate ? new Date(contest.startDate) : contest.start_date ? new Date(contest.start_date) : undefined,
        photoDeadline: contest.photoDeadline ? new Date(contest.photoDeadline) : contest.photo_deadline ? new Date(contest.photo_deadline) : undefined,
        endDate: contest.endDate ? new Date(contest.endDate) : contest.end_date ? new Date(contest.end_date) : undefined,
        status: contest.status || 'pending' as "pending" | "active" | "finished",
        minimumDistanceKm: contest.minimum_distance_km || 0,
        isPrivate: contest.is_private || false,
        contestPassword: contest.contest_password || '',
        photoOwnership: contest.photo_ownership !== undefined ? contest.photo_ownership : true,
        commercialUse: contest.commercial_use !== undefined ? contest.commercial_use : true,
        plan: contest.plan || 'basic' as ContestPlan,
        latitude: undefined,
        longitude: undefined
      });
    } else {
      // Reset form for new contest
      console.log('Resetting form for new contest');
      setFormData({
        title: '',
        organizer: '',
        description: '',
        location: '',
        image_url: '',
        prize: '',
        startDate: undefined,
        photoDeadline: undefined,
        endDate: undefined,
        status: 'pending' as "pending" | "active" | "finished",
        minimumDistanceKm: 0,
        isPrivate: false,
        contestPassword: '',
        photoOwnership: true,
        commercialUse: true,
        plan: 'basic' as ContestPlan,
        latitude: undefined,
        longitude: undefined
      });
    }
  }, [contest]);

  const handleImageChange = (newImageUrl: string) => {
    console.log('ContestFormDialog - Image changed to:', newImageUrl);
    setFormData(prev => ({ ...prev, image_url: newImageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Form data being submitted with plan:', formData.plan);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    setFormData({ 
      ...formData, 
      location: location.display_name,
      latitude: location.lat ? parseFloat(location.lat) : undefined,
      longitude: location.lon ? parseFloat(location.lon) : undefined
    });
  };

  const planLimits = getPlanLimits(formData.plan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[95vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {contest ? 'Editar concurso' : 'Crear nuevo concurso'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-1">
            <form onSubmit={handleSubmit} className="space-y-6 pr-4 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del concurso</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Fotografía de Primavera en Barcelona"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Organizador</Label>
                  <OrganizerSelect
                    value={formData.organizer}
                    onChange={(value) => setFormData({ ...formData, organizer: value })}
                    placeholder="Selecciona un organizador"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el concurso, las reglas, los premios..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prize">Premio</Label>
                  <Input
                    id="prize"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    placeholder="Ej: 500€, Cámara profesional, Viaje a París..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Plan del concurso</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value: ContestPlan) => setFormData({ ...formData, plan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Características del plan {formData.plan}:</p>
                    <ul className="list-disc list-inside mt-1">
                      {planLimits.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ubicación del concurso</Label>
                <LocationCombobox
                  value={formData.location}
                  onChange={(value) => setFormData({ ...formData, location: value })}
                  placeholder="Buscar ubicación..."
                />
              </div>

              <ContestImageUpload
                value={formData.image_url}
                onChange={handleImageChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
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
                        {formData.startDate ? (
                          format(formData.startDate, "PPP")
                        ) : (
                          <span>Selecciona fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData({ ...formData, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Fecha límite para subir fotos</Label>
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
                        {formData.photoDeadline ? (
                          format(formData.photoDeadline, "PPP")
                        ) : (
                          <span>Selecciona fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.photoDeadline}
                        onSelect={(date) => setFormData({ ...formData, photoDeadline: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Fecha de finalización</Label>
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
                        {formData.endDate ? (
                          format(formData.endDate, "PPP")
                        ) : (
                          <span>Selecciona fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => setFormData({ ...formData, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado del concurso</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "pending" | "active" | "finished") => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="finished">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumDistance">Distancia mínima (km)</Label>
                  <Input
                    id="minimumDistance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.minimumDistanceKm}
                    onChange={(e) => setFormData({ ...formData, minimumDistanceKm: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configuración de privacidad</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                  />
                  <Label htmlFor="isPrivate">Concurso privado</Label>
                </div>

                {formData.isPrivate && (
                  <div className="space-y-2">
                    <Label htmlFor="contestPassword">Contraseña del concurso</Label>
                    <Input
                      id="contestPassword"
                      type="password"
                      value={formData.contestPassword}
                      onChange={(e) => setFormData({ ...formData, contestPassword: e.target.value })}
                      placeholder="Contraseña para acceder al concurso"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="photoOwnership"
                    checked={formData.photoOwnership}
                    onCheckedChange={(checked) => setFormData({ ...formData, photoOwnership: checked })}
                  />
                  <Label htmlFor="photoOwnership">Los participantes mantienen la propiedad de sus fotos</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="commercialUse"
                    checked={formData.commercialUse}
                    onCheckedChange={(checked) => setFormData({ ...formData, commercialUse: checked })}
                  />
                  <Label htmlFor="commercialUse">Permitir uso comercial de las fotos</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t sticky bottom-0 bg-white">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : (contest ? 'Guardar cambios' : 'Crear concurso')}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContestFormDialog;
