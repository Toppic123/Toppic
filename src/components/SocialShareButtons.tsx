
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share2 } from "lucide-react";
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

  // Function to copy URL to clipboard or use native share
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: title,
          url: url,
        });
        toast({
          title: "Compartido exitosamente",
          description: "El contenido ha sido compartido"
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: "URL copiada",
          description: "La URL ha sido copiada al portapapeles"
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "URL copiada",
          description: "La URL ha sido copiada al portapapeles"
        });
      } catch (clipboardError) {
        toast({
          title: "Error al compartir",
          description: "No se pudo compartir el contenido",
          variant: "destructive"
        });
      }
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
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={shareOnTwitter}
      >
        <Twitter size={16} />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleShare}
      >
        <Share2 size={16} />
        <span className="hidden sm:inline">Compartir</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
