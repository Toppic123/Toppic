
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{texts.organizerTitle}</h2>
          <p className="text-gray-300 mb-8">
            {texts.organizerDesc}
          </p>
          <Button asChild size="lg" className="rounded-full px-8 bg-[#4891AA] hover:bg-[#3a7a8b] text-white">
            <Link to="/organizers">
              <span>{texts.discoverPlans}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
