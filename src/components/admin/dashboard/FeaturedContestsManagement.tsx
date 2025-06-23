
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { useFeaturedContests } from "@/hooks/useFeaturedContests";
import { useContestsData } from "@/hooks/useContestsData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FeaturedContestsManagement = () => {
  const { featuredContests, isLoading, addToFeatured, removeFromFeatured, updateDisplayOrder } = useFeaturedContests();
  const { contests } = useContestsData();
  const [selectedContestId, setSelectedContestId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter out contests that are already featured
  const availableContests = contests.filter(contest => 
    !featuredContests.some(featured => featured.contest_id === contest.id)
  );

  const handleAddFeatured = async () => {
    if (selectedContestId) {
      await addToFeatured(selectedContestId);
      setSelectedContestId("");
      setIsDialogOpen(false);
    }
  };

  const moveUp = (featuredId: string, currentOrder: number) => {
    if (currentOrder > 1) {
      updateDisplayOrder(featuredId, currentOrder - 1);
      // Also update the item that was at position currentOrder - 1
      const itemToMoveDown = featuredContests.find(f => f.display_order === currentOrder - 1);
      if (itemToMoveDown) {
        updateDisplayOrder(itemToMoveDown.id, currentOrder);
      }
    }
  };

  const moveDown = (featuredId: string, currentOrder: number) => {
    const maxOrder = Math.max(...featuredContests.map(f => f.display_order));
    if (currentOrder < maxOrder) {
      updateDisplayOrder(featuredId, currentOrder + 1);
      // Also update the item that was at position currentOrder + 1
      const itemToMoveUp = featuredContests.find(f => f.display_order === currentOrder + 1);
      if (itemToMoveUp) {
        updateDisplayOrder(itemToMoveUp.id, currentOrder);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Cargando concursos destacados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Concursos Destacados</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Añadir Concurso Destacado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Concurso a Destacados</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Seleccionar Concurso</label>
                <Select value={selectedContestId} onValueChange={setSelectedContestId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un concurso" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableContests.map((contest) => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.title} - {contest.organizer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddFeatured} disabled={!selectedContestId}>
                  Añadir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {featuredContests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay concursos destacados.</p>
            <p className="text-sm text-muted-foreground">
              Añade concursos para que aparezcan en la página principal.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {featuredContests
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
                      <CardTitle className="text-lg">
                        {featured.contests?.title || 'Concurso sin título'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Organizado por: {featured.contests?.organizer || 'Desconocido'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    Destacado
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>Ubicación: {featured.contests?.location || 'Sin ubicación'}</p>
                    <p>Estado: {featured.contests?.status || 'Desconocido'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => moveUp(featured.id, featured.display_order)}
                      disabled={featured.display_order === 1}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => moveDown(featured.id, featured.display_order)}
                      disabled={featured.display_order === Math.max(...featuredContests.map(f => f.display_order))}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
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

export default FeaturedContestsManagement;
