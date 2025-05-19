import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prediction, GoogleMapsServices } from "../types/location.types";

// Lista de ciudades españolas principales para autocompletado sin API
const spanishCities = [
  "A Coruña", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Barcelona", 
  "Bilbao", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba", 
  "Cuenca", "Girona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén", 
  "Las Palmas", "León", "Lleida", "Logroño", "Lugo", "Madrid", "Málaga", "Murcia", 
  "Ourense", "Oviedo", "Palencia", "Palma de Mallorca", "Pamplona", "Pontevedra", 
  "Salamanca", "San Sebastián", "Santa Cruz de Tenerife", "Santander", "Segovia", 
  "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", 
  "Vitoria", "Zamora", "Zaragoza"
];

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

    setIsLoading(true);
    setApiError(null);
    
    // Si la API de Google Maps no está disponible, usamos la lista local de ciudades
    if (!services.autocompleteService || isApiLoading) {
      const filteredCities = spanishCities
        .filter(city => city.toLowerCase().includes(input.toLowerCase()))
        .map((city, index) => ({
          place_id: `local-${index}`,
          description: city,
          structured_formatting: {
            main_text: city,
            main_text_matched_substrings: [{
              offset: city.toLowerCase().indexOf(input.toLowerCase()),
              length: input.length
            }],
            secondary_text: "España"
          }
        }));
      
      setPredictions(filteredCities);
      setIsLoading(false);
      return;
    }
    
    // Si Google Maps API está disponible, la usamos con restricción a España
    try {
      const searchOptions = {
        input,
        types: ['(cities)'],
        componentRestrictions: { country: 'es' } // Restringir a España
      };

      services.autocompleteService.getPlacePredictions(
        searchOptions,
        (results, status) => {
          setIsLoading(false);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Incluso con la API, añadimos sugerencias locales
            const apiResults = results.slice(0, 5); // Limitamos a 5 resultados de API
            
            // Filtramos ciudades locales que no están ya en los resultados de la API
            const localResults = spanishCities
              .filter(city => city.toLowerCase().includes(input.toLowerCase()))
              .filter(city => !apiResults.some(r => r.description.includes(city)))
              .slice(0, 3) // Limitamos a 3 resultados locales adicionales
              .map((city, index) => ({
                place_id: `local-${index}`,
                description: `${city}, España`,
                structured_formatting: {
                  main_text: city,
                  main_text_matched_substrings: [{
                    offset: city.toLowerCase().indexOf(input.toLowerCase()),
                    length: input.length
                  }],
                  secondary_text: "España"
                }
              }));
              
            setPredictions([...apiResults, ...localResults]);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            // Si no hay resultados de la API, usamos solo las sugerencias locales
            const localResults = spanishCities
              .filter(city => city.toLowerCase().includes(input.toLowerCase()))
              .slice(0, 5)
              .map((city, index) => ({
                place_id: `local-${index}`,
                description: `${city}, España`,
                structured_formatting: {
                  main_text: city,
                  main_text_matched_substrings: [{
                    offset: city.toLowerCase().indexOf(input.toLowerCase()),
                    length: input.length
                  }],
                  secondary_text: "España"
                }
              }));
              
            setPredictions(localResults);
          } else {
            // Gestión de errores con fallback a datos locales
            console.error("Place prediction error:", status);
            
            // Usar datos locales como respaldo
            const localResults = spanishCities
              .filter(city => city.toLowerCase().includes(input.toLowerCase()))
              .slice(0, 5)
              .map((city, index) => ({
                place_id: `local-${index}`,
                description: `${city}, España`,
                structured_formatting: {
                  main_text: city,
                  main_text_matched_substrings: [{
                    offset: city.toLowerCase().indexOf(input.toLowerCase()),
                    length: input.length
                  }],
                  secondary_text: "España"
                }
              }));
              
            setPredictions(localResults);
              
            if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                setApiError("Se ha superado el límite de consultas a la API. Usando datos locales.");
              } else if (status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
                setApiError("La API de Google Maps no está habilitada. Usando datos locales.");
              } else {
                setApiError("Error en el servicio de búsqueda. Usando datos locales.");
              }
            }
          }
        }
      );
    } catch (error) {
      console.error("Error calling autocomplete service:", error);
      setIsLoading(false);
      setApiError("Error en el servicio de autocompletado. Usando datos locales.");
      
      // Fallback a datos locales
      const localResults = spanishCities
        .filter(city => city.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 5)
        .map((city, index) => ({
          place_id: `local-${index}`,
          description: `${city}, España`,
          structured_formatting: {
            main_text: city,
            main_text_matched_substrings: [{
              offset: city.toLowerCase().indexOf(input.toLowerCase()),
              length: input.length
            }],
            secondary_text: "España"
          }
        }));
        
      setPredictions(localResults);
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
