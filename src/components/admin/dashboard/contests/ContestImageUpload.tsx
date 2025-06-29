
import React, { useState, useEffect } from 'react';
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
        return;
      }

      // Get public URL using the getPublicUrl method
      const { data: { publicUrl } } = supabase.storage
        .from('contest-images')
        .getPublicUrl(fileName);
      
      console.log('Image uploaded successfully. Public URL:', publicUrl);
      
      // Immediately update the form with the new URL
      onChange(publicUrl);
      
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
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    onChange('');
    
    const fileInput = document.getElementById('contest-image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

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

        {value && (
          <div className="relative">
            <img
              src={value}
              alt="Vista previa del concurso"
              className="w-full max-w-md h-48 object-cover rounded-lg border"
              onError={(e) => {
                console.error('Error loading image preview:', value);
              }}
              onLoad={() => {
                console.log('Image loaded successfully in preview:', value);
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
