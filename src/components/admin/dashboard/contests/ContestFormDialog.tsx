import { useState, useEffect } from "react";
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
import { Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Contest form dialog component
export const ContestFormDialog = ({ 
  isOpen, 
  setIsOpen, 
  contestFormData, 
  setContestFormData, 
  handleSaveChanges 
}: ContestFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [organizers, setOrganizers] = useState<{id: string, name: string}[]>([]);
  const { toast } = useToast();

  // Fetch organizers from the database
  useEffect(() => {
    async function fetchOrganizers() {
      try {
        const { data, error } = await supabase
          .from('organizers')
          .select('id, name')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setOrganizers(data);
        }
      } catch (err) {
        console.error('Error fetching organizers:', err);
        toast({
          title: "Error",
          description: "No se pudieron cargar los organizadores",
          variant: "destructive"
        });
      }
    }
    
    fetchOrganizers();
  }, [toast, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Archivo no válido",
          description: "Por favor, selecciona una imagen (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      // Store the file for later upload
      setSelectedFile(file);
      
      // Show a preview URL for the UI
      const imageUrl = URL.createObjectURL(file);
      setContestFormData({...contestFormData, imageUrl: imageUrl});
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setContestFormData({...contestFormData, imageUrl: ''});
  };
  
  const handleFormSubmit = () => {
    handleSaveChanges(selectedFile);
  };

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
                  {organizers.map(org => (
                    <SelectItem key={org.id} value={org.name}>{org.name}</SelectItem>
                  ))}
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
            
            {/* Campo para subir imagen */}
            <div>
              <Label htmlFor="imageUpload" className="flex items-center gap-1">
                <Image size={16} className="mr-1" />
                Imagen del concurso
              </Label>
              
              <div className="mt-1 flex flex-col space-y-4">
                {/* File input */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG o GIF</p>
                    </div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Preview or current image */}
                {contestFormData.imageUrl && (
                  <div className="relative">
                    <img
                      src={contestFormData.imageUrl}
                      alt="Vista previa"
                      className="h-40 object-cover rounded-lg mx-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={clearFileSelection}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Location field with predictive search */}
            <div>
              <Label htmlFor="location" className="flex items-center gap-1">
                Ubicación
                <span className="text-xs font-normal text-muted-foreground">(requerido)</span>
              </Label>
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
          <Button onClick={handleFormSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContestFormDialog;
