
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AlbumStorage {
  id: string;
  contest_id: string;
  organizer_plan: string;
  storage_expires_at: string;
  is_active: boolean;
  renewal_price_cents: number;
  auto_renewal_enabled: boolean;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface StorageNotification {
  id: string;
  album_storage_id: string;
  notification_type: '30_days' | '7_days' | 'expired';
  sent_at: string;
  email_sent_to: string;
}

export const useAlbumStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getStorageInfo = async (contestId: string): Promise<AlbumStorage | null> => {
    try {
      const { data, error } = await supabase
        .from('album_storage')
        .select('*')
        .eq('contest_id', contestId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error is ok
        console.error('Error fetching album storage:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información de almacenamiento",
          variant: "destructive",
        });
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getStorageInfo:', error);
      return null;
    }
  };

  const updateAutoRenewal = async (albumStorageId: string, enabled: boolean) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('album_storage')
        .update({ 
          auto_renewal_enabled: enabled,
          updated_at: new Date().toISOString()
        })
        .eq('id', albumStorageId);

      if (error) throw error;

      toast({
        title: "Configuración actualizada",
        description: `Renovación automática ${enabled ? 'activada' : 'desactivada'} correctamente`,
      });

      return true;
    } catch (error: any) {
      console.error('Error updating auto renewal:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la configuración de renovación",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const extendStorage = async (albumStorageId: string, months: number = 12) => {
    try {
      setIsLoading(true);
      
      // First get current expiration date
      const { data: current, error: fetchError } = await supabase
        .from('album_storage')
        .select('storage_expires_at')
        .eq('id', albumStorageId)
        .single();

      if (fetchError) throw fetchError;

      // Calculate new expiration date
      const currentExpiration = new Date(current.storage_expires_at);
      const newExpiration = new Date(currentExpiration.getTime() + (months * 30 * 24 * 60 * 60 * 1000));

      const { error } = await supabase
        .from('album_storage')
        .update({ 
          storage_expires_at: newExpiration.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', albumStorageId);

      if (error) throw error;

      toast({
        title: "Almacenamiento extendido",
        description: `El almacenamiento se ha extendido ${months} meses`,
      });

      return true;
    } catch (error: any) {
      console.error('Error extending storage:', error);
      toast({
        title: "Error",
        description: "No se pudo extender el almacenamiento",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysUntilExpiration = (expirationDate: string): number => {
    const expiry = new Date(expirationDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatPrice = (priceInCents: number): string => {
    return `${(priceInCents / 100).toFixed(0)}€`;
  };

  const getStorageStatus = (albumStorage: AlbumStorage) => {
    const daysLeft = getDaysUntilExpiration(albumStorage.storage_expires_at);
    
    if (daysLeft <= 0) {
      return { status: 'expired', message: 'Almacenamiento expirado', variant: 'destructive' as const };
    } else if (daysLeft <= 7) {
      return { status: 'critical', message: `Expira en ${daysLeft} días`, variant: 'destructive' as const };
    } else if (daysLeft <= 30) {
      return { status: 'warning', message: `Expira en ${daysLeft} días`, variant: 'default' as const };
    } else {
      return { status: 'active', message: `Activo hasta ${new Date(albumStorage.storage_expires_at).toLocaleDateString()}`, variant: 'default' as const };
    }
  };

  return {
    isLoading,
    getStorageInfo,
    updateAutoRenewal,
    extendStorage,
    getDaysUntilExpiration,
    formatPrice,
    getStorageStatus
  };
};
