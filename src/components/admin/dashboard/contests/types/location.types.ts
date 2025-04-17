
export interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export interface Prediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

export interface GoogleMapsServices {
  map: google.maps.Map | null;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
}
