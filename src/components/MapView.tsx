
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvY2FsdG9rZW4ifQ.123456789abcdef';

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
  onMapLoaded?: (map: mapboxgl.Map) => void;
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
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [loading, setLoading] = useState(true);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    console.log('Initializing map...');
    
    // Try to get user location first
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Got user location:', position.coords);
        initializeMap([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.log('Error getting user location:', error);
        initializeMap(center);
      }
    );
    
    function initializeMap(initialCenter: [number, number]) {
      if (map.current) return;
      
      console.log('Creating map at:', initialCenter);
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialCenter,
        zoom: zoom,
        failIfMajorPerformanceCaveat: false,
      });
  
      mapInstance.on('load', () => {
        console.log('Map loaded successfully');
        setLoading(false);
        map.current = mapInstance;
        
        // Set user location marker
        new mapboxgl.Marker({
          color: '#FF0000',
        })
          .setLngLat(initialCenter)
          .addTo(mapInstance);
          
        // Add all other markers
        addMarkers();
        
        if (onMapLoaded) onMapLoaded(mapInstance);
      });
      
      mapInstance.on('error', (e) => {
        console.error('Mapbox error:', e);
      });
    }
    
    return () => {
      if (map.current) {
        console.log('Removing map');
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, onMapLoaded]);

  // Update markers when they change
  useEffect(() => {
    if (!map.current) return;
    addMarkers();
  }, [markers]);

  const addMarkers = () => {
    if (!map.current) return;
    
    console.log('Adding markers:', markers);
    
    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Define bounds to fit all markers plus user location
    const bounds = new mapboxgl.LngLatBounds();
    
    // Add new markers
    markers.forEach(marker => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${marker.title}</h3>`);
      
      const mapMarker = new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      markersRef.current[marker.id] = mapMarker;
      bounds.extend([marker.lng, marker.lat]);
    });
    
    // Fit map to bounds if there are markers
    if (markers.length > 0) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
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
    </div>
  );
};

export default MapView;
