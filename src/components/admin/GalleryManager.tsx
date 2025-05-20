import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Image, Plus, Upload, Move } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  useWinningPhotos, 
  WinningPhoto 
} from '@/hooks/use-winning-photos';

const GalleryManager = () => {
  const { photos, updatePhoto, addPhoto, removePhoto, reorderPhotos, loading } = useWinningPhotos();
  const [editingPhoto, setEditingPhoto] = useState<WinningPhoto | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<Omit<WinningPhoto, "id">>({
    imageUrl: '',
    title: '',
    photographer: '',
    photographerAvatar: '',
    likes: 0
  });
  
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (photo: WinningPhoto) => {
    setEditingPhoto(photo);
    setEditImageFile(null);
  };

  const handleUpdatePhoto = () => {
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, editingPhoto, editImageFile || undefined);
      setEditingPhoto(null);
      setEditImageFile(null);
    }
  };

  const handleAddPhoto = () => {
    addPhoto(newPhoto, newImageFile || undefined);
    setNewPhoto({
      imageUrl: '',
      title: '',
      photographer: '',
      photographerAvatar: '',
      likes: 0
    });
    setNewImageFile(null);
    setIsAddDialogOpen(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    reorderPhotos(items);
  };
  
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
    }
  };
  
  const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestionar Galería</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#4891AA] hover:bg-[#4891AA]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
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
                <Draggable key={photo.id} draggableId={`photo-${photo.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="relative"
                    >
                      <Card>
                        <CardContent className="p-4 flex items-center gap-4">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab p-2 hover:bg-gray-100 rounded"
                          >
                            <Move className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="h-20 w-20 overflow-hidden rounded">
                            <img 
                              src={photo.imageUrl} 
                              alt={photo.title} 
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{photo.title}</h3>
                            <p className="text-sm text-muted-foreground">{photo.photographer}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEditClick(photo)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => removePhoto(photo.id)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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

      {/* Edit Photo Dialog */}
      <Dialog 
        open={!!editingPhoto} 
        onOpenChange={(open) => {
          if (!open) {
            setEditingPhoto(null);
            setEditImageFile(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Foto</DialogTitle>
          </DialogHeader>
          
          {editingPhoto && (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative h-40 w-full mb-4 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {(editImageFile || editingPhoto.imageUrl) ? (
                    <img 
                      src={editImageFile ? URL.createObjectURL(editImageFile) : editingPhoto.imageUrl} 
                      alt={editingPhoto.title} 
                      className="object-contain max-h-full max-w-full"
                    />
                  ) : (
                    <Image className="w-12 h-12 text-gray-300" />
                  )}
                </div>
                
                <div className="space-y-2 w-full">
                  <div className="flex flex-col">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => editFileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Subir imagen
                    </Button>
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditFileChange}
                    />
                    {editImageFile && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Archivo seleccionado: {editImageFile.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="imageUrl">o URL de la imagen</Label>
                    <Input 
                      id="imageUrl" 
                      value={editingPhoto.imageUrl} 
                      onChange={(e) => setEditingPhoto({...editingPhoto, imageUrl: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input 
                    id="title" 
                    value={editingPhoto.title} 
                    onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes">Me gusta</Label>
                  <Input 
                    id="likes" 
                    type="number"
                    value={editingPhoto.likes} 
                    onChange={(e) => setEditingPhoto({...editingPhoto, likes: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photographer">Fotógrafo</Label>
                <Input 
                  id="photographer" 
                  value={editingPhoto.photographer} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, photographer: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photographerAvatar">URL del avatar del fotógrafo</Label>
                <Input 
                  id="photographerAvatar" 
                  value={editingPhoto.photographerAvatar} 
                  onChange={(e) => setEditingPhoto({...editingPhoto, photographerAvatar: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              onClick={handleUpdatePhoto} 
              className="bg-[#4891AA] hover:bg-[#4891AA]/90"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog 
        open={isAddDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setNewImageFile(null);
          } else {
            setIsAddDialogOpen(true);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir nueva foto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="relative h-40 w-full mb-4 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                {newImageFile ? (
                  <img 
                    src={URL.createObjectURL(newImageFile)} 
                    alt="Preview" 
                    className="object-contain max-h-full max-w-full"
                  />
                ) : newPhoto.imageUrl ? (
                  <img 
                    src={newPhoto.imageUrl} 
                    alt="Preview" 
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <Upload className="w-12 h-12 text-gray-300" />
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <div className="flex flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => newFileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Subir imagen
                  </Button>
                  <input
                    ref={newFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleNewFileChange}
                  />
                  {newImageFile && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Archivo seleccionado: {newImageFile.name}
                    </p>
                  )}
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="new-imageUrl">o URL de la imagen</Label>
                  <Input 
                    id="new-imageUrl" 
                    value={newPhoto.imageUrl} 
                    onChange={(e) => setNewPhoto({...newPhoto, imageUrl: e.target.value})}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">Título</Label>
                <Input 
                  id="new-title" 
                  value={newPhoto.title} 
                  onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                  placeholder="Título de la foto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-likes">Me gusta</Label>
                <Input 
                  id="new-likes" 
                  type="number"
                  value={newPhoto.likes.toString()} 
                  onChange={(e) => setNewPhoto({...newPhoto, likes: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-photographer">Fotógrafo</Label>
              <Input 
                id="new-photographer" 
                value={newPhoto.photographer} 
                onChange={(e) => setNewPhoto({...newPhoto, photographer: e.target.value})}
                placeholder="Nombre del fotógrafo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-photographerAvatar">URL del avatar del fotógrafo</Label>
              <Input 
                id="new-photographerAvatar" 
                value={newPhoto.photographerAvatar} 
                onChange={(e) => setNewPhoto({...newPhoto, photographerAvatar: e.target.value})}
                placeholder="https://ejemplo.com/avatar.jpg"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              onClick={handleAddPhoto} 
              disabled={loading || (!newImageFile && !newPhoto.imageUrl) || !newPhoto.title || !newPhoto.photographer}
              className="bg-[#4891AA] hover:bg-[#4891AA]/90"
            >
              {loading ? "Añadiendo..." : "Añadir foto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManager;
