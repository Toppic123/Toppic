
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
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const { toast } = useToast();

  // Update preview when value changes
  useEffect(() => {
    console.log('🖼️ ContestImageUpload - value changed to:', value);
    setPreviewUrl(value);
  }, [value]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📤 Starting file upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('❌ Invalid file type:', file.type);
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('❌ File too large:', file.size);
      toast({
        title: "Error", 
        description: "El archivo es demasiado grande. Máximo 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Check if contest-images bucket exists, if not create it
      console.log('🪣 Checking if contest-images bucket exists...');
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error('❌ Error listing buckets:', listError);
      } else {
        console.log('📋 Available buckets:', buckets.map(b => b.name));
        const contestImagesBucket = buckets.find(b => b.name === 'contest-images');
        if (!contestImagesBucket) {
          console.log('🪣 Creating contest-images bucket...');
          const { error: createError } = await supabase.storage.createBucket('contest-images', {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: 5242880 // 5MB
          });
          
          if (createError) {
            console.error('❌ Error creating bucket:', createError);
          } else {
            console.log('✅ contest-images bucket created successfully');
          }
        } else {
          console.log('✅ contest-images bucket already exists');
        }
      }

      // Generate unique filename with timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `contest-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      console.log('📤 Uploading to Supabase Storage with filename:', fileName);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('contest-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Storage upload error:', error);
        toast({
          title: "Error",
          description: "Error al subir la imagen: " + error.message,
          variant: "destructive"
        });
        return;
      }

      console.log('✅ File uploaded successfully:', data);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('contest-images')
        .getPublicUrl(fileName);
      
      const publicUrl = urlData.publicUrl;
      
      console.log('🌐 Generated public URL:', publicUrl);
      console.log('📞 About to call onChange with URL:', publicUrl);
      
      // Test if the image URL is accessible
      try {
        const response = await fetch(publicUrl, { method: 'HEAD' });
        console.log('🔍 Image URL accessibility test:', {
          url: publicUrl,
          status: response.status,
          accessible: response.ok
        });
      } catch (testError) {
        console.error('❌ Error testing image URL:', testError);
      }
      
      // Update preview immediately
      setPreviewUrl(publicUrl);
      
      // Notify parent component with the new URL
      onChange(publicUrl);
      
      toast({
        title: "Imagen cargada",
        description: "La imagen se ha cargado correctamente",
      });
      
    } catch (error) {
      console.error('💥 Unexpected error uploading file:', error);
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
    console.log('🗑️ Clearing image');
    setPreviewUrl('');
    onChange('');
    
    // Clear the file input
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

        {previewUrl && (
          <div className="relative">
            <div className="text-sm text-muted-foreground mb-2">
              Vista previa de la imagen:
            </div>
            <img
              src={previewUrl}
              alt="Vista previa del concurso"
              className="w-full max-w-md h-48 object-cover rounded-lg border"
              onError={(e) => {
                console.error('❌ Error loading image preview:', previewUrl);
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
              }}
              onLoad={() => {
                console.log('✅ Image preview loaded successfully:', previewUrl);
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

        {previewUrl && !isUploading && (
          <div className="text-sm text-green-600">
            ✓ Imagen lista para guardar con URL: {previewUrl}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestImageUpload;
