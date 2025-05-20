
import React from 'react';
import { Map, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import NearbyMap from '@/components/Map';

interface ViewToggleButtonProps {
  isMap: boolean;
  toggleView: () => void;
}

export const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ isMap, toggleView }) => {
  return (
    <div className="fixed bottom-8 right-8 z-10">
      <Button 
        onClick={toggleView}
        size="lg"
        className={cn(
          "shadow-lg transition-all duration-200 transform hover:scale-105 font-semibold",
          isMap 
          ? "bg-white text-primary hover:bg-gray-100 border border-primary" 
          : "bg-primary text-white hover:bg-primary/90"
        )}
      >
        {isMap ? (
          <>
            <List className="mr-2 h-5 w-5" />
            Ver lista
          </>
        ) : (
          <>
            <Map className="mr-2 h-5 w-5" />
            Ver mapa
          </>
        )}
      </Button>
    </div>
  );
};

// Update ContestMapView component to use the Map component
export const ContestMapView = () => {
  return (
    <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border border-border">
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button 
          className="flex items-center justify-center bg-[#F0C14B] hover:bg-[#F0C14B]/90 text-black font-medium px-6 py-3 rounded-full shadow-lg"
        >
          <span>Concursos cercanos</span>
        </Button>
      </div>
      <NearbyMap />
    </div>
  );
};

// Make sure we export the component as default too
export default ContestMapView;
