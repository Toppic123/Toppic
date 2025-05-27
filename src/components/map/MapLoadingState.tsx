
import { MapPin } from "lucide-react";

const MapLoadingState = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
      <div className="flex flex-col items-center">
        <MapPin className="w-8 h-8 text-primary animate-pulse" />
        <p className="mt-4 text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  );
};

export default MapLoadingState;
