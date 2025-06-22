
import { useState } from "react";
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
      // For now, return null until the album_storage table is created
      console.log("Album storage table not yet created. Contest ID:", contestId);
      return null;
    } catch (error) {
      console.error('Error in getStorageInfo:', error);
      return null;
    }
  };

  const updateAutoRenewal = async (albumStorageId: string, enabled: boolean) => {
    try {
      setIsLoading(true);
      
      // Placeholder implementation until database table is created
      toast({
        title: "Info",
        description: "La funcionalidad de almacenamiento se activará cuando se configure la base de datos",
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
      
      // Placeholder implementation until database table is created
      toast({
        title: "Info",
        description: "La funcionalidad de almacenamiento se activará cuando se configure la base de datos",
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
