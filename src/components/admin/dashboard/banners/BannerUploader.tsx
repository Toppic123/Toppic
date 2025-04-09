
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BannerType, BANNER_SIZE_REQUIREMENTS } from "./BannerSizeRequirements";
import BannerCard from "./BannerCard";
import BannerInfoAlert from "./BannerInfoAlert";

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

  const handleBannerUpload = (type: BannerType, file: File) => {
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
        {(Object.keys(BANNER_SIZE_REQUIREMENTS) as BannerType[]).map(type => (
          <BannerCard 
            key={type}
            type={type}
            banner={uploadedBanners[type]}
            onUpload={handleBannerUpload}
            onRemove={handleRemoveBanner}
          />
        ))}
      </div>
      
      <BannerInfoAlert />
    </div>
  );
};

export default BannerUploader;
