
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
  // Function to share on Instagram
  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL like other platforms
    // Instead, we'll open Instagram in a new window and let users manually share
    // Or provide an intermediate page for instructions
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <div className="flex space-x-2">
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
  );
};

export default SocialShareButtons;
