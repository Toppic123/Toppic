
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Upload } from "lucide-react";

interface MobileUploadProps {
  onNavigate: (screen: 'contests') => void;
}

const MobileUpload = ({ onNavigate }: MobileUploadProps) => {
  const [selectedContest, setSelectedContest] = useState("Primavera en Barcelona");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePhotoSelect = () => {
    setPhotoUploaded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload
    onNavigate('contests');
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
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

      <div className="p-4">
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
          {!photoUploaded ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={handlePhotoSelect}
            >
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Toca para seleccionar una foto</p>
              <p className="text-sm text-gray-500">JPG, PNG o GIF. Máximo 5MB</p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400"
                alt="Foto seleccionada"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button 
                size="sm" 
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => setPhotoUploaded(false)}
              >
                Cambiar
              </Button>
            </div>
          )}
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

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
            disabled={!photoUploaded}
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir foto al concurso
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MobileUpload;
