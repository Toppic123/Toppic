
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
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
    // Instagram doesn't have a direct share URL API like other platforms
    // Best practice is to open Instagram in a new window and let users manually share
    window.open('https://www.instagram.com/', '_blank');
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
        onClick={shareOnInstagram}
      >
        <Instagram size={16} />
        <span>Instagram</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
