
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
    // Load Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (mapRef.current) {
        // Create a simple map that will be used for PlacesService
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 40.416775, lng: -3.70379 }, // Madrid coordinates
          zoom: 15,
        });
        setMap(mapInstance);
        
        // Initialize services
        setPlacesService(new google.maps.places.PlacesService(mapInstance));
        setAutocompleteService(new google.maps.places.AutocompleteService());
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up the script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Search for locations using Google Places Autocomplete
  const searchLocations = (input: string) => {
    if (!input.trim() || !autocompleteService) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
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
          setPredictions([]);
          console.error("Place prediction error:", status);
        }
      }
    );
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    searchLocations(value);
  };

  // Handle location selection
  const handleLocationSelect = (placeId: string, description: string) => {
    if (!placesService) return;
    
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
