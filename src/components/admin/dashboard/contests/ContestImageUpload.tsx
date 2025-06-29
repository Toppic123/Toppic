
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContestImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ContestImageUpload = ({ value, onChange }: ContestImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error", 
        description: "El archivo es demasiado grande. Máximo 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview URL immediately
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `contest-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      console.log('Uploading contest image:', fileName);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('contest-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        toast({
          title: "Error",
          description: "Error al subir la imagen: " + error.message,
          variant: "destructive"
        });
        // Revert to original preview if upload fails
        setPreviewUrl(value);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contest-images')
        .getPublicUrl(fileName);

      console.log('Image uploaded successfully:', publicUrl);
      
      // Update both local state and parent
      setPreviewUrl(publicUrl);
      onChange(publicUrl);
      
      // Clean up local blob URL
      URL.revokeObjectURL(localPreviewUrl);
      
      toast({
        title: "Imagen cargada",
        description: "La imagen se ha cargado correctamente",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Error al cargar la imagen",
        variant: "destructive"
      });
      // Revert to original preview if upload fails
      setPreviewUrl(value);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    // Clean up blob URL if it exists
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl('');
    onChange('');
    
    // Reset file input
    const fileInput = document.getElementById('contest-image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Update preview when value changes from parent
  React.useEffect(() => {
    if (value !== previewUrl && !isUploading) {
      setPreviewUrl(value);
    }
  }, [value, isUploading]);

  const getDisplayImage = () => {
    if (!previewUrl) return null;
    
    // Handle different types of URLs
    if (previewUrl.startsWith('blob:') || 
        previewUrl.startsWith('data:') || 
        previewUrl.startsWith('http')) {
      return previewUrl;
    }
    
    return previewUrl;
  };

  const displayImage = getDisplayImage();

  return (
    <div className="space-y-4">
      <Label htmlFor="contest-image-upload">Imagen del concurso</Label>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            id="contest-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('contest-image-upload')?.click()}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? 'Subiendo...' : 'Seleccionar'}
          </Button>
        </div>

        {displayImage && (
          <div className="relative">
            <img
              src={displayImage}
              alt="Vista previa del concurso"
              className="w-full max-w-md h-48 object-cover rounded-lg border"
              onError={(e) => {
                console.error('Error loading image preview:', displayImage);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', displayImage);
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={clearImage}
              className="absolute top-2 right-2"
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {isUploading && (
          <div className="text-sm text-muted-foreground">
            Subiendo imagen... Por favor espera.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestImageUpload;
