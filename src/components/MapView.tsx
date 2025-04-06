
import { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MapViewProps {
  markers?: Marker[];
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  onMapLoaded?: (map: any) => void;
  height?: string;
}

const MapView = ({
  markers = [],
  center = [-3.7038, 40.4168], // Default to Madrid, Spain
  zoom = 10,
  onMapLoaded,
  height = '70vh',
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const { toast } = useToast();

  const initializeMap = async () => {
    if (!mapContainer.current) return;
    if (!mapApiKey) return;
    
    try {
      // Use Google Maps API
      const mapScript = document.createElement('script');
      mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap`;
      mapScript.async = true;
      mapScript.defer = true;
      
      window.initMap = () => {
        const map = new window.google.maps.Map(mapContainer.current!, {
          center: { lat: center[1], lng: center[0] },
          zoom: zoom,
        });
        
        // Add user location marker if available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              
              // Add user marker
              new window.google.maps.Marker({
                position: userLocation,
                map: map,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2,
                  scale: 8,
                },
                title: 'Your Location',
              });
              
              // Set center to user location
              map.setCenter(userLocation);
              
              // Add all markers
              const bounds = new window.google.maps.LatLngBounds(userLocation);
              markers.forEach((marker) => {
                const position = { lat: marker.lat, lng: marker.lng };
                
                new window.google.maps.Marker({
                  position,
                  map,
                  title: marker.title,
                });
                
                bounds.extend(position);
              });
              
              // Fit map to bounds
              if (markers.length > 0) {
                map.fitBounds(bounds);
              }
              
              setLoading(false);
              if (onMapLoaded) onMapLoaded(map);
            },
            (error) => {
              console.error('Error getting location:', error);
              
              // Still add markers even if user location is not available
              const bounds = new window.google.maps.LatLngBounds();
              markers.forEach((marker) => {
                const position = { lat: marker.lat, lng: marker.lng };
                
                new window.google.maps.Marker({
                  position,
                  map,
                  title: marker.title,
                });
                
                bounds.extend(position);
              });
              
              // Fit map to bounds
              if (markers.length > 0) {
                map.fitBounds(bounds);
              }
              
              setLoading(false);
              if (onMapLoaded) onMapLoaded(map);
            }
          );
        } else {
          // No geolocation support
          toast({
            title: "Geolocation not supported",
            description: "Your browser doesn't support geolocation.",
            variant: "destructive"
          });
          
          // Still add markers
          const bounds = new window.google.maps.LatLngBounds();
          markers.forEach((marker) => {
            const position = { lat: marker.lat, lng: marker.lng };
            
            new window.google.maps.Marker({
              position,
              map,
              title: marker.title,
            });
            
            bounds.extend(position);
          });
          
          // Fit map to bounds
          if (markers.length > 0) {
            map.fitBounds(bounds);
          }
          
          setLoading(false);
          if (onMapLoaded) onMapLoaded(map);
        }
      };
      
      document.head.appendChild(mapScript);
      
      return () => {
        document.head.removeChild(mapScript);
        delete window.initMap;
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Error loading map",
        description: "Please check your API key and try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Try to initialize with API key
    if (mapApiKey) {
      initializeMap();
    }
  }, [mapContainer.current, mapApiKey, markers]);

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      {!mapApiKey ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-6">
          <MapPin className="h-12 w-12 text-primary/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">Mapa no disponible</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Para ver el mapa, ingresa tu clave de API de Google Maps:
          </p>
          <div className="w-full max-w-sm">
            <input
              type="text"
              placeholder="Ingresa tu clave de API de Google Maps"
              className="w-full p-2 border rounded mb-2"
              value={mapApiKey}
              onChange={(e) => setMapApiKey(e.target.value)}
            />
            <Button 
              onClick={() => initializeMap()}
              className="w-full"
              disabled={!mapApiKey}
            >
              Cargar Mapa
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div
            ref={mapContainer}
            style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
            className="map-container"
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 rounded-md">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p>Cargando mapa...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Add this to window types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default MapView;
