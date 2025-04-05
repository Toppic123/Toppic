
import { useState, useRef, ChangeEvent } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { X, Trash2, Edit, Move, Plus, Download, Image, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useWinningPhotos, WinningPhoto } from '@/hooks/use-winning-photos';
import { useToast } from '@/hooks/use-toast';
import { reorder } from '@/lib/utils';

const GalleryManager = () => {
  const { photos, updatePhoto, addPhoto, removePhoto, reorderPhotos } = useWinningPhotos();
  const [editingPhoto, setEditingPhoto] = useState<WinningPhoto | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    imageUrl: '',
    title: '',
    photographer: '',
    photographerAvatar: '',
    likes: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleEdit = (photo: WinningPhoto) => {
    setEditingPhoto(photo);
  };

  const handleDelete = (id: number) => {
    removePhoto(id);
  };

  const handleUpdatePhoto = () => {
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, editingPhoto);
      setEditingPhoto(null);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhoto.imageUrl && !previewImage) {
      toast({
        title: "Imagen requerida",
        description: "Por favor, proporciona una URL de imagen o sube una imagen.",
        variant: "destructive"
      });
      return;
    }

    if (!newPhoto.title || !newPhoto.photographer) {
      toast({
        title: "Información requerida",
        description: "Por favor, completa el título y el nombre del fotógrafo.",
        variant: "destructive"
      });
      return;
    }

    const photoToAdd = {
      ...newPhoto,
      imageUrl: previewImage || newPhoto.imageUrl,
    };

    addPhoto(photoToAdd);
    
    setNewPhoto({
      imageUrl: '',
      title: '',
      photographer: '',
      photographerAvatar: '',
      likes: 0
    });
    setPreviewImage(null);
    setIsAddingPhoto(false);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedPhotos = reorder(
      photos,
      result.source.index,
      result.destination.index
    );

    reorderPhotos(reorderedPhotos);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    // Simulate file upload and generate a local URL (in a real app, you would upload to a server)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Fotos destacadas</h2>
        <Button variant="default" onClick={() => setIsAddingPhoto(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir foto
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery-photos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {photos.map((photo, index) => (
                <Draggable key={photo.id} draggableId={String(photo.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="relative"
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-40 h-40">
                              <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                                }}
                              />
                              <div 
                                {...provided.dragHandleProps}
                                className="absolute top-2 left-2 bg-black/30 p-1.5 rounded-md cursor-move hover:bg-black/50 transition-colors"
                              >
                                <Move className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            
                            <div className="flex-1 p-4 flex flex-col justify-between">
                              <div>
                                <h3 className="font-medium truncate mb-1">{photo.title}</h3>
                                <p className="text-sm text-muted-foreground">Por {photo.photographer}</p>
                                <p className="text-xs text-muted-foreground mt-1">{photo.likes} Me gusta</p>
                              </div>
                              
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(photo)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => handleDelete(photo.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {photos.length === 0 && (
        <div className="border rounded-lg border-dashed p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No hay fotos destacadas</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Añade fotos ganadoras para mostrar en la página principal.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsAddingPhoto(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir primera foto
          </Button>
        </div>
      )}

      {/* Edit Photo Dialog */}
      <Dialog open={!!editingPhoto} onOpenChange={(open) => !open && setEditingPhoto(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar foto</DialogTitle>
          </DialogHeader>
          
          {editingPhoto && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-url">URL de imagen</Label>
                <Input 
                  id="edit-url" 
                  value={editingPhoto.imageUrl} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, imageUrl: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input 
                  id="edit-title" 
                  value={editingPhoto.title} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-photographer">Fotógrafo</Label>
                <Input 
                  id="edit-photographer" 
                  value={editingPhoto.photographer} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, photographer: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-avatar">Avatar del fotógrafo (opcional)</Label>
                <Input 
                  id="edit-avatar" 
                  value={editingPhoto.photographerAvatar} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, photographerAvatar: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-likes">Me gusta</Label>
                <Input 
                  id="edit-likes" 
                  type="number" 
                  value={editingPhoto.likes} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, likes: parseInt(e.target.value) || 0})} 
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleUpdatePhoto} className="w-full">Guardar cambios</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog open={isAddingPhoto} onOpenChange={setIsAddingPhoto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir nueva foto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 my-4">
              {(previewImage || newPhoto.imageUrl) && (
                <div className="relative w-full h-60 mb-4 border rounded-md overflow-hidden">
                  <img 
                    src={previewImage || newPhoto.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                    onClick={() => {
                      setPreviewImage(null);
                      setNewPhoto({...newPhoto, imageUrl: ''});
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="file" 
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    disabled={uploadingImage}
                    onClick={triggerFileUpload}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir imagen
                  </Button>
                </div>
                
                <div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const url = prompt("Introduce la URL de la imagen:");
                      if (url) {
                        setPreviewImage(null);
                        setNewPhoto({...newPhoto, imageUrl: url});
                      }
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    URL de imagen
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="new-title">Título</Label>
              <Input 
                id="new-title" 
                value={newPhoto.title} 
                onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-photographer">Fotógrafo</Label>
              <Input 
                id="new-photographer" 
                value={newPhoto.photographer} 
                onChange={(e) => setNewPhoto({...newPhoto, photographer: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-avatar">Avatar del fotógrafo (opcional)</Label>
              <Input 
                id="new-avatar" 
                value={newPhoto.photographerAvatar} 
                onChange={(e) => setNewPhoto({...newPhoto, photographerAvatar: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-likes">Me gusta</Label>
              <Input 
                id="new-likes" 
                type="number" 
                value={newPhoto.likes} 
                onChange={(e) => setNewPhoto({...newPhoto, likes: parseInt(e.target.value) || 0})} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPhoto(false)}>Cancelar</Button>
            <Button onClick={handleAddPhoto}>Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManager;
