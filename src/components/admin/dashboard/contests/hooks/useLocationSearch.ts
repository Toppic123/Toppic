
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prediction, GoogleMapsServices } from "../types/location.types";

export const useLocationSearch = (services: GoogleMapsServices, isApiLoading: boolean) => {
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

    if (isApiLoading) {
      setIsLoading(true);
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
    
    const searchOptions = {
      input,
      types: ['geocode', 'establishment', 'address', 'regions', 'cities'],
      componentRestrictions: { country: 'es' }
    };

    try {
      services.autocompleteService.getPlacePredictions(
        searchOptions,
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
    } catch (error) {
      console.error("Error calling autocomplete service:", error);
      setIsLoading(false);
      setApiError("Error en el servicio de autocompletado. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  const handleLocationSelect = (placeId: string, description: string, onChange: (value: string) => void) => {
    if (!services.placesService) {
      onChange(description);
      toast({
        title: "Ubicación guardada",
        description: "La ubicación se ha guardado con la descripción proporcionada.",
      });
      return;
    }
    
    try {
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
            
            toast({
              title: "Ubicación guardada",
              description: `Se ha guardado la ubicación: ${locationName}`,
            });
          } else {
            console.error("Place details error:", status);
            onChange(description);
            
            toast({
              title: "Ubicación guardada",
              description: "Se ha guardado la descripción de la ubicación.",
            });
          }
        }
      );
    } catch (error) {
      console.error("Error getting place details:", error);
      onChange(description);
      toast({
        title: "Ubicación guardada",
        description: "Se ha guardado la descripción de la ubicación debido a un error en el servicio.",
      });
    }
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

  const clearResults = () => {
    setPredictions([]);
  };

  return {
    predictions,
    isLoading,
    apiError,
    searchLocations,
    handleLocationSelect,
    handleManualInput,
    clearResults
  };
};
