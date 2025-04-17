
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
  const [locations, setLocations] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          return;
        }

        // Asegurarse de que locations siempre es un array, incluso si data es null
        setLocations(data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // En caso de error, establecer locations como un array vacío
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Seleccionar ubicación..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar ubicación..." className="h-9" />
          <CommandEmpty>
            {isLoading ? "Cargando ubicaciones..." : "No se encontraron ubicaciones"}
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {/* Asegurarse de que locations es un array antes de mapearlo */}
            {Array.isArray(locations) && locations.map((location) => (
              <CommandItem
                key={location.name}
                value={location.name}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
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
      </PopoverContent>
    </Popover>
  );
};

export default LocationCombobox;
