
import { Button } from "@/components/ui/button";
import { Facebook, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  imageUrl?: string;
}

const SocialShareButtons = ({ url, title, imageUrl }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  
  // Function to share on Facebook
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  // Function to copy image URL to clipboard
  const copyImageUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl).then(() => {
        toast({
          title: "URL copiada",
          description: "La URL de la imagen ha sido copiada al portapapeles"
        });
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "URL copiada",
          description: "La URL ha sido copiada al portapapeles"
        });
      });
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={shareOnFacebook}
      >
        <Facebook size={16} />
        <span>Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={shareOnTwitter}
      >
        <Twitter size={16} />
        <span>Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={copyImageUrl}
      >
        <span>Copiar enlace</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
