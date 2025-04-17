
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";

// Define interfaces for our component and Google Maps types
interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

interface PlacePrediction {
  description: string;
  place_id: string;
}

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const googleScriptLoaded = useRef(false);

  // Function to initialize Google Maps API
  const initializeGoogleMaps = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    try {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      googleScriptLoaded.current = true;
    } catch (error) {
      console.error("Error initializing Google Maps API:", error);
    }
  };

  // Load Google Maps API script
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      initializeGoogleMaps();
      return;
    }

    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.onload = initializeGoogleMaps;
    document.head.appendChild(googleMapsScript);

    return () => {
      // Clean up script if component unmounts during loading
      if (!googleScriptLoaded.current) {
        document.head.removeChild(googleMapsScript);
      }
    };
  }, []);

  // Function to fetch place predictions
  const fetchPredictions = (input: string) => {
    if (!input.trim() || !autocompleteService.current || !googleScriptLoaded.current) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    autocompleteService.current.getPlacePredictions(
      {
        input,
        types: ['(regions)', 'geocode'], // include regions and addresses
      },
      (results, status) => {
        setIsLoading(false);
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
          setPredictions([]);
          return;
        }
        setPredictions(results);
      }
    );
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    fetchPredictions(value);
  };

  return (
    <div className="relative">
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
            <div className="py-6 text-center text-sm">Buscando ubicaciones...</div>
          ) : (
            <>
              <CommandEmpty>No se encontraron ubicaciones</CommandEmpty>
              <CommandGroup heading="Ubicaciones">
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.description}
                    onSelect={(selectedValue) => {
                      onChange(selectedValue);
                      setSearchValue("");
                      setPredictions([]);
                      setOpen(false);
                    }}
                  >
                    {prediction.description}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default LocationCombobox;
