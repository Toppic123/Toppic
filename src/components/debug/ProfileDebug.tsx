import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";

const ProfileDebug = () => {
  const { profile, refetch } = useProfile();
  const { user } = useAuth();

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h3 className="font-bold">Debug Info:</h3>
      <p><strong>Auth User:</strong> {user?.email}</p>
      <p><strong>Profile Name:</strong> {profile?.name}</p>
      <p><strong>Profile Username:</strong> {profile?.username}</p>
      <button 
        onClick={refetch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refetch Profile
      </button>
    </div>
  );
};

export default ProfileDebug;