
import { useState, useEffect } from "react";
import { Edit, UserPlus, Loader2, Trash2 } from "lucide-react";
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

// User type definition with strong typing for role
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Cargar usuarios reales desde Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Obtener perfiles de usuario
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (profilesError) throw profilesError;

        // Obtener count de fotos por usuario
        const { data: photoCounts, error: photoError } = await supabase
          .from('contest_photos')
          .select('user_id')
          .eq('status', 'approved');

        if (photoError) throw photoError;

        // Contar fotos por usuario
        const photoCountMap = photoCounts?.reduce((acc, photo) => {
          acc[photo.user_id] = (acc[photo.user_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {};

        // Mapear perfiles a usuarios con role por defecto
        const usersData: User[] = profiles?.map(profile => ({
          id: profile.id,
          name: profile.name || profile.email || 'Sin nombre',
          email: profile.email || '',
          role: profile.email === 'pisillo@gmail.com' ? 'admin' as const : 'participant' as const,
          photos: photoCountMap[profile.id] || 0
        })) || [];
        
        setUsers(usersData);
        setFilteredUsers(usersData);
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

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete user - Eliminar usuario real
  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      setIsSubmitting(true);
      
      // Eliminar perfil del usuario
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDelete.id);

      if (profileError) throw profileError;

      // Nota: Para eliminar completamente el usuario de auth.users se requeriría
      // una función admin o usar la API de Supabase Management
      
      // Actualizar la lista de usuarios localmente
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      
      toast({
        title: "Usuario eliminado",
        description: `El usuario ${userToDelete.name} ha sido eliminado correctamente.`,
      });
      
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle save user changes - Actualizar usuario real
  const handleSaveUserChanges = async () => {
    try {
      setIsSubmitting(true);
      
      // Validar datos
      if (!userFormData.name.trim() || !userFormData.email.trim()) {
        throw new Error("El nombre y email son obligatorios");
      }

      // Buscar el usuario actual para obtener su ID
      const currentUser = users.find(u => u.email === userFormData.email);
      if (!currentUser) {
        throw new Error("Usuario no encontrado");
      }
      
      // Actualizar el perfil en Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: userFormData.name,
        })
        .eq('id', currentUser.id);

      if (profileError) throw profileError;
      
      // Actualizar localmente
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === currentUser.id 
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
        description: error instanceof Error ? error.message : "No se pudieron guardar los cambios.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle create new user - Crear usuario real en Supabase
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

      // Verificar que no existe ya un usuario con este email
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', userFormData.email)
        .single();

      if (existingProfile) {
        throw new Error("Ya existe un usuario con este email");
      }
      
      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userFormData.email,
        password: userFormData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: userFormData.name,
            role: userFormData.role
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("No se pudo crear el usuario");
      }

      // Crear o actualizar perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          name: userFormData.name,
          email: userFormData.email,
        });

      if (profileError) throw profileError;

      // Crear el usuario localmente para actualizar la UI inmediatamente
      const newUser: User = {
        id: authData.user.id,
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        photos: 0
      };
      
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
                    <div className="flex justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleEditUser(user.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleDeleteUser(user)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
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

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar al usuario "{userToDelete?.name}"? 
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeleteUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                'Eliminar Usuario'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
