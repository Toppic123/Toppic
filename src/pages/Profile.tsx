
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, MapPin, Calendar, Globe, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import ProfileSettingsTabs from "@/components/profile/ProfileSettingsTabs";
import PhotoGallery from "@/components/profile/PhotoGallery";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { profileSlug } = useParams<{ profileSlug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile: currentUserProfile, loading: currentUserLoading } = useProfile();
  const { toast } = useToast();
  
  // State for viewing another user's profile
  const [viewedProfile, setViewedProfile] = useState<any>(null);
  const [isLoadingViewedProfile, setIsLoadingViewedProfile] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Determine if we're viewing current user's profile or another user's profile
  const isOwnProfile = !profileSlug;
  const profileToShow = isOwnProfile ? currentUserProfile : viewedProfile;
  const isLoading = isOwnProfile ? currentUserLoading : isLoadingViewedProfile;

  // Function to create slug from name
  const createSlugFromName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Fetch profile data for viewed user
  useEffect(() => {
    if (!isOwnProfile && profileSlug) {
      fetchViewedProfile();
    }
  }, [profileSlug, isOwnProfile]);

  // Fetch photos for the profile
  useEffect(() => {
    if (profileToShow?.name || profileToShow?.username) {
      fetchUserPhotos();
    }
  }, [profileToShow]);

  const fetchViewedProfile = async () => {
    setIsLoadingViewedProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('Error fetching profiles:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil del usuario.",
          variant: "destructive"
        });
        return;
      }

      // Find profile by matching slug
      const foundProfile = data?.find(profile => {
        if (!profile.name) return false;
        const slug = createSlugFromName(profile.name);
        return slug === profileSlug;
      });

      if (foundProfile) {
        setViewedProfile(foundProfile);
      } else {
        toast({
          title: "Usuario no encontrado",
          description: "El perfil solicitado no existe.",
          variant: "destructive"
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching viewed profile:', error);
      toast({
        title: "Error",
        description: "Error inesperado al cargar el perfil.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingViewedProfile(false);
    }
  };

  const fetchUserPhotos = async () => {
    setIsLoadingPhotos(true);
    const photographerName = profileToShow?.name || profileToShow?.username;
    
    try {
      const { data: contestPhotos, error: contestError } = await supabase
        .from('contest_photos')
        .select('*')
        .eq('photographer_name', photographerName);

      if (contestError) {
        console.error('Error fetching contest photos:', contestError);
      }

      // Mock photos for demonstration
      const mockPhotos = [
        {
          id: `mock-1-${photographerName}`,
          title: "Paisaje Urbano",
          imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
          likes: 45,
          contestName: "Fotografía Urbana",
          photographer: photographerName,
          photographerAvatar: profileToShow?.avatar_url
        },
        {
          id: `mock-2-${photographerName}`,
          title: "Retrato Natural",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
          likes: 32,
          contestName: "Retratos Naturales",
          photographer: photographerName,
          photographerAvatar: profileToShow?.avatar_url
        },
        {
          id: `mock-3-${photographerName}`,
          title: "Arquitectura Moderna",
          imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
          likes: 28,
          contestName: "Arquitectura",
          photographer: photographerName,
          photographerAvatar: profileToShow?.avatar_url
        }
      ];

      // Combine real and mock photos
      const allPhotos = [
        ...(contestPhotos?.map(photo => ({
          id: photo.id,
          title: photo.description || 'Sin título',
          imageUrl: photo.image_url,
          likes: photo.votes || 0,
          contestName: 'Concurso de fotografía',
          photographer: photo.photographer_name,
          photographerAvatar: photo.photographer_avatar
        })) || []),
        ...mockPhotos
      ];

      setPhotos(allPhotos);
    } catch (error) {
      console.error('Error fetching user photos:', error);
      setPhotos([]);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  const handleDeleteAccount = () => {
    // Placeholder function for delete account
    console.log('Delete account requested');
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </motion.div>
    );
  }

  if (!isOwnProfile && !profileToShow) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Usuario no encontrado</h2>
          <p className="text-muted-foreground mb-4">El perfil que buscas no existe.</p>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              {profileToShow?.avatar_url ? (
                <img 
                  src={profileToShow.avatar_url} 
                  alt={profileToShow.name || 'Usuario'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl md:text-4xl font-bold">
                  {(profileToShow?.name || profileToShow?.username || 'U')[0].toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {profileToShow?.name || profileToShow?.username || 'Usuario Anónimo'}
              </h1>
              {profileToShow?.bio && (
                <p className="text-lg opacity-90 mb-4 max-w-2xl">{profileToShow.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm opacity-75">
                {profileToShow?.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profileToShow.website.startsWith('http') ? profileToShow.website : `https://${profileToShow.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {profileToShow.website}
                    </a>
                  </div>
                )}
                {profileToShow?.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Miembro desde {new Date(profileToShow.created_at).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {isOwnProfile && (
              <Button
                variant="secondary"
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {showSettings ? <Edit className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                {showSettings ? 'Editar perfil' : 'Configuración'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isOwnProfile && showSettings ? (
          <ProfileSettingsTabs onDeleteAccount={handleDeleteAccount} />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Galería de fotos ({photos.length})
              </h2>
            </div>
            
            {isLoadingPhotos ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <PhotoGallery photos={photos} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
