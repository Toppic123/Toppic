
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

// Mock data for users
const mockUsers = [
  { id: "1", name: "Ana García", email: "ana@example.com", role: "participant", photos: 12 },
  { id: "2", name: "Juan López", email: "juan@example.com", role: "participant", photos: 8 },
  { id: "3", name: "María Torres", email: "maria@example.com", role: "organizer", photos: 0 },
  { id: "4", name: "Carlos Ruiz", email: "carlos@example.com", role: "participant", photos: 5 },
];

// User form state type
export type UserFormData = {
  name: string;
  email: string;
  role: "participant" | "organizer" | "admin";
};

const UserManagement = () => {
  const { toast } = useToast();
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "participant"
  });

  // Handle user search
  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }
    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle edit user
  const handleEditUser = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setUserFormData({
        name: user.name,
        email: user.email,
        role: user.role as "participant" | "organizer" | "admin"
      });
      setIsEditUserDialogOpen(true);
    }
  };

  // Handle save user changes
  const handleSaveUserChanges = () => {
    setIsEditUserDialogOpen(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en el usuario han sido guardados correctamente.",
    });
  };

  return (
    <>
      <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
      
      <div className="relative w-full mb-4">
        <Input 
          placeholder="Buscar usuarios..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => handleUserSearch(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-right">Fotos</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-muted/50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'organizer' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-right">{user.photos}</td>
                <td className="p-3 text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleEditUser(user.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica los detalles del usuario seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="userName">Nombre</Label>
              <Input
                id="userName"
                value={userFormData.name}
                onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userFormData.email}
                onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="userRole">Rol</Label>
              <Select 
                value={userFormData.role}
                onValueChange={(value: "participant" | "organizer" | "admin") => 
                  setUserFormData({...userFormData, role: value})
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="participant">Participante</SelectItem>
                  <SelectItem value="organizer">Organizador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveUserChanges}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
