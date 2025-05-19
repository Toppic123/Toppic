
import { useEffect, useRef, useState } from "react";
import { Check, Loader2, MapPin, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useGoogleMapsServices } from "./hooks/useGoogleMapsServices";
import { useLocationSearch } from "./hooks/useLocationSearch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const LocationCombobox = ({ value, onChange, placeholder = "Buscar ubicación..." }: LocationComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { services, isLoading: isApiLoading } = useGoogleMapsServices();
  const { predictions, isLoading, apiError, searchLocations, getDetailsFromPlaceId } = useLocationSearch(services, isApiLoading);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (input) {
      timerRef.current = setTimeout(() => {
        searchLocations(input);
      }, 300);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [input, searchLocations]);

  const handleSelect = async (placeId: string, description: string) => {
    if (placeId.includes('_local')) {
      // Si es un ID local, solo usamos la descripción
      onChange(description);
      setOpen(false);
      return;
    }
    
    // Para ID de Google, obtenemos los detalles completos
    const details = await getDetailsFromPlaceId(placeId);
    if (details) {
      onChange(details.formattedAddress);
    } else {
      // Fallback a la descripción si no se pueden obtener detalles
      onChange(description);
    }
    
    setOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background"
          >
            <div className="flex items-center text-left overflow-hidden">
              {value ? (
                <>
                  <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">{value}</span>
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">{placeholder}</span>
                </>
              )}
            </div>
            <div className={cn("ml-2", isLoading && "animate-spin")}>
              {isLoading ? <Loader2 className="h-4 w-4" /> : null}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
          <Command>
            <CommandInput
              placeholder="Buscar ciudad en España..."
              value={input}
              onValueChange={setInput}
              className="h-10"
            />
            <CommandList>
              <CommandEmpty>
                {apiError ? (
                  <div className="py-6 text-center text-sm">
                    <div className="rounded-full bg-muted p-2 mx-auto w-fit mb-2">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <p>{apiError}</p>
                    <p className="text-xs text-muted-foreground mt-1">Intenta escribir el nombre de una ciudad española</p>
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm">
                    <div className="rounded-full bg-muted p-2 mx-auto w-fit mb-2">
                      <Search className="h-4 w-4" />
                    </div>
                    <p>No se encontraron ubicaciones</p>
                    <p className="text-xs text-muted-foreground mt-1">Intenta con otro término de búsqueda</p>
                  </div>
                )}
              </CommandEmpty>
              {predictions.length > 0 && (
                <CommandGroup heading="Ubicaciones">
                  {predictions.map((prediction) => (
                    <CommandItem
                      key={prediction.place_id}
                      value={prediction.description}
                      onSelect={() => handleSelect(prediction.place_id, prediction.description)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p>{prediction.structured_formatting?.main_text || prediction.description.split(',')[0]}</p>
                          <p className="text-xs text-muted-foreground">
                            {prediction.structured_formatting?.secondary_text || "España"}
                          </p>
                        </div>
                      </div>
                      {value === prediction.description && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationCombobox;
