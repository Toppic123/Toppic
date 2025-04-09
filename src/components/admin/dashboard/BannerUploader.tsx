
import { useState } from "react";
import { Upload, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const BANNER_SIZE_REQUIREMENTS = {
  homepage: {
    width: 1200,
    height: 300,
    name: "Banner de Página Principal",
    description: "Aparecerá en la sección superior de la página principal"
  },
  sidebar: {
    width: 300,
    height: 600,
    name: "Banner Lateral",
    description: "Aparecerá en la barra lateral de las páginas de concursos"
  },
  contestPage: {
    width: 800,
    height: 200,
    name: "Banner de Concurso",
    description: "Aparecerá en la página de detalles de concursos"
  }
};

type BannerType = keyof typeof BANNER_SIZE_REQUIREMENTS;

interface BannerPreviewProps {
  file: File;
  type: BannerType;
  onRemove: () => void;
}

const BannerPreview = ({ file, type, onRemove }: BannerPreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const { toast } = useToast();
  const requirements = BANNER_SIZE_REQUIREMENTS[type];

  // Create preview URL when file changes
  useState(() => {
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
    // Check image dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      
      // Check if dimensions match requirements
      if (img.width !== requirements.width || img.height !== requirements.height) {
        toast({
          title: "Dimensiones incorrectas",
          description: `Este banner debe ser de ${requirements.width}×${requirements.height}px`,
          variant: "destructive",
        });
      }
    };
    img.src = url;
    
    return () => {
      URL.revokeObjectURL(url);
    };
  });

  // Check if dimensions match requirements
  const dimensionsMatch = dimensions && 
    dimensions.width === requirements.width && 
    dimensions.height === requirements.height;

  return (
    <div className="relative mt-2 rounded-md border p-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{file.name}</span>
          {dimensions && (
            <span className="text-xs text-muted-foreground">
              {dimensions.width}×{dimensions.height}px
            </span>
          )}
        </div>
        <div className="flex items-center">
          {dimensionsMatch ? (
            <Check className="h-5 w-5 text-green-500 mr-2" />
          ) : dimensions ? (
            <Info className="h-5 w-5 text-amber-500 mr-2" />
          ) : null}
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Eliminar
          </Button>
        </div>
      </div>
      {imageUrl && (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt={file.name}
            className="max-w-full h-auto" 
          />
        </div>
      )}
      {!dimensionsMatch && dimensions && (
        <Alert variant="warning" className="mt-2">
          <AlertDescription>
            Las dimensiones de la imagen ({dimensions.width}×{dimensions.height}px) no coinciden con las recomendadas ({requirements.width}×{requirements.height}px).
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

interface BannerUploaderProps {
  onBannerUpload?: (type: BannerType, file: File) => void;
}

const BannerUploader = ({ onBannerUpload }: BannerUploaderProps) => {
  const [uploadedBanners, setUploadedBanners] = useState<Record<BannerType, File | null>>({
    homepage: null,
    sidebar: null,
    contestPage: null
  });
  
  const { toast } = useToast();

  const handleBannerUpload = (type: BannerType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Update state
    setUploadedBanners(prev => ({
      ...prev,
      [type]: file
    }));
    
    // Call callback if provided
    if (onBannerUpload) {
      onBannerUpload(type, file);
    }
    
    toast({
      title: "Banner subido",
      description: `El banner "${BANNER_SIZE_REQUIREMENTS[type].name}" ha sido subido correctamente.`
    });
  };

  const handleRemoveBanner = (type: BannerType) => {
    setUploadedBanners(prev => ({
      ...prev,
      [type]: null
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Subir Banners Publicitarios</h2>
      <p className="text-muted-foreground">
        Sube imágenes para tus banners publicitarios según las dimensiones requeridas. 
        Los banners aparecerán en diferentes secciones de la plataforma según tu plan de suscripción.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(BANNER_SIZE_REQUIREMENTS) as BannerType[]).map(type => {
          const { width, height, name, description } = BANNER_SIZE_REQUIREMENTS[type];
          const banner = uploadedBanners[type];
          
          return (
            <Card key={type} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-sm mb-2">
                    Dimensiones: <strong>{width}×{height}px</strong>
                  </p>
                  
                  {banner ? (
                    <BannerPreview 
                      file={banner} 
                      type={type} 
                      onRemove={() => handleRemoveBanner(type)} 
                    />
                  ) : (
                    <div className="mt-2">
                      <label htmlFor={`banner-${type}`}>
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-center text-muted-foreground">
                            Click para subir tu banner<br />
                            <span className="text-xs">({width}×{height}px)</span>
                          </p>
                        </div>
                        <Input
                          id={`banner-${type}`}
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={(e) => handleBannerUpload(type, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Alert>
        <AlertDescription>
          <p className="font-medium mb-1">Información sobre los banners:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Los banners deben estar en formato JPG o PNG.</li>
            <li>Respeta las dimensiones exactas para una visualización óptima.</li>
            <li>Evita textos pequeños que pueden resultar ilegibles.</li>
            <li>El contenido de los banners está sujeto a revisión según nuestras políticas.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BannerUploader;
