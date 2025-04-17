
import * as React from "react";
import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LocationComboboxProps } from "./types/location.types";
import { useGoogleMapsServices } from "./hooks/useGoogleMapsServices";
import { useLocationSearch } from "./hooks/useLocationSearch";

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { services, apiError: servicesError, mapRef } = useGoogleMapsServices();
  const {
    predictions,
    isLoading,
    apiError: searchError,
    searchLocations,
    handleLocationSelect,
    handleManualInput
  } = useLocationSearch(services);
  
  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    searchLocations(value);
  };

  return (
    <div className="relative">
      {(servicesError || searchError) && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{servicesError || searchError}</AlertDescription>
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
                  {(servicesError || searchError) && (
                    <button 
                      onClick={() => handleManualInput(searchValue, onChange)}
                      className="text-primary hover:underline mt-2 text-xs"
                    >
                      Usar texto ingresado como ubicación
                    </button>
                  )}
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
                        onSelect={() => {
                          handleLocationSelect(prediction.place_id, prediction.description, onChange);
                          setSearchValue(prediction.description);
                          searchLocations("");
                        }}
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
