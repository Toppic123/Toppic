
import * as React from "react";
import { useState, useEffect } from "react";
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
  const [initialized, setInitialized] = useState(false);

  // Sample locations for demo purposes (since the Google Maps API has restrictions)
  const sampleLocations = [
    { description: "Madrid, España", place_id: "madrid_1" },
    { description: "Barcelona, España", place_id: "barcelona_1" },
    { description: "Valencia, España", place_id: "valencia_1" },
    { description: "Sevilla, España", place_id: "sevilla_1" },
    { description: "Zaragoza, España", place_id: "zaragoza_1" },
    { description: "Málaga, España", place_id: "malaga_1" },
    { description: "Murcia, España", place_id: "murcia_1" },
    { description: "Palma de Mallorca, España", place_id: "palma_1" },
    { description: "Las Palmas de Gran Canaria, España", place_id: "laspalmas_1" },
    { description: "Bilbao, España", place_id: "bilbao_1" },
    { description: "Alicante, España", place_id: "alicante_1" },
    { description: "Córdoba, España", place_id: "cordoba_1" },
    { description: "Valladolid, España", place_id: "valladolid_1" },
    { description: "Vigo, España", place_id: "vigo_1" },
    { description: "Gijón, España", place_id: "gijon_1" },
    { description: "Paris, France", place_id: "paris_1" },
    { description: "London, United Kingdom", place_id: "london_1" },
    { description: "Berlin, Germany", place_id: "berlin_1" },
    { description: "Rome, Italy", place_id: "rome_1" },
    { description: "Amsterdam, Netherlands", place_id: "amsterdam_1" },
    { description: "Brussels, Belgium", place_id: "brussels_1" },
    { description: "Lisbon, Portugal", place_id: "lisbon_1" },
    { description: "New York, United States", place_id: "newyork_1" },
    { description: "Los Angeles, United States", place_id: "losangeles_1" },
    { description: "Chicago, United States", place_id: "chicago_1" },
    { description: "Tokyo, Japan", place_id: "tokyo_1" },
    { description: "Sydney, Australia", place_id: "sydney_1" },
    { description: "Rio de Janeiro, Brazil", place_id: "rio_1" },
    { description: "Mexico City, Mexico", place_id: "mexicocity_1" }
  ];

  // Initialize component
  useEffect(() => {
    console.log("LocationCombobox initialized");
    setInitialized(true);
  }, []);

  // If we have a pre-selected value, show it
  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  // Search locations based on input
  const searchLocations = (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    console.log("Searching for:", input);
    
    // Filter the sample locations based on input
    setTimeout(() => {
      const filtered = sampleLocations.filter(
        location => location.description.toLowerCase().includes(input.toLowerCase())
      );
      console.log("Found locations:", filtered);
      setPredictions(filtered);
      setIsLoading(false);
    }, 300); // Small delay to simulate API call
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    searchLocations(value);
  };

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    onChange(location);
    setSearchValue(location);
    setPredictions([]);
    setOpen(false);
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
          ) : !initialized ? (
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
                      onSelect={(selectedValue) => handleLocationSelect(selectedValue)}
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
