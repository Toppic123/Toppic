
/// <reference types="vite/client" />

// Google Maps API type definitions
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng): void;
      getCenter(): LatLng;
      setZoom(zoom: number): void;
      getZoom(): number;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      [key: string]: any;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

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

      class PlacesService {
        constructor(attrContainer: HTMLDivElement | Map);
        getDetails(
          request: {
            placeId: string;
            fields?: string[];
          },
          callback: (result: PlaceResult | null, status: string) => void
        ): void;
      }

      interface PlaceResult {
        name?: string;
        formatted_address?: string;
        geometry?: {
          location?: LatLng;
        };
        [key: string]: any;
      }

      class AutocompleteService {
        constructor();
        getPlacePredictions(
          request: AutocompleteServiceOptions,
          callback: (
            results: AutocompletePrediction[] | null,
            status: string
          ) => void
        ): void;
      }
    }
  }
}
