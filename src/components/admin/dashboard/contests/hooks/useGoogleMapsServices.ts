
import { useState, useEffect, useRef } from "react";
import { GoogleMapsServices } from "../types/location.types";

export const useGoogleMapsServices = () => {
  const [services, setServices] = useState<GoogleMapsServices>({
    map: null,
    placesService: null,
    autocompleteService: null
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiError(null);
    const apiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // This should be moved to env
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setApiError("No se pudo cargar la API de Google Maps. Por favor, inténtelo de nuevo más tarde.");
    };
    
    script.onload = () => {
      try {
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 40.416775, lng: -3.70379 },
            zoom: 15,
          });
          
          setServices({
            map: mapInstance,
            placesService: new google.maps.places.PlacesService(mapRef.current),
            autocompleteService: new google.maps.places.AutocompleteService()
          });
          
          console.log("Google Maps services initialized successfully");
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setApiError("Error al inicializar los servicios de ubicación. Compruebe la conexión a internet.");
      }
    };
    
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      document.head.appendChild(script);
    } else {
      try {
        if (window.google && window.google.maps && window.google.maps.places && mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 40.416775, lng: -3.70379 },
            zoom: 15,
          });
          
          setServices({
            map: mapInstance,
            placesService: new google.maps.places.PlacesService(mapRef.current),
            autocompleteService: new google.maps.places.AutocompleteService()
          });
          
          console.log("Google Maps services initialized from existing script");
        }
      } catch (error) {
        console.error("Error initializing Google Maps from existing script:", error);
        setApiError("Error al inicializar los servicios de ubicación. La API podría no estar activada.");
      }
    }
    
    return () => {
      const addedScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`);
      if (addedScript && document.head.contains(addedScript)) {
        document.head.removeChild(addedScript);
      }
    };
  }, []);

  return { services, apiError, mapRef };
};
