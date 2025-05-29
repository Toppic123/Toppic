
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, X, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MobileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contest, setContest] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock contest data
  const availableContests = [
    { id: "1", name: "Paisajes Urbanos Madrid" },
    { id: "2", name: "Retratos Callejeros" },
    { id: "3", name: "Naturaleza Salvaje" },
    { id: "4", name: "Arquitectura Moderna" }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title || !contest) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Mock upload - in real app this would upload to your backend/storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Foto subida exitosamente!",
        description: "Tu participación ha sido enviada al concurso.",
      });
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setContest("");
      setTags("");
      setLocation("");
      
      navigate("/contests");
    } catch (error) {
      toast({
        title: "Error al subir la foto",
        description: "Hubo un problema al procesar tu imagen.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Subir Fotografía
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selecciona tu foto</CardTitle>
            </CardHeader>
            <CardContent>
              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Toca para seleccionar una foto</p>
                    <p className="text-sm text-gray-500">
                      JPG, PNG hasta 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photo Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles de la foto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Dale un título a tu foto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contest">Concurso *</Label>
                <Select value={contest} onValueChange={setContest} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un concurso" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableContests.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Cuenta la historia detrás de tu foto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="¿Dónde fue tomada?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Etiquetas</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="tags"
                    type="text"
                    placeholder="paisaje, urbano, madrid..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Separa las etiquetas con comas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#4891AA] hover:bg-[#4891AA]/90 text-white py-6 text-lg font-medium"
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-5 w-5 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Participar en Concurso
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MobileUpload;
