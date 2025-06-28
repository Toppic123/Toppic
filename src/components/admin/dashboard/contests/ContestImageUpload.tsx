
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContestImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ContestImageUpload = ({ value, onChange }: ContestImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "El archivo es demasiado grande. Máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert to blob URL for better performance and reliability
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);
      onChange(blobUrl);
      
      toast({
        title: "Imagen cargada",
        description: "La imagen se ha cargado correctamente.",
      });
      
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error al subir imagen",
        description: "Ha ocurrido un error al subir la imagen.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreviewUrl(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreviewUrl("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Imagen del concurso</Label>
        
        {/* URL Input */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-sm text-gray-600">URL de imagen</Label>
          <Input
            id="imageUrl"
            value={value}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">O subir desde dispositivo</Label>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Subiendo..." : "Seleccionar imagen"}
            </Button>
            
            {previewUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearImage}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Vista previa</Label>
          <div className="relative w-full max-w-md">
            <img
              src={previewUrl}
              alt="Vista previa de la imagen del concurso"
              className="w-full h-48 object-cover rounded-lg border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
                toast({
                  title: "Error de imagen",
                  description: "Error al cargar la imagen. Se muestra imagen por defecto.",
                  variant: "destructive",
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestImageUpload;
