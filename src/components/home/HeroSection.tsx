
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroImage {
  url: string;
  category: string;
}

interface HeroSectionProps {
  heroImages: HeroImage[];
  texts: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    exploreContests: string;
    startNow: string;
  };
}

const HeroSection = ({ heroImages, texts }: HeroSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div 
            key={image.category}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img 
              src={image.url} 
              alt={`Photography ${image.category}`}
              className="absolute w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
                e.currentTarget.style.objectFit = "cover";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 container max-w-7xl mx-auto h-[90vh] flex items-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white leading-tight">{texts.heroTitle}</h1>
          <p className="text-2xl md:text-4xl mb-8 text-white/90 font-medium">{texts.heroSubtitle}</p>
          <p className="text-xl md:text-3xl mb-12 max-w-2xl text-white/80">{texts.heroDescription}</p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Button asChild size="lg" className="rounded-full px-12 py-6 bg-white text-[#4891AA] hover:bg-white/90 text-xl font-bold h-auto">
              <Link to="/contests">
                <Camera className="mr-3 h-6 w-6" />
                <span>{texts.exploreContests}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-12 py-6 bg-[#4891AA]/80 border-white text-white hover:bg-[#4891AA]/90 hover:border-white text-xl font-bold h-auto">
              <Link to="/register">
                <span>{texts.startNow}</span>
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Mobile App Link - Fixed to redirect to /mobile-prototype */}
          <div className="mt-8">
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8 py-4 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-lg font-medium h-auto">
              <Link to="/mobile-prototype">
                <Smartphone className="mr-3 h-5 w-5" />
                <span>APP</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
