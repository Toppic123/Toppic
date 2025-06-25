
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Upload, Image } from "lucide-react";

interface MobileUploadProps {
  onNavigate: (screen: 'contests') => void;
}

const MobileUpload = ({ onNavigate }: MobileUploadProps) => {
  const [selectedContest, setSelectedContest] = useState("Primavera en Barcelona");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload
    onNavigate('contests');
  };

  return (
    <div className="h-full bg-white flex flex-col">
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-20">
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
            {!selectedImage ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={handlePhotoSelect}
              >
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Toca para seleccionar una foto</p>
                <p className="text-sm text-gray-500">JPG, PNG o GIF. Máximo 5MB</p>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={handlePhotoSelect}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Elegir foto
                </Button>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={selectedImage}
                  alt="Foto seleccionada"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Cambiar
                </Button>
              </div>
            )}
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título de la foto
              </label>
              <Input
                type="text"
                placeholder="Dale un título a tu foto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!selectedImage}
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir foto al concurso
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileUpload;
