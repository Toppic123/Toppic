
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
import { usePhotoReports } from "@/hooks/usePhotoReports";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const PhotoReportsManagement = () => {
  const { reports, isLoading, updateReportStatus } = usePhotoReports();
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'reviewed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Revisado</Badge>;
      case 'dismissed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Descartado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getReasonsDisplayName = (reason: string) => {
    const reasonMap: { [key: string]: string } = {
      'inappropriate': 'Contenido inapropiado',
      'copyright': 'Violación de derechos de autor',
      'spam': 'Spam o contenido irrelevante',
      'offensive': 'Contenido ofensivo',
      'other': 'Otro'
    };
    return reasonMap[reason] || reason;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Cargando reportes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Reportes</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-muted-foreground">
              {reports.filter(r => r.status === 'pending').length} reportes pendientes
            </span>
          </div>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No hay reportes para revisar.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Reporte de Foto
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Razón: {getReasonsDisplayName(report.reason)}
                    </p>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.description && (
                    <div>
                      <p className="text-sm font-medium mb-1">Descripción:</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Reportado el: {new Date(report.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateReportStatus(report.id, 'reviewed')}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Marcar como Revisado
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateReportStatus(report.id, 'dismissed')}
                        className="flex items-center gap-1"
                      >
                        <XCircle className="h-4 w-4" />
                        Descartar
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedReport(report)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalles del Reporte</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">ID de Foto:</p>
                              <p className="text-sm text-muted-foreground">{report.photo_id}</p>
                            </div>
                            <div>
                              <p className="font-medium">Razón:</p>
                              <p className="text-sm text-muted-foreground">{getReasonsDisplayName(report.reason)}</p>
                            </div>
                            {report.description && (
                              <div>
                                <p className="font-medium">Descripción:</p>
                                <p className="text-sm text-muted-foreground">{report.description}</p>
                              </div>
                            )}
                            <div>
                              <p className="font-medium">Estado:</p>
                              {getStatusBadge(report.status)}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoReportsManagement;
