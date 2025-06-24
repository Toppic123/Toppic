
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Upload } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";

interface MobileUploadProps {
  onNavigate: (screen: 'contests') => void;
}

const MobileUpload = ({ onNavigate }: MobileUploadProps) => {
  const { contests, isLoading } = useContestsData();
  const [selectedContest, setSelectedContest] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Filter contests based on user location and distance
  const nearbyContests = contests.filter(contest => {
    if (!userLocation || !contest.latitude || !contest.longitude) return false;
    
    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (contest.latitude - userLocation.lat) * Math.PI / 180;
    const dLng = (contest.longitude - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(contest.latitude * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= (contest.minimum_distance_km || 50); // Default 50km if no distance set
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedContest) {
      alert("Por favor selecciona una foto y un concurso");
      return;
    }
    // Simulate upload
    console.log("Uploading file:", selectedFile, "to contest:", selectedContest);
    onNavigate('contests');
  };

  if (isLoading) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-gray-500">Cargando concursos...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-white hover:bg-blue-700 mr-3 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Subir foto</h1>
        </div>
      </div>

      <div className="p-4 pb-8">
        {/* Contest Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concursos disponibles en tu área
          </label>
          {nearbyContests.length > 0 ? (
            <div className="space-y-3">
              {nearbyContests.map((contest) => (
                <div 
                  key={contest.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedContest === contest.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedContest(contest.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{contest.title}</h3>
                      <p className="text-sm text-gray-600">{contest.location}</p>
                      <p className="text-xs text-gray-500">
                        Termina el {new Date(contest.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={contest.isActive ? "bg-green-500" : "bg-gray-500"}>
                      {contest.isActive ? "Activo" : "Finalizado"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">No hay concursos disponibles en tu área</p>
              <p className="text-sm text-gray-500 mt-1">
                Verifica tu ubicación o consulta otros concursos
              </p>
            </div>
          )}
        </div>

        {selectedContest && (
          <>
            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona tu foto
              </label>
              {previewUrl ? (
                <div className="relative">
                  <img 
                    src={previewUrl}
                    alt="Foto seleccionada"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                    }}
                  >
                    Cambiar
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Toca para seleccionar una foto</p>
                  <p className="text-sm text-gray-500 mb-4">JPG, PNG o GIF. Máximo 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="photo-input"
                  />
                  <label
                    htmlFor="photo-input"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                  >
                    Seleccionar foto
                  </label>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la foto
                </label>
                <Input
                  type="text"
                  placeholder="Dale un título a tu foto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <Input
                  type="text"
                  placeholder="Cuéntanos sobre tu foto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Tu ubicación se añadirá automáticamente</span>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3"
                disabled={!selectedFile || !title.trim()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir foto al concurso
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileUpload;
