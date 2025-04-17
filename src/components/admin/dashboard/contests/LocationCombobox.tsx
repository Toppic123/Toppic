
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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const googleScriptLoaded = useRef(false);

  // Function to initialize Google Maps API
  const initializeGoogleMaps = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded yet");
      return;
    }

    try {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      googleScriptLoaded.current = true;
      setApiLoaded(true);
      setApiError(null);
      console.log("Google Maps API initialized successfully");
    } catch (error) {
      console.error("Error initializing Google Maps API:", error);
      setApiError("Error al inicializar la API de Google Maps");
      toast({
        title: "Error",
        description: "No se pudo inicializar el servicio de búsqueda de ubicaciones",
        variant: "destructive",
      });
    }
  };

  // Load Google Maps API script
  useEffect(() => {
    // Use a valid API key with Places API enabled - currently using a test key
    const API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"; // This is a Google public test key
    
    if (window.google && window.google.maps && window.google.maps.places) {
      initializeGoogleMaps();
      return;
    }

    setIsLoading(true);
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.onload = () => {
      initializeGoogleMaps();
      setIsLoading(false);
    };
    googleMapsScript.onerror = () => {
      console.error("Error loading Google Maps API");
      setApiError("Error al cargar la API de Google Maps");
      setIsLoading(false);
      toast({
        title: "Error",
        description: "No se pudo cargar el servicio de búsqueda de ubicaciones",
        variant: "destructive",
      });
    };
    document.head.appendChild(googleMapsScript);

    return () => {
      // Clean up script if component unmounts during loading
      if (!googleScriptLoaded.current) {
        document.head.removeChild(googleMapsScript);
      }
    };
  }, [toast]);

  // Function to fetch place predictions
  const fetchPredictions = (input: string) => {
    if (!input.trim() || !autocompleteService.current || !googleScriptLoaded.current) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      autocompleteService.current.getPlacePredictions(
        {
          input,
          types: ['(regions)', 'geocode'], // include regions and addresses
        },
        (results, status) => {
          setIsLoading(false);
          if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
            console.log("Place predictions status:", status);
            setPredictions([]);
            return;
          }
          
          // Log results to help debug
          console.log("Places results:", results);
          setPredictions(results as PlacePrediction[]);
        }
      );
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setIsLoading(false);
      setPredictions([]);
      setApiError("Error al buscar ubicaciones");
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    fetchPredictions(value);
  };

  // If we have a pre-selected value, show it
  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

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
            disabled={!apiLoaded || !!apiError}
          />
        </div>
        <CommandList>
          {isLoading ? (
            <div className="py-6 text-center text-sm">Buscando ubicaciones...</div>
          ) : apiError ? (
            <div className="py-6 text-center text-sm text-destructive">{apiError}</div>
          ) : !apiLoaded ? (
            <div className="py-6 text-center text-sm">Cargando servicio de ubicaciones...</div>
          ) : predictions.length === 0 && searchValue.trim() !== "" ? (
            <CommandEmpty>No se encontraron ubicaciones</CommandEmpty>
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
                      onSelect={(selectedValue) => {
                        onChange(selectedValue);
                        setSearchValue(selectedValue);
                        setPredictions([]);
                        setOpen(false);
                      }}
                    >
                      {prediction.description}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default LocationCombobox;
