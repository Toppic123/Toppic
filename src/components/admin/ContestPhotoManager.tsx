
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { useContestsData } from "@/hooks/useContestsData";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Plus, Trash2, Edit, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PhotoEditDialog from "@/components/admin/dashboard/photos/PhotoEditDialog";
import { ContestPhoto } from "@/hooks/useContestPhotos";
import { supabase } from "@/integrations/supabase/client";

const ContestPhotoManager = () => {
  const [selectedContestId, setSelectedContestId] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [photographerName, setPhotographerName] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<ContestPhoto | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
  
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
      const result = await uploadPhoto(uploadFile, photographerName, photoDescription, true);
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

  const handleEditPhoto = (photo: ContestPhoto) => {
    setEditingPhoto(photo);
    setIsEditDialogOpen(true);
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (deletingPhotoId) return;
    
    console.log('Starting deletion for photo:', photoId);
    setDeletingPhotoId(photoId);
    
    try {
      // Get photo details first
      const { data: photoData, error: fetchError } = await supabase
        .from('contest_photos')
        .select('image_url')
        .eq('id', photoId)
        .single();

      if (fetchError) {
        console.error('Error fetching photo data:', fetchError);
        throw new Error('No se pudo obtener la información de la foto');
      }

      // Delete from database
      console.log('Deleting from database...');
      const { error: deleteError } = await supabase
        .from('contest_photos')
        .delete()
        .eq('id', photoId);

      if (deleteError) {
        console.error('Database deletion error:', deleteError);
        throw new Error('Error al eliminar la foto: ' + deleteError.message);
      }

      console.log('Photo deleted from database successfully');

      // Try to delete from storage
      if (photoData?.image_url) {
        try {
          const urlParts = photoData.image_url.split('/');
          const storageIndex = urlParts.findIndex(part => part === 'contest-photos');
          if (storageIndex !== -1 && storageIndex < urlParts.length - 1) {
            const filePath = urlParts.slice(storageIndex + 1).join('/');
            console.log('Attempting storage deletion for path:', filePath);
            
            const { error: storageError } = await supabase.storage
              .from('contest-photos')
              .remove([filePath]);

            if (storageError) {
              console.warn('Storage deletion warning:', storageError);
            } else {
              console.log('Storage cleanup completed successfully');
            }
          }
        } catch (storageError) {
          console.warn('Storage cleanup failed (non-critical):', storageError);
        }
      }

      toast({
        title: "Foto eliminada",
        description: "La foto ha sido eliminada correctamente del concurso",
      });

      // Refresh photos list
      console.log('Refreshing photos list...');
      await fetchContestPhotos();
      
    } catch (error: any) {
      console.error('Delete operation failed:', error);
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar la foto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setDeletingPhotoId(null);
    }
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
            Añade, edita y elimina fotos de los concursos.
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
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Añadir Nueva Foto
              </CardTitle>
              <CardDescription>
                Sube una nueva foto al concurso seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo-upload">Seleccionar Imagen</Label>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
                {uploadFile && (
                  <p className="text-sm text-muted-foreground">
                    Archivo seleccionado: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="photographer-name">Nombre del Fotógrafo *</Label>
                <Input
                  id="photographer-name"
                  value={photographerName}
                  onChange={(e) => setPhotographerName(e.target.value)}
                  placeholder="Nombre del fotógrafo"
                  disabled={isUploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo-description">Descripción (Opcional)</Label>
                <Textarea
                  id="photo-description"
                  value={photoDescription}
                  onChange={(e) => setPhotoDescription(e.target.value)}
                  placeholder="Descripción de la foto"
                  disabled={isUploading}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={isUploading || !uploadFile || !photographerName.trim()}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Añadir Foto al Concurso
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fotos del Concurso</CardTitle>
                  <CardDescription>
                    {photosLoading ? 'Cargando fotos...' : `${photos.length} foto(s) en este concurso`}
                  </CardDescription>
                </div>
                <Button 
                  onClick={fetchContestPhotos} 
                  variant="outline" 
                  size="sm"
                  disabled={photosLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${photosLoading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </div>
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
                        onError={(e) => {
                          console.error('Image failed to load:', photo.image_url);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="p-3">
                        <p className="font-medium text-sm">{photo.photographer_name}</p>
                        {photo.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{photo.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={photo.status === 'approved' ? 'default' : 'secondary'}>
                            {photo.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {photo.votes} votos
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPhoto(photo)}
                            className="flex-1"
                            disabled={deletingPhotoId === photo.id}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="flex-1" 
                                disabled={deletingPhotoId === photo.id}
                              >
                                {deletingPhotoId === photo.id ? (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Eliminando...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Eliminar
                                  </>
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar foto?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. La foto será eliminada permanentemente del concurso y del almacenamiento.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePhoto(photo.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={deletingPhotoId === photo.id}
                                >
                                  {deletingPhotoId === photo.id ? 'Eliminando...' : 'Eliminar'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <PhotoEditDialog
        photo={editingPhoto}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingPhoto(null);
        }}
        onSave={async (photoId: string, updates: Partial<ContestPhoto>) => {
          try {
            console.log('Updating photo:', photoId, 'with updates:', updates);
            
            const { data, error } = await supabase
              .from('contest_photos')
              .update(updates)
              .eq('id', photoId)
              .select();

            if (error) {
              console.error('Database update error:', error);
              throw error;
            }

            console.log('Photo updated successfully:', data);

            toast({
              title: "Foto actualizada",
              description: "Los cambios se han guardado correctamente",
            });

            await fetchContestPhotos();
          } catch (error: any) {
            console.error('Error updating photo:', error);
            toast({
              title: "Error al actualizar",
              description: error.message || "No se pudieron guardar los cambios",
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
};

export default ContestPhotoManager;
