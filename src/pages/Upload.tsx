
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload as UploadIcon, MapPin, Image as ImageIcon } from "lucide-react";
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

// Concursos cercanos de ejemplo
const nearbyContests = [
  { id: "1", name: "Verano en Barcelona", distance: "0.5 km", type: "landscape" as const },
  { id: "2", name: "Arquitectura Urbana", distance: "1.2 km", type: "landscape" as const },
  { id: "3", name: "Vida en la Playa", distance: "3.4 km", type: "people" as const },
  { id: "4", name: "Eventos Públicos", distance: "2.1 km", type: "public_event" as const },
];

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
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redireccionar si no está logueado
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
          
          // Reducir si el ancho excede maxWidth
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
          }, 'image/jpeg', 0.8); // 0.8 de calidad para JPEG
        };
        img.onerror = () => reject(new Error('Error al cargar la imagen'));
      };
      reader.onerror = () => reject(new Error('Error en FileReader'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Comprobar tamaño del archivo (5MB máx)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "Por favor selecciona una imagen de menos de 5MB",
          variant: "destructive"
        });
        return;
      }
      
      try {
        // Guardar archivo original para envío posterior
        setOriginalFile(file);
        
        // Comprimir para la vista previa
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Aquí subirías tanto el originalFile (para almacenamiento) como los metadatos
    console.log("Foto enviada al concurso:", selectedContest);
    console.log("Archivo original a almacenar:", originalFile);
    console.log("Título:", title);
    console.log("Descripción:", description);
    console.log("Consentimientos:", consents);
    
    toast({
      title: "¡Foto enviada!",
      description: "Tu foto ha sido enviada al concurso"
    });
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
                        JPG, PNG o GIF. Máximo 5MB.
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
        <Card>
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
                <Label htmlFor="title">Título de la foto</Label>
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
            >
              Volver a Consentimientos
            </Button>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              <UploadIcon className="mr-2 h-4 w-4" />
              Subir foto
            </Button>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
};

export default Upload;
