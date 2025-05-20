
import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { X, Edit, Trash, Plus, ImageOff, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { WinningPhoto, useWinningPhotos } from "@/hooks/use-winning-photos";

const GalleryManager = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpdatePhoto = () => {
    if (editingPhoto) {
      updatePhoto(
        editingPhoto.id, 
        {
          title: editingPhoto.title,
          photographer: editingPhoto.photographer,
          photographerAvatar: editingPhoto.photographerAvatar,
        },
        selectedFile || undefined
      );
      setEditingPhoto(null);
      setSelectedFile(null);
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.title && (newPhoto.imageUrl || selectedFile)) {
      addPhoto(newPhoto, selectedFile || undefined);
      setIsAddDialogOpen(false);
      setNewPhoto({
        imageUrl: '',
        title: '',
        photographer: '',
        photographerAvatar: '',
        likes: 0
      });
      setSelectedFile(null);
    }
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    if (!photos) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= photos.length) {
      return;
    }
    
    const newOrder = Array.from(photos);
    const [movedItem] = newOrder.splice(index, 1);
    newOrder.splice(newIndex, 0, movedItem);
    
    reorderPhotos(newOrder);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !photos) {
      return;
    }

    const newOrder = Array.from(photos);
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);

    reorderPhotos(newOrder);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (!photos || loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Gestión de Galería</h2>
          <Button disabled>Añadir foto</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardContent>
              <CardFooter className="p-3">
                <Skeleton className="h-5 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Gestión de Galería</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir foto
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="photos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {photos.map((photo, index) => (
                  <Draggable
                    key={String(photo.id)}
                    draggableId={String(photo.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card>
                            <CardContent className="p-0 relative group">
                              {photo.imageUrl ? (
                                <img
                                  src={photo.imageUrl}
                                  alt={photo.title}
                                  className="h-48 w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                                  }}
                                />
                              ) : (
                                <div className="h-48 w-full bg-muted flex items-center justify-center">
                                  <ImageOff className="h-10 w-10 text-muted-foreground" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => setEditingPhoto({ ...photo })}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removePhoto(photo.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex flex-col">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="mb-1 h-8 w-8 bg-white"
                                  onClick={() => handleMovePhoto(index, 'up')}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-white"
                                  onClick={() => handleMovePhoto(index, 'down')}
                                  disabled={index === photos.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                            <CardFooter className="p-3">
                              <div className="w-full">
                                <h3 className="text-sm font-medium line-clamp-1">{photo.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {photo.photographer} • {photo.likes} likes
                                </p>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Dialog open={!!editingPhoto} onOpenChange={(open) => !open && setEditingPhoto(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar foto</DialogTitle>
          </DialogHeader>
          {editingPhoto && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : editingPhoto.imageUrl
                  }
                  alt={editingPhoto.title}
                  className="w-full h-56 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Cambiar imagen
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editingPhoto.title}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-photographer">Fotógrafo</Label>
                <Input
                  id="edit-photographer"
                  value={editingPhoto.photographer}
                  onChange={(e) =>
                    setEditingPhoto({
                      ...editingPhoto,
                      photographer: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-avatar">Avatar del fotógrafo (URL)</Label>
                <Input
                  id="edit-avatar"
                  value={editingPhoto.photographerAvatar}
                  onChange={(e) =>
                    setEditingPhoto({
                      ...editingPhoto,
                      photographerAvatar: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPhoto(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdatePhoto}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => !open && setIsAddDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Añadir nueva foto</DialogTitle>
            <X
              className="absolute right-4 top-4 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => setIsAddDialogOpen(false)}
            />
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">URL de imagen</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={newPhoto.imageUrl}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, imageUrl: e.target.value })
                  }
                  disabled={!!selectedFile}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  O subir archivo
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {(selectedFile || newPhoto.imageUrl) && (
              <div className="rounded-md overflow-hidden">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : newPhoto.imageUrl
                  }
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div>
              <Label htmlFor="add-title">Título</Label>
              <Input
                id="add-title"
                value={newPhoto.title}
                onChange={(e) =>
                  setNewPhoto({ ...newPhoto, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="add-photographer">Fotógrafo</Label>
              <Input
                id="add-photographer"
                value={newPhoto.photographer}
                onChange={(e) =>
                  setNewPhoto({ ...newPhoto, photographer: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="add-avatar">Avatar del fotógrafo (URL)</Label>
              <Input
                id="add-avatar"
                value={newPhoto.photographerAvatar}
                onChange={(e) =>
                  setNewPhoto({
                    ...newPhoto,
                    photographerAvatar: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="add-likes">Likes iniciales</Label>
              <Input
                id="add-likes"
                type="number"
                value={newPhoto.likes}
                onChange={(e) =>
                  setNewPhoto({
                    ...newPhoto,
                    likes: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPhoto}>Añadir foto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryManager;
