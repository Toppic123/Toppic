
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload as UploadIcon, MapPin, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const compressImage = async (file: File, maxWidth = 1200): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Scale down if width exceeds maxWidth
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas to Blob conversion failed'));
          }, 'image/jpeg', 0.8); // 0.8 quality for JPEG
        };
        img.onerror = () => reject(new Error('Image loading error'));
      };
      reader.onerror = () => reject(new Error('FileReader error'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "Por favor selecciona una imagen de menos de 5MB",
          variant: "destructive"
        });
        return;
      }
      
      try {
        // Store original file for later submission
        setOriginalFile(file);
        
        // Compress for preview
        const compressedBlob = await compressImage(file);
        const compressedUrl = URL.createObjectURL(compressedBlob);
        setPreviewUrl(compressedUrl);
        
        toast({
          title: "Imagen cargada",
          description: "Previsualización generada con calidad optimizada"
        });
      } catch (error) {
        console.error("Error processing image:", error);
        toast({
          title: "Error al procesar la imagen",
          description: "Por favor intenta con otra imagen",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalFile) {
      toast({
        title: "Imagen requerida",
        description: "Por favor selecciona una imagen para participar",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would upload both the originalFile (for storage) and the metadata
    console.log("Photo submitted to contest:", contestId);
    console.log("Original file to be stored:", originalFile);
    console.log("Title:", title);
    console.log("Description:", description);
    
    toast({
      title: "¡Foto enviada!",
      description: "Tu foto ha sido enviada al concurso"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-md mx-auto py-12 px-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Subir foto</CardTitle>
          <CardDescription>
            Participa en el concurso compartiendo tu mejor fotografía
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Selecciona una foto</Label>
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img src={previewUrl} alt="Preview" className="w-full h-auto" />
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      setPreviewUrl(null);
                      setOriginalFile(null);
                    }}
                  >
                    Cambiar
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Camera className="h-10 w-10 text-muted-foreground" />
                    <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                      <span>Arrastra tu foto aquí o</span>
                      <label htmlFor="photo" className="relative cursor-pointer text-blue-600 hover:underline">
                        <span>selecciona un archivo</span>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      JPG, PNG o GIF. Máximo 5MB.
                    </span>
                  </div>
                </div>
              )}
              {previewUrl && (
                <p className="text-xs text-muted-foreground mt-1">
                  Nota: Tu foto se muestra en calidad optimizada para la web, pero se guardará en su calidad original.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título de la foto</Label>
              <Input 
                id="title" 
                placeholder="Añade un título descriptivo" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Input 
                id="description" 
                placeholder="Cuéntanos sobre tu foto..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Tu ubicación será añadida automáticamente</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Subir foto
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Upload;
