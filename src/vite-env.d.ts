
/// <reference types="vite/client" />

// Google Maps API type definitions
declare namespace google {
  namespace maps {
    namespace places {
      interface PlacesServiceStatus {
        OK: string;
        ZERO_RESULTS: string;
        OVER_QUERY_LIMIT: string;
        REQUEST_DENIED: string;
        INVALID_REQUEST: string;
        UNKNOWN_ERROR: string;
      }

      const PlacesServiceStatus: PlacesServiceStatus;

      interface AutocompletePrediction {
        description: string;
        place_id: string;
        structured_formatting?: {
          main_text: string;
          secondary_text: string;
        };
        terms?: Array<{
          offset: number;
          value: string;
        }>;
        types?: string[];
      }

      interface AutocompleteServiceOptions {
        input: string;
        types?: string[];
        componentRestrictions?: {
          country: string | string[];
        };
      }

      interface AutocompleteService {
        getPlacePredictions(
          request: AutocompleteServiceOptions,
          callback: (
            results: AutocompletePrediction[] | null,
            status: keyof PlacesServiceStatus
          ) => void
        ): void;
      }
    }
  }
}

