
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BannerType, BANNER_SIZE_REQUIREMENTS } from "./BannerSizeRequirements";
import BannerPreview from "./BannerPreview";

interface BannerCardProps {
  type: BannerType;
  banner: File | null;
  onUpload: (type: BannerType, file: File) => void;
  onRemove: (type: BannerType) => void;
}

const BannerCard = ({ type, banner, onUpload, onRemove }: BannerCardProps) => {
  const { width, height, name, description } = BANNER_SIZE_REQUIREMENTS[type];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(type, file);
    }
  };

  return (
    <Card className="overflow-hidden">
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
              onRemove={() => onRemove(type)} 
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
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
