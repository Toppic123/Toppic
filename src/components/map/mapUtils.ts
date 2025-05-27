
import { Contest } from './contestData';

// Import leaflet dynamically to avoid SSR issues
let L: any;

export const loadLeaflet = async () => {
  try {
    // Dynamically import leaflet
    const leafletModule = await import('leaflet');
    L = leafletModule.default;
    
    // Fix for default markers in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    
    return L;
  } catch (error) {
    console.error("Error loading Leaflet:", error);
    throw error;
  }
};

export const initializeMap = (containerRef: HTMLDivElement) => {
  if (!L) throw new Error("Leaflet not loaded");

  // Initialize map centered on Spain
  const map = L.map(containerRef).setView([40.4168, -3.7038], 6);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  return map;
};

export const createContestMarkers = (
  contests: Contest[], 
  map: any, 
  onContestSelect: (contest: Contest) => void
) => {
  if (!L) return [];

  const markers: any[] = [];

  contests.forEach(contest => {
    const marker = L.marker([contest.coords.lat, contest.coords.lng])
      .addTo(map);

    const popupContent = `
      <div class="p-2">
        <h3 class="font-medium text-sm">${contest.title}</h3>
        <p class="text-xs text-gray-600 flex items-center mt-1">
          <span class="mr-1">📍</span> ${contest.location}
        </p>
        <p class="text-xs text-gray-600 mt-1">${contest.photosCount} fotos</p>
        <div class="flex items-center gap-2 mt-2">
          ${contest.isPrivate ? '<span class="bg-amber-100 text-amber-800 text-xs px-1 py-0.5 rounded flex items-center gap-1"><span>🔒</span> Privado</span>' : ''}
          ${contest.isActive ? '<span class="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">Activo</span>' : '<span class="bg-gray-100 text-gray-800 text-xs px-1 py-0.5 rounded">Finalizado</span>'}
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    
    marker.on('click', () => {
      onContestSelect(contest);
    });

    markers.push(marker);
  });

  return markers;
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c;
  return d;
};

export const addUserLocationMarker = (map: any, lat: number, lng: number) => {
  if (!L) return;

  // Add user location marker
  const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: '<div style="background: #4891AA; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return L.marker([lat, lng], { icon: userIcon })
    .addTo(map)
    .bindPopup("Tu ubicación")
    .openPopup();
};
