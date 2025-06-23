
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PhotoReport {
  id: string;
  photo_id: string;
  reported_by_user_id: string;
  reason: string;
  description?: string;
  status: "pending" | "reviewed" | "dismissed";
  created_at: string;
  reviewed_at?: string;
  reviewed_by_admin_id?: string;
}

export const usePhotoReports = () => {
  const [reports, setReports] = useState<PhotoReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('photo_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching photo reports:', error);
        toast({
          title: "Error al cargar reportes",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        // Cast the data to our PhotoReport type to ensure proper typing
        setReports(data as PhotoReport[]);
      }
    } catch (error) {
      console.error('Error fetching photo reports:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar los reportes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reportPhoto = async (photoId: string, reason: string, description?: string) => {
    try {
      const { error } = await supabase
        .from('photo_reports')
        .insert({
          photo_id: photoId,
          reported_by_user_id: (await supabase.auth.getUser()).data.user?.id,
          reason,
          description,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Reporte enviado",
        description: "El reporte ha sido enviado exitosamente.",
      });

      fetchReports();
    } catch (error: any) {
      console.error('Error reporting photo:', error);
      toast({
        title: "Error al reportar foto",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateReportStatus = async (reportId: string, status: "reviewed" | "dismissed") => {
    try {
      const { error } = await supabase
        .from('photo_reports')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by_admin_id: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', reportId);

      if (error) throw error;

      toast({
        title: "Reporte actualizado",
        description: "El estado del reporte ha sido actualizado.",
      });

      fetchReports();
    } catch (error: any) {
      console.error('Error updating report status:', error);
      toast({
        title: "Error al actualizar reporte",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    reports,
    isLoading,
    reportPhoto,
    updateReportStatus,
    fetchReports
  };
};
