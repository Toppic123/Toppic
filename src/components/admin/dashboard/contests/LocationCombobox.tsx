
import * as React from "react";
import { useState, useEffect } from "react";
import { Search, Loader2, Globe } from "lucide-react";
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

// Define interfaces for our component and location types
interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

interface Location {
  description: string;
  place_id: string;
}

// Extended list of locations worldwide
const worldwideLocations: Location[] = [
  // España
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
  
  // Europa
  { description: "Paris, France", place_id: "paris_1" },
  { description: "London, United Kingdom", place_id: "london_1" },
  { description: "Berlin, Germany", place_id: "berlin_1" },
  { description: "Rome, Italy", place_id: "rome_1" },
  { description: "Amsterdam, Netherlands", place_id: "amsterdam_1" },
  { description: "Brussels, Belgium", place_id: "brussels_1" },
  { description: "Lisbon, Portugal", place_id: "lisbon_1" },
  { description: "Vienna, Austria", place_id: "vienna_1" },
  { description: "Athens, Greece", place_id: "athens_1" },
  { description: "Stockholm, Sweden", place_id: "stockholm_1" },
  { description: "Copenhagen, Denmark", place_id: "copenhagen_1" },
  { description: "Dublin, Ireland", place_id: "dublin_1" },
  { description: "Prague, Czech Republic", place_id: "prague_1" },
  { description: "Warsaw, Poland", place_id: "warsaw_1" },
  { description: "Helsinki, Finland", place_id: "helsinki_1" },
  { description: "Budapest, Hungary", place_id: "budapest_1" },
  
  // América
  { description: "New York, United States", place_id: "newyork_1" },
  { description: "Los Angeles, United States", place_id: "losangeles_1" },
  { description: "Chicago, United States", place_id: "chicago_1" },
  { description: "Toronto, Canada", place_id: "toronto_1" },
  { description: "Mexico City, Mexico", place_id: "mexicocity_1" },
  { description: "Rio de Janeiro, Brazil", place_id: "rio_1" },
  { description: "Buenos Aires, Argentina", place_id: "buenosaires_1" },
  { description: "Lima, Peru", place_id: "lima_1" },
  { description: "Santiago, Chile", place_id: "santiago_1" },
  { description: "Bogotá, Colombia", place_id: "bogota_1" },
  { description: "Caracas, Venezuela", place_id: "caracas_1" },
  
  // Asia y Oceanía
  { description: "Tokyo, Japan", place_id: "tokyo_1" },
  { description: "Beijing, China", place_id: "beijing_1" },
  { description: "Seoul, South Korea", place_id: "seoul_1" },
  { description: "Singapore", place_id: "singapore_1" },
  { description: "Bangkok, Thailand", place_id: "bangkok_1" },
  { description: "Mumbai, India", place_id: "mumbai_1" },
  { description: "Dubai, United Arab Emirates", place_id: "dubai_1" },
  { description: "Sydney, Australia", place_id: "sydney_1" },
  { description: "Melbourne, Australia", place_id: "melbourne_1" },
  { description: "Auckland, New Zealand", place_id: "auckland_1" },
  
  // África
  { description: "Cairo, Egypt", place_id: "cairo_1" },
  { description: "Cape Town, South Africa", place_id: "capetown_1" },
  { description: "Nairobi, Kenya", place_id: "nairobi_1" },
  { description: "Casablanca, Morocco", place_id: "casablanca_1" },
  { description: "Lagos, Nigeria", place_id: "lagos_1" }
];

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

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
    
    // Filter the worldwide locations based on input
    setTimeout(() => {
      const filtered = worldwideLocations.filter(
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
  };

  // Handle custom location input
  const handleCustomLocationSubmit = () => {
    if (customLocation.trim()) {
      handleLocationSelect(customLocation);
      setShowCustomInput(false);
      setCustomLocation("");
      
      toast({
        title: "Ubicación personalizada añadida",
        description: `Has añadido "${customLocation}" como ubicación.`,
      });
    }
  };

  return (
    <div className="relative">
      {!showCustomInput ? (
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setShowCustomInput(true)}
                    >
                      Añadir ubicación personalizada
                    </Button>
                  </div>
                </CommandEmpty>
              ) : (
                <>
                  {searchValue.trim() === "" ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Escribe para buscar ubicaciones
                    </div>
                  ) : (
                    <>
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
                      <div className="p-2 text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowCustomInput(true)}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Añadir ubicación personalizada
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Ingresa una ubicación personalizada..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleCustomLocationSubmit} type="button">
              Añadir
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCustomInput(false)} 
              type="button"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCombobox;
