
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MobileUploadProps {
  onNavigate: (screen: 'contests') => void;
}

const MobileUpload = ({ onNavigate }: MobileUploadProps) => {
  const { toast } = useToast();
  const [selectedContest, setSelectedContest] = useState("Primavera en Barcelona");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Archivo demasiado grande",
          description: "Por favor selecciona una imagen menor a 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      toast({
        title: "Foto seleccionada",
        description: `${file.name} ha sido seleccionada correctamente`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Por favor selecciona una foto antes de continuar",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: "Error", 
        description: "Por favor añade un título a tu foto",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate upload
    toast({
      title: "¡Foto subida con éxito!",
      description: "Tu foto ha sido enviada al concurso"
    });
    
    setTimeout(() => {
      onNavigate('contests');
    }, 1500);
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4 flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-white hover:bg-blue-700 mr-3 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Subir foto</h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 p-4 pb-20">
        {/* Contest Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concurso seleccionado
          </label>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{selectedContest}</h3>
                <p className="text-sm text-gray-600">Barcelona • Termina en 5 días</p>
              </div>
              <Badge className="bg-green-500">Activo</Badge>
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona tu foto
          </label>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            capture="environment"
          />
          
          {!selectedFile ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors active:bg-blue-50"
              onClick={handlePhotoSelect}
            >
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Toca para seleccionar una foto</p>
              <p className="text-sm text-gray-500">JPG, PNG o GIF. Máximo 5MB</p>
              <p className="text-xs text-blue-600 mt-2">Usa la cámara o selecciona de la galería</p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={previewUrl}
                alt="Foto seleccionada"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button 
                size="sm" 
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={handleRemovePhoto}
              >
                Cambiar
              </Button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {selectedFile.name}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la foto *
            </label>
            <Input
              type="text"
              placeholder="Dale un título a tu foto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <Input
              type="text"
              placeholder="Cuéntanos sobre tu foto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Tu ubicación se añadirá automáticamente</span>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
            disabled={!selectedFile || !title.trim()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir foto al concurso
          </Button>
        </form>

        {/* Additional spacing for better scrolling */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default MobileUpload;
