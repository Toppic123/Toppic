
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload as UploadIcon, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import ConsentForms from "@/components/ConsentForms";
import { useContestsData } from "@/hooks/useContestsData";
import { supabase } from "@/integrations/supabase/client";

interface ConsentData {
  photographerConsent: boolean;
  imageRightsOwnership: boolean;
  peopleConsent: boolean;
  brandPromotionConsent: boolean;
  commercialUseConsent: boolean;
  gdprCompliance: boolean;
  minorConsent?: boolean;
}

const Upload = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedContest, setSelectedContest] = useState<string>(contestId || "");
  const [currentStep, setCurrentStep] = useState<"upload" | "consent" | "details">("upload");
  const [consents, setConsents] = useState<ConsentData | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { contests: allContests } = useContestsData();
  
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Upload page - User location obtained:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Set a default location (Barcelona) for testing
          setUserLocation({
            lat: 41.3851,
            lng: 2.1734
          });
        }
      );
    } else {
      // Default to Barcelona if geolocation is not available
      setUserLocation({
        lat: 41.3851,
        lng: 2.1734
      });
    }
  }, []);
  
  // Calculate distance between two points using the same formula as Map.tsx
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Filter contests based on user location - FIXED to use real coordinates from database
  const nearbyContests = allContests.filter(contest => {
    // Only show active contests
    if (contest.status !== 'active') return false;
    
    // If no location data, show all active contests
    if (!userLocation) return true;
    
    // Use the REAL coordinates from the contest data, not fake coordinates
    const contestCoords = contest.coordinates;
    if (!contestCoords) {
      console.log(`Contest ${contest.title}: No coordinates available`);
      return true; // Show contest if no coordinates available
    }
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      contestCoords.lat,
      contestCoords.lng
    );
    
    // Much more permissive distance - allow up to 100km or the contest's minimum distance, whichever is greater
    const maxDistance = Math.max(contest.minimum_distance_km || 1, 100);
    
    console.log(`Upload page - Contest ${contest.title}:`, {
      contestCoords: contestCoords,
      userLocation: userLocation,
      distance: distance.toFixed(2) + 'km',
      maxDistance: maxDistance + 'km',
      isWithinRange: distance <= maxDistance
    });
    
    return distance <= maxDistance;
  }).map(contest => ({
    id: contest.id,
    name: contest.title,
    distance: userLocation && contest.coordinates ? 
      `${calculateDistance(userLocation.lat, userLocation.lng, contest.coordinates.lat, contest.coordinates.lng).toFixed(1)} km` : 
      "Calculando...",
    type: contest.category as "landscape" | "people" | "public_event"
  }));
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Autenticación requerida",
        description: "Por favor inicia sesión para subir fotos",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const compressImage = async (file: File, maxWidth = 1200): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Error en la conversión de Canvas a Blob'));
          }, 'image/jpeg', 0.8);
        };
        img.onerror = () => reject(new Error('Error al cargar la imagen'));
      };
      reader.onerror = () => reject(new Error('Error en FileReader'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 10 * 1024 * 1024) { // Increased to 10MB since we're storing originals
        toast({
          title: "Archivo demasiado grande",
          description: "Por favor selecciona una imagen de menos de 10MB",
          variant: "destructive"
        });
        return;
      }
      
      try {
        setOriginalFile(file);
        const compressedBlob = await compressImage(file);
        const compressedUrl = URL.createObjectURL(compressedBlob);
        setPreviewUrl(compressedUrl);
        
        toast({
          title: "Imagen cargada",
          description: "Vista previa generada con calidad optimizada"
        });
      } catch (error) {
        console.error("Error al procesar la imagen:", error);
        toast({
          title: "Error al procesar la imagen",
          description: "Por favor intenta con otra imagen",
          variant: "destructive"
        });
      }
    }
  };

  const handleContestSelection = (contestId: string) => {
    setSelectedContest(contestId);
    if (previewUrl) {
      setCurrentStep("consent");
    }
  };

  const handleConsentComplete = (consentData: ConsentData) => {
    setConsents(consentData);
    setCurrentStep("details");
    toast({
      title: "Consentimientos completados",
      description: "Ahora puedes completar los detalles de tu foto"
    });
  };

  const uploadToStorage = async (file: File, contestId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${contestId}/${fileName}`;

    console.log('Uploading file to storage:', { filePath, fileSize: file.size, fileType: file.type });

    const { data, error } = await supabase.storage
      .from('contest-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    console.log('File uploaded successfully:', data);

    const { data: { publicUrl } } = supabase.storage
      .from('contest-photos')
      .getPublicUrl(filePath);

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  };

  const savePhotoToDatabase = async (imageUrl: string, contestId: string, title: string, description: string) => {
    console.log('Saving photo to database:', { imageUrl, contestId, title, description });

    const { data, error } = await supabase
      .from('contest_photos')
      .insert({
        contest_id: contestId,
        image_url: imageUrl,
        photographer_name: user?.email || 'Anónimo',
        description: description || title,
        votes: 0,
        is_featured: false,
        status: 'approved' // Auto-approve for now
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    console.log('Photo saved to database:', data);
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalFile) {
      toast({
        title: "Imagen requerida",
        description: "Por favor selecciona una imagen para participar",
        variant: "destructive"
      });
      return;
    }

    if (!selectedContest) {
      toast({
        title: "Concurso requerido",
        description: "Por favor selecciona un concurso en el que participar",
        variant: "destructive"
      });
      return;
    }

    if (!consents) {
      toast({
        title: "Consentimientos requeridos",
        description: "Por favor completa los formularios de consentimiento",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Título requerido",
        description: "Por favor añade un título a tu foto",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      console.log("Starting photo upload process...");
      
      // Upload the original file to Supabase Storage
      const imageUrl = await uploadToStorage(originalFile, selectedContest);
      console.log("Image uploaded to storage:", imageUrl);
      
      // Save photo data to database
      const photoData = await savePhotoToDatabase(imageUrl, selectedContest, title, description);
      console.log("Photo data saved to database:", photoData);
      
      toast({
        title: "¡Foto enviada exitosamente!",
        description: "Tu foto ha sido enviada al concurso y ya está visible"
      });
      
      // Navigate back to contests page
      navigate('/contests');
      
    } catch (error: any) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Error al subir la foto",
        description: error.message || "Ha ocurrido un error inesperado",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getSelectedContestType = () => {
    const contest = nearbyContests.find(c => c.id === selectedContest);
    return contest?.type || "landscape";
  };

  const canProceedToConsent = previewUrl && selectedContest;
  const canProceedToDetails = consents !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-4xl mx-auto py-12 px-4"
    >
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === "upload" ? "bg-blue-600 text-white" : 
            canProceedToConsent ? "bg-green-600 text-white" : "bg-gray-300"
          }`}>
            1
          </div>
          <div className="w-16 h-1 bg-gray-300">
            <div className={`h-full transition-all duration-300 ${
              canProceedToConsent ? "bg-green-600 w-full" : "bg-gray-300 w-0"
            }`} />
          </div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === "consent" ? "bg-blue-600 text-white" : 
            canProceedToDetails ? "bg-green-600 text-white" : "bg-gray-300"
          }`}>
            2
          </div>
          <div className="w-16 h-1 bg-gray-300">
            <div className={`h-full transition-all duration-300 ${
              canProceedToDetails ? "bg-green-600 w-full" : "bg-gray-300 w-0"
            }`} />
          </div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === "details" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Step 1: Upload & Contest Selection */}
      {currentStep === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Subir Foto</CardTitle>
            <CardDescription>
              Selecciona tu fotografía y el concurso en el que quieres participar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contest">Selecciona un concurso cercano</Label>
                {nearbyContests.length > 0 ? (
                  <Select 
                    value={selectedContest} 
                    onValueChange={handleContestSelection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un concurso" />
                    </SelectTrigger>
                    <SelectContent>
                      {nearbyContests.map(contest => (
                        <SelectItem key={contest.id} value={contest.id}>
                          {contest.name} ({contest.distance})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
                    <p>No hay concursos activos disponibles en tu área.</p>
                    <p className="text-sm mt-1">Los concursos deben estar activos para poder participar.</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Selecciona una foto</Label>
                {previewUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                    <img src={previewUrl} alt="Vista previa" className="w-full h-auto" />
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-2 right-2"
                      onClick={() => {
                        setPreviewUrl(null);
                        setOriginalFile(null);
                      }}
                    >
                      Cambiar
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                      <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                        <span>Arrastra tu foto aquí o</span>
                        <label htmlFor="photo" className="relative cursor-pointer text-blue-600 hover:underline">
                          <span>selecciona un archivo</span>
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        JPG, PNG o GIF. Máximo 10MB.
                      </span>
                    </div>
                  </div>
                )}
                {previewUrl && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Nota: Tu foto se muestra en calidad optimizada para web, pero se guardará en su calidad original.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => setCurrentStep("consent")} 
              className="w-full"
              disabled={!canProceedToConsent}
            >
              Continuar a Consentimientos
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Consent Forms */}
      {currentStep === "consent" && (
        <ConsentForms 
          contestType={getSelectedContestType()}
          onConsentGiven={handleConsentComplete}
        />
      )}

      {/* Step 3: Details */}
      {currentStep === "details" && (
        <Card className="max-h-screen overflow-y-auto">
          <CardHeader>
            <CardTitle>Detalles de la Foto</CardTitle>
            <CardDescription>
              Completa la información de tu fotografía
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Preview */}
              {previewUrl && (
                <div className="mb-4">
                  <img src={previewUrl} alt="Vista previa" className="w-full max-w-md mx-auto rounded-lg" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Título de la foto *</Label>
                <Input 
                  id="title" 
                  placeholder="Añade un título descriptivo" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Input 
                  id="description" 
                  placeholder="Cuéntanos sobre tu foto..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Tu ubicación se añadirá automáticamente</span>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep("consent")}
              className="w-full"
              disabled={isUploading}
            >
              Volver a Consentimientos
            </Button>
            <Button 
              type="submit" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isUploading || !title.trim()}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              {isUploading ? "Subiendo..." : "Subir foto"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
};

export default Upload;
