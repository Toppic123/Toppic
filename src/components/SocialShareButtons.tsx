
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  imageUrl?: string;
}

const SocialShareButtons = ({ url, title, imageUrl }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const [showInstagramHelp, setShowInstagramHelp] = useState(false);
  
  // Function to share on Facebook
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  // Function to share on Instagram
  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL API, but we can help users do it manually
    setShowInstagramHelp(true);
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
    <>
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
          onClick={shareOnInstagram}
        >
          <Instagram size={16} />
          <span>Instagram</span>
        </Button>
      </div>

      <Dialog open={showInstagramHelp} onOpenChange={setShowInstagramHelp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir en Instagram</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Instagram no permite compartir directamente desde web. Para compartir:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Guarda la imagen en tu dispositivo (captura de pantalla)</li>
              <li>Abre Instagram en tu aplicación móvil</li>
              <li>Crea una nueva publicación o historia con la imagen guardada</li>
              <li>Añade el texto y etiquetas que desees</li>
            </ol>
            <Button onClick={copyImageUrl} className="w-full">
              Copiar enlace al portapapeles
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://www.instagram.com/', '_blank')}
              className="w-full"
            >
              Abrir Instagram
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialShareButtons;
