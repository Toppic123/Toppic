
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ContestAdBannerProps {
  position: "top" | "sidebar";
  contestId?: string;
}

const ContestAdBanner = ({ position, contestId }: ContestAdBannerProps) => {
  // Banners publicitarios de muestra (en una app real vendrían de una base de datos)
  const bannerAds = [
    {
      id: "ad1",
      title: "Cámaras Profesionales",
      brand: "FotoMax",
      description: "Descubre nuestra nueva serie de cámaras profesionales",
      imageUrl: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop",
      url: "#"
    },
    {
      id: "ad2",
      title: "Cursos de fotografía",
      brand: "FotoEscuela",
      description: "Aprende de los mejores fotógrafos de España",
      imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1170&auto=format&fit=crop",
      url: "#"
    },
    {
      id: "ad3",
      title: "Accesorios fotográficos",
      brand: "FotoShop",
      description: "Los mejores accesorios para tus sesiones fotográficas",
      imageUrl: "https://images.unsplash.com/photo-1606986601547-8a41eead1a6f?q=80&w=1074&auto=format&fit=crop",
      url: "#"
    }
  ];

  // Seleccionar un anuncio aleatorio del array
  const randomAd = bannerAds[Math.floor(Math.random() * bannerAds.length)];

  if (position === "top") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden mb-6 border border-primary/20"
      >
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-24 h-16 bg-cover bg-center rounded" 
              style={{ backgroundImage: `url(${randomAd.imageUrl})` }}
            ></div>
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                {randomAd.brand} • Anuncio
              </p>
              <h3 className="text-lg font-bold mb-1">{randomAd.title}</h3>
              <p className="text-sm text-muted-foreground">{randomAd.description}</p>
            </div>
          </div>
          <a 
            href={randomAd.url}
            className="flex items-center bg-primary text-white px-3 py-1.5 rounded text-sm hover:bg-primary/90 transition-colors"
          >
            <span className="mr-1">Ver más</span>
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="bg-primary/10 py-1 px-4 text-xs text-center">
          Los anuncios en concursos ayudan a llegar a más fotógrafos • Ejemplo de cómo aparecería tu publicidad
        </div>
      </motion.div>
    );
  }

  if (position === "sidebar") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full bg-white dark:bg-background border rounded-lg overflow-hidden mb-6"
      >
        <div className="relative h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${randomAd.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 w-full p-4">
            <p className="text-xs uppercase tracking-wider text-white/80 font-semibold mb-1">
              {randomAd.brand} • Anuncio
            </p>
            <h3 className="text-lg font-bold text-white mb-1">{randomAd.title}</h3>
            <a 
              href={randomAd.url}
              className="flex items-center bg-white text-primary px-3 py-1.5 rounded text-sm hover:bg-white/90 transition-colors mt-2 w-fit"
            >
              <span className="mr-1">Ver ofertas</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="bg-primary/10 py-1 px-4 text-xs text-center">
          Ejemplo de cómo aparecería tu publicidad
        </div>
      </motion.div>
    );
  }

  return null;
};

export default ContestAdBanner;
