
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
        setPreviewUrl(value);
        return;
      }

      // Construct the public URL manually using the Supabase project URL
      const publicUrl = `https://sslwwbcvpujyfnpjypwk.supabase.co/storage/v1/object/public/contest-images/${fileName}`;
      
      console.log('Image uploaded successfully. Public URL:', publicUrl);
      
      // Verify the URL works by testing it
      const testImage = new Image();
      testImage.onload = () => {
        console.log('Image URL verified successfully:', publicUrl);
        setPreviewUrl(publicUrl);
        onChange(publicUrl);
        
        toast({
          title: "Imagen cargada",
          description: "La imagen se ha cargado correctamente",
        });
      };
      
      testImage.onerror = () => {
        console.error('Image URL verification failed:', publicUrl);
        toast({
          title: "Error",
          description: "Error al verificar la imagen subida",
          variant: "destructive"
        });
        setPreviewUrl(value);
      };
      
      testImage.src = publicUrl;
      
      // Clean up local blob URL
      URL.revokeObjectURL(localPreviewUrl);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Error al cargar la imagen",
        variant: "destructive"
      });
      setPreviewUrl(value);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl('');
    onChange('');
    
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

  const displayImage = previewUrl || '';

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
                console.log('Image loaded successfully in preview:', displayImage);
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
