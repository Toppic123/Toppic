
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prediction, GoogleMapsServices } from "../types/location.types";

export const useLocationSearch = (services: GoogleMapsServices) => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const searchLocations = (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    if (!services.autocompleteService) {
      console.error("Autocomplete service not available");
      setApiError("El servicio de autocompletado no está disponible. Asegúrese de que su API key es válida.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    services.autocompleteService.getPlacePredictions(
      {
        input,
        types: ['geocode', 'establishment', 'address', 'regions', 'cities'],
        componentRestrictions: { country: 'es' }
      },
      (results, status) => {
        setIsLoading(false);
        
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          console.error("Place prediction error:", status);
          setPredictions([]);
          
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            // No error, just no results
          } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            setApiError("Se ha superado el límite de consultas a la API. Inténtelo de nuevo más tarde.");
          } else if (status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
            setApiError("La API de Google Maps no está habilitada. Contacte con el administrador del sitio.");
          } else if (status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST) {
            setApiError("Petición inválida. Por favor, inténtelo de nuevo.");
          } else {
            setApiError("Error desconocido al buscar ubicaciones. Por favor, inténtelo de nuevo más tarde.");
          }
        }
      }
    );
  };

  const handleLocationSelect = (placeId: string, description: string, onChange: (value: string) => void) => {
    if (!services.placesService) {
      onChange(description);
      return;
    }
    
    services.placesService.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'geometry']
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const locationName = place.formatted_address || description;
          onChange(locationName);
          
          if (services.map && place.geometry?.location) {
            services.map.setCenter(place.geometry.location);
          }
        } else {
          console.error("Place details error:", status);
          onChange(description);
        }
      }
    );
  };

  const handleManualInput = (searchValue: string, onChange: (value: string) => void) => {
    if (searchValue.trim()) {
      onChange(searchValue);
      setPredictions([]);
      toast({
        title: "Ubicación guardada",
        description: "La ubicación se ha guardado manualmente.",
      });
    }
  };

  return {
    predictions,
    isLoading,
    apiError,
    searchLocations,
    handleLocationSelect,
    handleManualInput,
  };
};
