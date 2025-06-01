
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface MobileFiltersProps {
  onApply: (location: string, theme: string, status: string) => void;
  onClose: () => void;
  initialLocation: string;
  initialTheme: string;
  initialStatus: string;
}

const themes = [
  "Arquitectura",
  "Naturaleza", 
  "Retratos",
  "Paisajes",
  "Flores",
  "Playa",
  "Urbano",
  "Nocturna"
];

const MobileFilters = ({ onApply, onClose, initialLocation, initialTheme, initialStatus }: MobileFiltersProps) => {
  const [location, setLocation] = useState(initialLocation);
  const [theme, setTheme] = useState(initialTheme);
  const [status, setStatus] = useState(initialStatus);

  const handleApply = () => {
    onApply(location, theme === "all" ? "" : theme, status);
  };

  const handleClear = () => {
    setLocation("");
    setTheme("all");
    setStatus("all");
    onApply("", "", "all");
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Filtros</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-600 p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-4 space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
          </label>
          <Input
            type="text"
            placeholder="Ej: Barcelona, Madrid..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Theme Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tema
          </label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los temas</SelectItem>
              {themes.map((themeOption) => (
                <SelectItem key={themeOption} value={themeOption}>
                  {themeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="finished">Finalizados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleClear}
            className="flex-1"
          >
            Limpiar
          </Button>
          <Button 
            onClick={handleApply}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
