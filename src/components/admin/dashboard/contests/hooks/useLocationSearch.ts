
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prediction, GoogleMapsServices } from "../types/location.types";

// Lista de ciudades españolas principales para búsqueda local cuando la API no está disponible
const spanishCities = [
  { description: "Madrid, España", place_id: "madrid_local" },
  { description: "Barcelona, España", place_id: "barcelona_local" },
  { description: "Valencia, España", place_id: "valencia_local" },
  { description: "Sevilla, España", place_id: "sevilla_local" },
  { description: "Zaragoza, España", place_id: "zaragoza_local" },
  { description: "Málaga, España", place_id: "malaga_local" },
  { description: "Murcia, España", place_id: "murcia_local" },
  { description: "Palma de Mallorca, España", place_id: "palma_local" },
  { description: "Las Palmas de Gran Canaria, España", place_id: "laspalmas_local" },
  { description: "Bilbao, España", place_id: "bilbao_local" },
  { description: "Alicante, España", place_id: "alicante_local" },
  { description: "Córdoba, España", place_id: "cordoba_local" },
  { description: "Valladolid, España", place_id: "valladolid_local" },
  { description: "Vigo, España", place_id: "vigo_local" },
  { description: "Gijón, España", place_id: "gijon_local" },
  { description: "Granada, España", place_id: "granada_local" },
  { description: "A Coruña, España", place_id: "coruna_local" },
  { description: "Vitoria-Gasteiz, España", place_id: "vitoria_local" },
  { description: "Santa Cruz de Tenerife, España", place_id: "tenerife_local" },
  { description: "Pamplona, España", place_id: "pamplona_local" },
  { description: "Almería, España", place_id: "almeria_local" },
  { description: "San Sebastián, España", place_id: "sansebastian_local" },
  { description: "Burgos, España", place_id: "burgos_local" },
  { description: "Albacete, España", place_id: "albacete_local" },
  { description: "Santander, España", place_id: "santander_local" },
  { description: "Castellón de la Plana, España", place_id: "castellon_local" },
  { description: "Logroño, España", place_id: "logrono_local" },
  { description: "Badajoz, España", place_id: "badajoz_local" },
  { description: "Salamanca, España", place_id: "salamanca_local" },
  { description: "Huelva, España", place_id: "huelva_local" },
  { description: "Lleida, España", place_id: "lleida_local" },
  { description: "Tarragona, España", place_id: "tarragona_local" },
  { description: "León, España", place_id: "leon_local" },
  { description: "Cádiz, España", place_id: "cadiz_local" },
  { description: "Jaén, España", place_id: "jaen_local" },
  { description: "Ourense, España", place_id: "ourense_local" },
  { description: "Girona, España", place_id: "girona_local" },
  { description: "Lugo, España", place_id: "lugo_local" },
  { description: "Cáceres, España", place_id: "caceres_local" },
  { description: "Ceuta, España", place_id: "ceuta_local" },
  { description: "Melilla, España", place_id: "melilla_local" },
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

    // Si la API está cargando o no está disponible, usamos la búsqueda local
    if (isApiLoading || !services.autocompleteService) {
      setIsLoading(true);
      
      // Buscar en nuestra lista local de ciudades españolas
      const filteredCities = spanishCities.filter(city => 
        city.description.toLowerCase().includes(input.toLowerCase())
      ).map(city => ({
        description: city.description,
        place_id: city.place_id,
        // Añadir estructura compatible para la interfaz Prediction
        structured_formatting: {
          main_text: city.description.split(',')[0].trim(),
          secondary_text: "España",
          main_text_matched_substrings: []
        }
      }));
      
      setPredictions(filteredCities);
      setIsLoading(false);
      
      if (!services.autocompleteService && filteredCities.length === 0) {
        setApiError("El servicio de autocompletado no está disponible. Usando opciones locales limitadas.");
      }
      
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    const searchOptions = {
      input,
      types: ['(cities)'], // Enfocarse específicamente en ciudades
      componentRestrictions: { country: 'es' } // Restringir a España
    };

    services.autocompleteService.getPlacePredictions(searchOptions, (predictions, status) => {
      setIsLoading(false);
      
      if (status !== services.status.OK) {
        console.error('Error fetching predictions:', status);
        setPredictions([]);
        
        if (status === services.status.ZERO_RESULTS) {
          // Usar búsqueda local como fallback
          const filteredCities = spanishCities
            .filter(city => city.description.toLowerCase().includes(input.toLowerCase()))
            .map(city => ({
              description: city.description,
              place_id: city.place_id,
              structured_formatting: {
                main_text: city.description.split(',')[0].trim(),
                secondary_text: "España",
                main_text_matched_substrings: []
              }
            }));
          
          setPredictions(filteredCities);
          
          if (filteredCities.length === 0) {
            setApiError("No se encontraron resultados");
          }
        } else {
          setApiError(`Error: ${status}`);
        }
        
        return;
      }
      
      setPredictions(predictions || []);
    });
  };

  const getDetailsFromPlaceId = async (placeId: string): Promise<{
    formattedAddress: string;
    coordinates: { lat: number; lng: number };
  } | null> => {
    // Si es un ID local, devolver datos simulados
    if (placeId.includes('_local')) {
      const cityName = placeId.split('_')[0];
      
      // Coordenadas aproximadas para algunas ciudades principales
      const cityCoordinates: Record<string, { lat: number; lng: number }> = {
        madrid: { lat: 40.4168, lng: -3.7038 },
        barcelona: { lat: 41.3851, lng: 2.1734 },
        valencia: { lat: 39.4699, lng: -0.3763 },
        sevilla: { lat: 37.3891, lng: -5.9845 },
        malaga: { lat: 36.7213, lng: -4.4214 },
        // Añadir más ciudades según sea necesario
      };
      
      // Búsqueda del nombre de la ciudad en el objeto de coordenadas
      const coordinates = cityCoordinates[cityName.toLowerCase()] || { lat: 40.4168, lng: -3.7038 }; // Por defecto Madrid
      
      return {
        formattedAddress: spanishCities.find(city => city.place_id === placeId)?.description || `${cityName}, España`,
        coordinates
      };
    }
    
    if (!services.placesService) {
      toast({
        title: "Error",
        description: "El servicio de lugares no está disponible",
        variant: "destructive",
      });
      return null;
    }

    return new Promise((resolve) => {
      services.placesService.getDetails(
        { placeId, fields: ['formatted_address', 'geometry'] },
        (place, status) => {
          if (status !== services.status.OK || !place) {
            toast({
              title: "Error",
              description: "No se pudieron obtener los detalles de esta ubicación",
              variant: "destructive",
            });
            resolve(null);
            return;
          }

          resolve({
            formattedAddress: place.formatted_address || '',
            coordinates: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
          });
        }
      );
    });
  };

  return {
    predictions,
    isLoading,
    apiError,
    searchLocations,
    getDetailsFromPlaceId,
  };
};
