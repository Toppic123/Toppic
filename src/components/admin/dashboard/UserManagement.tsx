
import { useState, useEffect } from "react";
import { Edit, UserPlus, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: "participant" | "organizer" | "admin";
  photos: number;
}

// User form state type
export type UserFormData = {
  name: string;
  email: string;
  password: string;
  role: "participant" | "organizer" | "admin";
};

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "participant"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Para una aplicación real, esto debería hacerse a través de una API o función de Supabase
        // Aquí simulamos la carga de usuarios
        const mockUsers = [
          { id: "1", name: "Ana García", email: "ana@example.com", role: "participant", photos: 12 },
          { id: "2", name: "Juan López", email: "juan@example.com", role: "participant", photos: 8 },
          { id: "3", name: "María Torres", email: "maria@example.com", role: "organizer", photos: 0 },
          { id: "4", name: "Carlos Ruiz", email: "carlos@example.com", role: "participant", photos: 5 },
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Handle user search
  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle edit user
  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role as "participant" | "organizer" | "admin"
      });
      setIsEditUserDialogOpen(true);
    }
  };

  // Handle create user dialog
  const handleCreateUserDialog = () => {
    setUserFormData({
      name: "",
      email: "",
      password: "",
      role: "participant"
    });
    setIsCreateUserDialogOpen(true);
  };

  // Handle save user changes
  const handleSaveUserChanges = async () => {
    try {
      setIsSubmitting(true);
      
      // Aquí iría la lógica para actualizar el usuario en la base de datos
      // Simulamos un tiempo de espera
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar localmente
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.email === userFormData.email 
            ? { ...user, name: userFormData.name, role: userFormData.role } 
            : user
        )
      );
      
      // Actualizar usuarios filtrados
      handleUserSearch(searchQuery);
      
      toast({
        title: "Cambios guardados",
        description: "Los cambios en el usuario han sido guardados correctamente.",
      });
      
      setIsEditUserDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle create new user
  const handleCreateUser = async () => {
    try {
      setIsSubmitting(true);
      
      // Validar los datos del formulario
      if (!userFormData.name.trim() || !userFormData.email.trim() || !userFormData.password.trim()) {
        throw new Error("Todos los campos son obligatorios");
      }
      
      if (userFormData.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      
      // Simular creación de usuario
      const newUser: User = {
        id: `${users.length + 1}`,
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        photos: 0
      };
      
      // Aquí iría la llamada a la API o Supabase para crear el usuario
      // En una aplicación real, esto crearía el usuario en la base de datos
      
      // Actualizar la lista de usuarios localmente
      setUsers(prevUsers => [...prevUsers, newUser]);
      setFilteredUsers(prevUsers => [...prevUsers, newUser]);
      
      toast({
        title: "Usuario creado",
        description: `El usuario ${userFormData.name} ha sido creado correctamente.`,
      });
      
      setIsCreateUserDialogOpen(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear el usuario.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
        <Button onClick={handleCreateUserDialog}>
          <UserPlus className="h-4 w-4 mr-2" />
          Crear Usuario
        </Button>
      </div>
      
      <div className="relative w-full mb-4">
        <Input 
          placeholder="Buscar usuarios..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => handleUserSearch(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <Alert>
          <AlertDescription>
            {searchQuery ? 
              "No se encontraron usuarios que coincidan con tu búsqueda." : 
              "No hay usuarios registrados."}
          </AlertDescription>
        </Alert>
      ) : (
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
      )}

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
                disabled
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
            <Button 
              variant="outline" 
              onClick={() => setIsEditUserDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveUserChanges}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Introduce los detalles para el nuevo usuario.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="newUserName">Nombre</Label>
              <Input
                id="newUserName"
                value={userFormData.name}
                onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newUserEmail">Email</Label>
              <Input
                id="newUserEmail"
                type="email"
                value={userFormData.email}
                onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newUserPassword">Contraseña</Label>
              <Input
                id="newUserPassword"
                type="password"
                value={userFormData.password}
                onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newUserRole">Rol</Label>
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
            <Button 
              variant="outline" 
              onClick={() => setIsCreateUserDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Crear Usuario'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
