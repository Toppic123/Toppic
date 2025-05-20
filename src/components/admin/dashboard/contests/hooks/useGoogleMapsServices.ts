
import { useState, useEffect, useRef } from "react";
import { GoogleMapsServices } from "../types/location.types";

export const useGoogleMapsServices = () => {
  const [services, setServices] = useState<GoogleMapsServices>({
    map: null,
    placesService: null,
    autocompleteService: null,
    status: null // Inicializamos como null hasta que la API se cargue
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiError(null);
    setIsLoading(true);
    
    // Esta API key debería moverse a una variable de entorno
    // o configuración central para facilitar su cambio
    const apiKey = "AIzaSyBs3FCn7xQBxTUFMSNVc6SH1tSwbIXMT74"; 
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    
    // Función global para callback de Google Maps
    window.initGoogleMaps = () => {
      try {
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 40.416775, lng: -3.70379 }, // Centro en España
            zoom: 15,
          });
          
          const placesService = new google.maps.places.PlacesService(mapRef.current);
          const autocompleteService = new google.maps.places.AutocompleteService();
          
          setServices({
            map: mapInstance,
            placesService: placesService,
            autocompleteService: autocompleteService,
            status: google.maps.places.PlacesServiceStatus
          });
          
          console.log("Google Maps services initialized successfully");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setApiError("Error al inicializar los servicios de ubicación. Compruebe la conexión a internet.");
        setIsLoading(false);
      }
    };
    
    // Manejador de errores para la carga del script
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setApiError("No se pudo cargar la API de Google Maps. Por favor, inténtelo de nuevo más tarde.");
      setIsLoading(false);
    };
    
    // Evitar cargar el script múltiples veces
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      document.head.appendChild(script);
    } else if (window.google && window.google.maps && window.google.maps.places) {
      // Si el script ya está cargado, inicializar directamente
      window.initGoogleMaps();
    }
    
    return () => {
      // Limpiar el callback global
      delete window.initGoogleMaps;
      
      // Eliminar el script sólo si lo añadimos nosotros
      const addedScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps"]`);
      if (addedScript && document.head.contains(addedScript)) {
        document.head.removeChild(addedScript);
      }
    };
  }, []);

  return { services, apiError, isLoading, mapRef };
};

// Declaración global para TypeScript
declare global {
  interface Window {
    initGoogleMaps: () => void;
  }
}
