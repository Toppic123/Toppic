
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload as UploadIcon, MapPin } from "lucide-react";

const Upload = () => {
  const { contestId } = useParams<{ contestId: string }>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File selected:", e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Photo submitted to contest:", contestId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-md mx-auto py-12 px-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Subir foto</CardTitle>
          <CardDescription>
            Participa en el concurso compartiendo tu mejor fotografía
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Selecciona una foto</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título de la foto</Label>
              <Input id="title" placeholder="Añade un título descriptivo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Input id="description" placeholder="Cuéntanos sobre tu foto..." />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Tu ubicación será añadida automáticamente</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <UploadIcon className="mr-2 h-4 w-4" />
            Subir foto
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Upload;
