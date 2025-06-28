
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { useContestsData } from "@/hooks/useContestsData";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ContestPhotoManager = () => {
  const [selectedContestId, setSelectedContestId] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [photographerName, setPhotographerName] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const { contests } = useContestsData();
  const { photos, isLoading: photosLoading, uploadPhoto, fetchContestPhotos } = useContestPhotos(selectedContestId);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor selecciona un archivo de imagen válido",
          variant: "destructive"
        });
        return;
      }
      
      // Validar tamaño (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "El archivo es demasiado grande. Máximo 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setUploadFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !selectedContestId || !photographerName.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadPhoto(uploadFile, photographerName, photoDescription, true); // Auto-approve from admin
      if (result) {
        toast({
          title: "Éxito",
          description: "Foto añadida al concurso exitosamente",
        });
        
        // Limpiar formulario
        setUploadFile(null);
        setPhotographerName("");
        setPhotoDescription("");
        
        // Reset file input
        const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContestChange = (contestId: string) => {
    setSelectedContestId(contestId);
    // Limpiar formulario al cambiar de concurso
    setUploadFile(null);
    setPhotographerName("");
    setPhotoDescription("");
  };

  const selectedContest = contests.find(c => c.id === selectedContestId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Gestor de Fotos de Concursos
          </CardTitle>
          <CardDescription>
            Añade fotos a los concursos para que no estén vacíos y los participantes puedan ver ejemplos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contest-select">Seleccionar Concurso</Label>
            <Select value={selectedContestId} onValueChange={handleContestChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un concurso..." />
              </SelectTrigger>
              <SelectContent>
                {contests.map((contest) => (
                  <SelectItem key={contest.id} value={contest.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{contest.title}</span>
                      <Badge variant={contest.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                        {contest.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedContest && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{selectedContest.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{selectedContest.description}</p>
              <div className="text-sm">
                <span className="font-medium">Organizador:</span> {selectedContest.organizer} | 
                <span className="font-medium ml-2">Ubicación:</span> {selectedContest.location || 'No especificada'} |
                <span className="font-medium ml-2">Fotos actuales:</span> {photos.length}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedContestId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Añadir Nueva Foto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-upload">Subir Foto</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Seleccionar
                </Button>
              </div>
              {uploadFile && (
                <div className="text-sm text-muted-foreground">
                  Archivo seleccionado: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="photographer-name">Nombre del Fotógrafo *</Label>
              <Input
                id="photographer-name"
                value={photographerName}
                onChange={(e) => setPhotographerName(e.target.value)}
                placeholder="Nombre del autor de la foto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo-description">Descripción (Opcional)</Label>
              <Textarea
                id="photo-description"
                value={photoDescription}
                onChange={(e) => setPhotoDescription(e.target.value)}
                placeholder="Descripción de la foto, técnica utilizada, etc."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleUpload}
              disabled={!uploadFile || !photographerName.trim() || isUploading}
              className="w-full"
            >
              {isUploading ? 'Subiendo...' : 'Añadir Foto al Concurso'}
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedContestId && (
        <Card>
          <CardHeader>
            <CardTitle>Fotos del Concurso</CardTitle>
            <CardDescription>
              {photosLoading ? 'Cargando fotos...' : `${photos.length} foto(s) en este concurso`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {photosLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Cargando fotos...</p>
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-8">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No hay fotos en este concurso</p>
                <p className="text-sm text-muted-foreground">Añade algunas fotos para que los participantes puedan ver ejemplos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={photo.description || 'Foto del concurso'}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-medium text-sm">{photo.photographer_name}</p>
                      {photo.description && (
                        <p className="text-xs text-muted-foreground mt-1">{photo.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={photo.status === 'approved' ? 'default' : 'secondary'}>
                          {photo.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {photo.votes} votos
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContestPhotoManager;
