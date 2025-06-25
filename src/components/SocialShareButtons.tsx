
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
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  // Function to copy URL to clipboard or use native share
  const handleShare = async () => {
    try {
      // Try native share API first (works on mobile and modern browsers)
      if (navigator.share && navigator.canShare && navigator.canShare({
        title: title,
        text: title,
        url: url,
      })) {
        await navigator.share({
          title: title,
          text: title,
          url: url,
        });
        toast({
          title: "Compartido exitosamente",
          description: "El contenido ha sido compartido"
        });
        return;
      }
      
      // Fallback to clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast({
          title: "URL copiada",
          description: "La URL ha sido copiada al portapapeles"
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          toast({
            title: "URL copiada",
            description: "La URL ha sido copiada al portapapeles"
          });
        } catch (err) {
          console.error('Fallback copy failed:', err);
          toast({
            title: "Error al copiar",
            description: "No se pudo copiar la URL. URL: " + url,
            variant: "destructive"
          });
        } finally {
          textArea.remove();
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error al compartir",
        description: "No se pudo compartir el contenido",
        variant: "destructive"
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
