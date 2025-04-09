
import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { BannerType, BANNER_SIZE_REQUIREMENTS } from "./BannerSizeRequirements";

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
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Las dimensiones de la imagen ({dimensions.width}×{dimensions.height}px) no coinciden con las recomendadas ({requirements.width}×{requirements.height}px).
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BannerPreview;
