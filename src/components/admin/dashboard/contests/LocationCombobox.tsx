
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // Initialize with empty arrays to prevent null issues
  const [locations, setLocations] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState<{ name: string }[]>([]);

  // Fetch all locations once on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('locations')
          .select('name')
          .order('name');

        if (error) {
          console.error("Error fetching locations:", error);
          setLocations([]);
          setFilteredLocations([]);
          return;
        }

        // Ensure we always have valid arrays
        const locationsData = Array.isArray(data) ? data : [];
        setLocations(locationsData);
        setFilteredLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
        setFilteredLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on search input
  const handleSearchChange = (input: string) => {
    setSearchValue(input);
    
    if (!input.trim()) {
      setFilteredLocations(locations);
      return;
    }
    
    const filtered = locations.filter(location => 
      location.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          onClick={() => setOpen(!open)}
        >
          {value ? value : "Seleccionar ubicación..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {/* Wrap Command component with an error boundary div to catch any issues */}
        <div className="w-full">
          <Command>
            <CommandInput 
              placeholder="Buscar ubicación..." 
              value={searchValue}
              onValueChange={handleSearchChange}
              className="h-9" 
            />
            <CommandEmpty>
              {isLoading ? "Cargando ubicaciones..." : "No se encontraron ubicaciones"}
            </CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {/* Ensure we're only mapping over a valid array */}
              {(filteredLocations || []).map((location) => (
                <CommandItem
                  key={location.name}
                  value={location.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                    setSearchValue("");
                  }}
                >
                  {location.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === location.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationCombobox;
