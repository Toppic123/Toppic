
/// <reference types="vite/client" />

// Leaflet type definitions
declare module 'leaflet' {
  interface Icon {
    Default: {
      prototype: any;
      mergeOptions(options: any): void;
    };
  }
}
