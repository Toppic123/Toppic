
import React, { useState } from 'react';
import { Map, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

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

// Add a default ContestMapView component
export const ContestMapView = () => {
  return (
    <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border border-border">
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Cargando mapa de concursos...</p>
      </div>
    </div>
  );
};

// Make sure we export the component as default too
export default ContestMapView;
