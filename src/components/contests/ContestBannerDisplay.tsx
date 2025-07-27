
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import bannerHomepage from "@/assets/banner-homepage-photography.jpg";
import bannerSidebar from "@/assets/banner-sidebar-photo-studio.jpg";
import bannerContest from "@/assets/banner-contest-photo-course.jpg";
import bannerPhotographyEquipment from "@/assets/banner-photography-equipment.jpg";
import bannerMobilePhones from "@/assets/banner-mobile-phones.jpg";
import bannerPhotoEditing from "@/assets/banner-photo-editing.jpg";
import bannerPhotographyEquipmentNew from "@/assets/banner-photography-equipment-new.jpg";
import bannerMobilePhonesNew from "@/assets/banner-mobile-phones-new.jpg";

interface Banner {
  id: string;
  banner_type: string;
  image_url: string;
  display_order: number;
}

interface ContestBannerDisplayProps {
  contestId?: string;
  bannerType: "homepage" | "sidebar" | "contestPage";
  className?: string;
}

const ContestBannerDisplay = ({ contestId, bannerType, className }: ContestBannerDisplayProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        
        let query = supabase
          .from('contest_banners')
          .select('*')
          .eq('banner_type', bannerType)
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        
        // If contestId is provided, filter by it, otherwise get banners for all contests
        if (contestId) {
          query = query.eq('contest_id', contestId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error loading banners:', error);
          return;
        }
        
        // If no banners found for specific contest, try to get general banners
        if ((!data || data.length === 0) && contestId) {
          const { data: generalBanners } = await supabase
            .from('contest_banners')
            .select('*')
            .eq('banner_type', bannerType)
            .eq('is_active', true)
            .order('display_order', { ascending: true })
            .limit(3);
          
          setBanners(generalBanners || []);
        } else {
          setBanners(data || []);
        }
        
      } catch (error) {
        console.error('Error loading banners:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBanners();
  }, [contestId, bannerType]);

  // Show placeholder banners when no database banners exist
  if (!isLoading && banners.length === 0) {
    // Array of advertising banners to show randomly
    const advertisingBanners = [
      {
        src: bannerPhotographyEquipmentNew,
        alt: "Equipo Fotográfico Profesional",
        title: "Publicidad de Equipo Fotográfico"
      },
      {
        src: bannerMobilePhonesNew,
        alt: "Smartphones para Fotografía",
        title: "Publicidad de Teléfonos Móviles"
      },
      {
        src: bannerPhotoEditing,
        alt: "Software de Edición Profesional",
        title: "Publicidad de Software de Edición"
      }
    ];

    // Show 1-2 random banners
    const numBanners = Math.floor(Math.random() * 2) + 1;
    const shuffledBanners = [...advertisingBanners].sort(() => Math.random() - 0.5).slice(0, numBanners);

    return (
      <div className={className}>
        <div className="space-y-4">
          {shuffledBanners.map((banner, index) => (
            <div key={index} className="mb-2">
              <div className="text-xs text-gray-500 mb-1 font-medium">{banner.title}</div>
              <img 
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              />
              <div className="text-xs text-gray-400 mt-1">Este es un ejemplo de cómo se mostraría tu publicidad</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-muted rounded-md ${className}`}>
        <div className="w-full h-32 bg-muted rounded-md"></div>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {banners.map((banner) => (
        <img
          key={banner.id}
          src={banner.image_url}
          alt={`Banner ${banner.banner_type}`}
          className="w-full h-auto rounded-md border mb-4 last:mb-0"
        />
      ))}
    </div>
  );
};

export default ContestBannerDisplay;
