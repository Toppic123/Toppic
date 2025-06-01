
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationSuggestion {
  id: string;
  name: string;
  country?: string;
}

interface LocationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const mockLocations: LocationSuggestion[] = [
  { id: "1", name: "Barcelona", country: "España" },
  { id: "2", name: "Madrid", country: "España" },
  { id: "3", name: "Valencia", country: "España" },
  { id: "4", name: "Sevilla", country: "España" },
  { id: "5", name: "Bilbao", country: "España" },
  { id: "6", name: "Málaga", country: "España" },
  { id: "7", name: "Zaragoza", country: "España" },
  { id: "8", name: "Murcia", country: "España" },
  { id: "9", name: "Palma", country: "España" },
  { id: "10", name: "Las Palmas", country: "España" },
  { id: "11", name: "Vitoria", country: "España" },
  { id: "12", name: "Córdoba", country: "España" },
  { id: "13", name: "Valladolid", country: "España" },
  { id: "14", name: "Vigo", country: "España" },
  { id: "15", name: "Gijón", country: "España" },
];

const LocationSearchInput = ({ value, onChange, placeholder = "Buscar ubicación..." }: LocationSearchInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<LocationSuggestion[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockLocations.filter(location =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const handleSelectLocation = (location: LocationSuggestion) => {
    onChange(location.name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length > 0 && setShowSuggestions(true)}
        className="w-full"
      />
      
      {showSuggestions && filteredLocations.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelectLocation(location)}
            >
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{location.name}</span>
              {location.country && (
                <span className="text-xs text-gray-500 ml-auto">{location.country}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
