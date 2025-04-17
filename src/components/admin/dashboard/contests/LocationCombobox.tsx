
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin, AlertCircle } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // If we have a pre-selected value, show it
  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  // Initialize Google Maps and services
  useEffect(() => {
    setApiError(null);
    const apiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // This is a placeholder key and should be replaced
    
    // Load Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // Handle script load errors
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setApiError("No se pudo cargar la API de Google Maps. Por favor, inténtelo de nuevo más tarde.");
      setIsLoading(false);
    };
    
    script.onload = () => {
      try {
        if (mapRef.current) {
          // Create a simple map that will be used for PlacesService
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 40.416775, lng: -3.70379 }, // Madrid coordinates
            zoom: 15,
          });
          setMap(mapInstance);
          
          // Initialize services
          setPlacesService(new google.maps.places.PlacesService(mapRef.current));
          setAutocompleteService(new google.maps.places.AutocompleteService());
          console.log("Google Maps services initialized successfully");
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setApiError("Error al inicializar los servicios de ubicación. Compruebe la conexión a internet.");
      }
    };
    
    // Check if script is already loaded
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      document.head.appendChild(script);
    } else {
      // Script already exists, try to initialize services
      try {
        if (window.google && window.google.maps && window.google.maps.places) {
          if (mapRef.current) {
            const mapInstance = new google.maps.Map(mapRef.current, {
              center: { lat: 40.416775, lng: -3.70379 },
              zoom: 15,
            });
            setMap(mapInstance);
            
            setPlacesService(new google.maps.places.PlacesService(mapRef.current));
            setAutocompleteService(new google.maps.places.AutocompleteService());
            console.log("Google Maps services initialized from existing script");
          }
        }
      } catch (error) {
        console.error("Error initializing Google Maps from existing script:", error);
        setApiError("Error al inicializar los servicios de ubicación. La API podría no estar activada.");
      }
    }
    
    return () => {
      // Clean up only if we added the script
      const addedScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`);
      if (addedScript && document.head.contains(addedScript)) {
        document.head.removeChild(addedScript);
      }
    };
  }, []);

  // Search for locations using Google Places Autocomplete
  const searchLocations = (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    if (!autocompleteService) {
      console.error("Autocomplete service not available");
      setApiError("El servicio de autocompletado no está disponible. Asegúrese de que su API key es válida.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    autocompleteService.getPlacePredictions(
      {
        input,
        types: ['geocode', 'establishment', 'address', 'regions', 'cities'],
        componentRestrictions: { country: 'es' } // Restrict to Spain, remove or change as needed
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

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Reset error message when user types
    if (apiError) setApiError(null);
    searchLocations(value);
  };

  // Handle manual location input (fallback when API fails)
  const handleManualInput = () => {
    if (searchValue.trim()) {
      onChange(searchValue);
      setPredictions([]);
      toast({
        title: "Ubicación guardada",
        description: "La ubicación se ha guardado manualmente.",
      });
    }
  };

  // Handle location selection
  const handleLocationSelect = (placeId: string, description: string) => {
    if (!placesService) {
      // Fallback if places service is not available
      onChange(description);
      setSearchValue(description);
      setPredictions([]);
      return;
    }
    
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'geometry']
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const locationName = place.formatted_address || description;
          onChange(locationName);
          setSearchValue(locationName);
          setPredictions([]);
          
          // Center the map on the selected location
          if (map && place.geometry?.location) {
            map.setCenter(place.geometry.location);
          }
        } else {
          console.error("Place details error:", status);
          onChange(description);
          setSearchValue(description);
          setPredictions([]);
        }
      }
    );
  };

  return (
    <div className="relative">
      {apiError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Buscar ubicación..."
              value={searchValue}
              onValueChange={handleSearchChange}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm">
                <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                Buscando ubicaciones...
              </div>
            ) : predictions.length === 0 && searchValue.trim() !== "" ? (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  <p>No se encontraron ubicaciones</p>
                  {apiError ? (
                    <button 
                      onClick={handleManualInput}
                      className="text-primary hover:underline mt-2 text-xs"
                    >
                      Usar texto ingresado como ubicación
                    </button>
                  ) : null}
                </div>
              </CommandEmpty>
            ) : (
              <>
                {searchValue.trim() === "" ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Escribe para buscar ubicaciones
                  </div>
                ) : (
                  <CommandGroup heading="Ubicaciones">
                    {predictions.map((prediction) => (
                      <CommandItem
                        key={prediction.place_id}
                        value={prediction.description}
                        onSelect={() => handleLocationSelect(prediction.place_id, prediction.description)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {prediction.structured_formatting?.main_text || prediction.description.split(',')[0]}
                          </span>
                          {prediction.structured_formatting?.secondary_text && (
                            <span className="text-xs text-muted-foreground">
                              {prediction.structured_formatting.secondary_text}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </div>
      
      {/* Hidden div for Google Maps initialization */}
      <div ref={mapRef} className="hidden w-0 h-0"></div>
    </div>
  );
};

export default LocationCombobox;
