
/// <reference types="vite/client" />
/// <reference types="google.maps" />

// Leaflet type definitions
declare module 'leaflet' {
  interface Icon {
    Default: {
      prototype: any;
      mergeOptions(options: any): void;
    };
  }
}

// Extend the Window interface to include Google Maps callback
declare global {
  interface Window {
    initGoogleMaps: () => void;
    google: typeof google;
  }
}
