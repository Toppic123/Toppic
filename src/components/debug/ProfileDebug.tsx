import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProfileDebug = () => {
  const { profile, refetch, updateProfile } = useProfile();
  const { user } = useAuth();
  const [name, setName] = useState(profile?.name ?? "");
  const [username, setUsername] = useState(profile?.username?.replace(/^@+/, '') ?? "");

  useEffect(() => {
    setName(profile?.name ?? "");
    setUsername(profile?.username?.replace(/^@+/, '') ?? "");
  }, [profile]);

  const onSave = async () => {
    await updateProfile({ name: name || null, username: username || null });
    await refetch();
  };

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p><strong>Auth User:</strong> {user?.email}</p>
      <p><strong>Profile Name:</strong> {profile?.name}</p>
      <p><strong>Profile Username:</strong> {profile?.username}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="dbg-name">Nombre</Label>
          <Input id="dbg-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="dbg-username">Usuario</Label>
          <Input id="dbg-username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={onSave}>Guardar</Button>
        <Button size="sm" variant="secondary" onClick={refetch}>Refrescar</Button>
      </div>
    </div>
  );
};

export default ProfileDebug;