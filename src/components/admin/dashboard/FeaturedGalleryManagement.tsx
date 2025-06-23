
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Trash2, MoveUp, MoveDown, Image } from "lucide-react";
import { useFeaturedGallery } from "@/hooks/useFeaturedGallery";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const FeaturedGalleryManagement = () => {
  const { featuredPhotos, isLoading, addToFeatured, removeFromFeatured } = useFeaturedGallery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    photoId: "",
    title: "",
    description: ""
  });

  const handleAddFeatured = async () => {
    if (newPhoto.photoId && newPhoto.title) {
      await addToFeatured(newPhoto.photoId, newPhoto.title, newPhoto.description);
      setNewPhoto({ photoId: "", title: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Cargando galería destacada...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Galería Destacada</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Añadir Foto Destacada
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Foto a Galería Destacada</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="photoId">ID de la Foto</Label>
                <Input
                  id="photoId"
                  value={newPhoto.photoId}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, photoId: e.target.value }))}
                  placeholder="Ingresa el ID de la foto"
                />
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título de la foto"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción de la foto"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddFeatured} disabled={!newPhoto.photoId || !newPhoto.title}>
                  Añadir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {featuredPhotos.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay fotos destacadas.</p>
            <p className="text-sm text-muted-foreground">
              Añade fotos para que aparezcan en la galería destacada.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {featuredPhotos
            .sort((a, b) => a.display_order - b.display_order)
            .map((featured) => (
            <Card key={featured.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      #{featured.display_order}
                    </Badge>
                    <div>
                      <CardTitle className="text-lg">{featured.title}</CardTitle>
                      {featured.description && (
                        <p className="text-sm text-muted-foreground">{featured.description}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Destacada
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {featured.contest_photos?.image_url && (
                      <img 
                        src={featured.contest_photos.image_url} 
                        alt={featured.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="text-sm text-muted-foreground">
                      <p>Fotógrafo: {featured.contest_photos?.photographer_name || 'Desconocido'}</p>
                      <p>ID: {featured.photo_id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeFromFeatured(featured.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedGalleryManagement;
