
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
    main_text_matched_substrings?: Array<{ offset: number; length: number }>;
  };
}

export interface GoogleMapsServices {
  map: google.maps.Map | null;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
  status: typeof google.maps.places.PlacesServiceStatus;
}

export interface GeolocationResult {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LocationDetails {
  address: string;
  placeId: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
