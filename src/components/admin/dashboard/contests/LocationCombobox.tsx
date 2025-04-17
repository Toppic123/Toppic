
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
import { supabase } from "@/integrations/supabase/client";

interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('id, name')
          .order('name');
        
        if (error) {
          console.error('Error fetching locations:', error);
          return;
        }
        
        setLocations(data || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on search input
  const filteredLocations = React.useMemo(() => {
    if (!searchValue.trim()) return locations;
    
    return locations.filter((location) => 
      location.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [locations, searchValue]);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
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
            <div className="py-6 text-center text-sm">Cargando ubicaciones...</div>
          ) : (
            <>
              <CommandEmpty>No se encontraron ubicaciones</CommandEmpty>
              <CommandGroup heading="Ubicaciones">
                {(filteredLocations || []).map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.name}
                    onSelect={(selectedValue) => {
                      onChange(selectedValue);
                      setSearchValue("");
                      setOpen(false);
                    }}
                  >
                    {location.name}
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
