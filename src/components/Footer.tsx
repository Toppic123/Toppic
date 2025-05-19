
import { Link } from "react-router-dom";

interface FooterProps {
  texts: {
    rights: string;
    privacy: string;
    terms: string;
    votingSystem: string;
  }
}

const Footer = ({ texts }: FooterProps) => {
  return (
    <footer className="py-6 px-6 border-t bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {texts.rights} {new Date().getFullYear()}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {texts.privacy}
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {texts.terms}
            </Link>
            <Link to="/voting-system" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {texts.votingSystem}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
