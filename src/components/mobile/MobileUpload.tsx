
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { useContestsData } from "@/hooks/useContestsData";

interface MobileUploadProps {
  onNavigate: (screen: 'contests' | 'voting' | 'profile') => void;
  contestId?: string | null;
}

const MobileUpload = ({ onNavigate, contestId }: MobileUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [photographerName, setPhotographerName] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Get contests data and determine which contest to use
  const { contests } = useContestsData();
  
  // Use provided contestId or fall back to first active contest
  const activeContestId = contestId || contests.find(c => c.status === 'active')?.id;
  
  const { uploadPhoto } = useContestPhotos(activeContestId);

  console.log('MobileUpload - contestId:', contestId);
  console.log('MobileUpload - activeContestId:', activeContestId);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast({
          title: "Archivo muy grande",
          description: "La imagen no puede ser mayor a 25MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !photographerName.trim()) {
      toast({
        title: "Información incompleta",
        description: "Por favor, selecciona una imagen y agrega tu nombre",
        variant: "destructive",
      });
      return;
    }

    if (!activeContestId) {
      toast({
        title: "Error",
        description: "No hay concursos activos disponibles",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadPhoto(
        selectedImage,
        photographerName.trim(),
        description.trim() || undefined,
        true // Auto-approve for demo
      );

      if (result) {
        // Reset form
        setSelectedImage(null);
        setPreviewUrl("");
        setPhotographerName("");
        setDescription("");
        
        // Navigate to voting screen to see the uploaded photo
        setTimeout(() => {
          onNavigate('voting');
        }, 1000);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentContest = contests.find(c => c.id === activeContestId);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('contests')}
              className="text-white hover:bg-blue-700 mr-3 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Subir Foto</h1>
              {currentContest && (
                <p className="text-sm opacity-80">{currentContest.title}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Image Upload Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Seleccionar Imagen</h3>
          
          {!previewUrl ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Toca para seleccionar una foto</p>
              <p className="text-sm text-gray-500">JPG, PNG o WEBP (máx. 25MB)</p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Vista previa" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del fotógrafo *
            </label>
            <input
              type="text"
              value={photographerName}
              onChange={(e) => setPhotographerName(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu foto..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Contest Info */}
        {currentContest && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Información del Concurso</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Concurso:</strong> {currentContest.title}</p>
              <p><strong>Ubicación:</strong> {currentContest.location}</p>
              <p><strong>Termina:</strong> {new Date(currentContest.endDate).toLocaleDateString()}</p>
              {currentContest.prize && (
                <p><strong>Premio:</strong> {currentContest.prize}</p>
              )}
            </div>
          </div>
        )}

        {/* Rules */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Reglas Importantes</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Las fotos deben ser originales y de tu autoría</li>
            <li>• Solo se permite una foto por participante</li>
            <li>• La foto debe estar relacionada con el tema del concurso</li>
            <li>• No se permiten ediciones excesivas</li>
          </ul>
        </div>

        {/* Upload Button */}
        <div className="pb-6">
          <Button
            onClick={handleUpload}
            disabled={!selectedImage || !photographerName.trim() || isUploading || !activeContestId}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"
          >
            {isUploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Subiendo...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Upload className="h-5 w-5 mr-2" />
                Subir Foto al Concurso
              </div>
            )}
          </Button>
          
          {!activeContestId && (
            <p className="text-center text-red-500 text-sm mt-2">
              No hay concursos activos disponibles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileUpload;
