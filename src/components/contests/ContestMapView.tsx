
import React, { useState, useEffect } from 'react';
import { Map, Grid2x2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleButtonProps {
  isMap: boolean;
  toggleView: () => void;
}

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ isMap, toggleView }) => {
  return (
    <div className="fixed bottom-8 right-8 z-10">
      <Button 
        onClick={toggleView}
        size="lg"
        className="shadow-lg bg-primary hover:bg-primary/90 text-white transition-all duration-200 transform hover:scale-105"
      >
        {isMap ? (
          <>
            <Grid2x2 className="mr-2 h-5 w-5" />
            Ver cuadrícula
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
const ContestMapView = () => {
  return (
    <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border border-border">
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Cargando mapa de concursos...</p>
      </div>
    </div>
  );
};

export { ViewToggleButton };
export default ContestMapView;
