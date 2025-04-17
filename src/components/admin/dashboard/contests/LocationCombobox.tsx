
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, AlertCircle, MapPin, X } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LocationComboboxProps } from "./types/location.types";
import { useGoogleMapsServices } from "./hooks/useGoogleMapsServices";
import { useLocationSearch } from "./hooks/useLocationSearch";

export const LocationCombobox = ({ value, onChange }: LocationComboboxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isManualInput, setIsManualInput] = useState(false);
  const { services, apiError: servicesError, isLoading: isApiLoading, mapRef } = useGoogleMapsServices();
  
  const {
    predictions,
    isLoading: isSearchLoading,
    apiError: searchError,
    searchLocations,
    handleLocationSelect,
    handleManualInput,
    clearResults
  } = useLocationSearch(services, isApiLoading);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = isApiLoading || isSearchLoading;
  
  // Actualizar el valor del campo de búsqueda cuando cambia el valor
  useEffect(() => {
    if (value && !searchValue) {
      setSearchValue(value);
    }
  }, [value]);

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsManualInput(false);
    
    if (value.trim() === "") {
      clearResults();
      return;
    }
    
    // Retrasar la búsqueda para evitar demasiadas solicitudes mientras el usuario escribe
    const timerId = setTimeout(() => {
      searchLocations(value);
    }, 300);
    
    return () => clearTimeout(timerId);
  };

  // Manejar la selección manual (cuando no hay resultados)
  const handleUseManualInput = () => {
    setIsManualInput(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Guardar la entrada manual
  const saveManualInput = () => {
    if (searchValue.trim()) {
      handleManualInput(searchValue, onChange);
      setIsManualInput(false);
    }
  };
  
  // Mensaje de error combinado
  const errorMessage = servicesError || searchError;
  
  return (
    <div className="relative space-y-2">
      {errorMessage && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              ref={inputRef}
              placeholder="Buscar ubicación..."
              value={searchValue}
              onValueChange={handleSearchChange}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {searchValue && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setSearchValue("");
                  clearResults();
                }}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Manual input mode */}
          {isManualInput && (
            <div className="p-4 text-center">
              <p className="text-sm mb-2">Ingrese manualmente la ubicación</p>
              <Button 
                onClick={saveManualInput}
                size="sm"
                className="w-full"
              >
                Guardar ubicación
              </Button>
            </div>
          )}
          
          {/* Search results or loading state */}
          {!isManualInput && (
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
                    <div className="mt-2 flex justify-center gap-2">
                      <Button 
                        onClick={handleUseManualInput}
                        variant="secondary" 
                        size="sm"
                      >
                        Usar texto ingresado
                      </Button>
                    </div>
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
                            clearResults();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
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
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          )}
        </Command>
      </div>
      
      {/* Mensaje informativo */}
      {!errorMessage && (
        <p className="text-xs text-muted-foreground mt-1">
          Escriba una dirección, lugar o ciudad para buscar ubicaciones
        </p>
      )}
      
      {/* Hidden div for Google Maps initialization */}
      <div ref={mapRef} className="hidden w-0 h-0"></div>
    </div>
  );
};

export default LocationCombobox;
