
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, CreditCard, Download, Info } from "lucide-react";
import { useAlbumStorage, type AlbumStorage } from "@/hooks/useAlbumStorage";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlbumStorageInfoProps {
  contestId: string;
  contestTitle: string;
}

const AlbumStorageInfo = ({ contestId, contestTitle }: AlbumStorageInfoProps) => {
  const [storageInfo, setStorageInfo] = useState<AlbumStorage | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    getStorageInfo, 
    updateAutoRenewal, 
    formatPrice, 
    getStorageStatus,
    isLoading: isUpdating 
  } = useAlbumStorage();

  useEffect(() => {
    loadStorageInfo();
  }, [contestId]);

  const loadStorageInfo = async () => {
    setLoading(true);
    const info = await getStorageInfo(contestId);
    setStorageInfo(info);
    setLoading(false);
  };

  const handleAutoRenewalToggle = async (enabled: boolean) => {
    if (!storageInfo) return;
    
    const success = await updateAutoRenewal(storageInfo.id, enabled);
    if (success) {
      setStorageInfo(prev => prev ? { ...prev, auto_renewal_enabled: enabled } : null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Almacenamiento del Álbum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Cargando información...</div>
        </CardContent>
      </Card>
    );
  }

  if (!storageInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Almacenamiento del Álbum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              La información de almacenamiento se creará automáticamente cuando se guarde el concurso.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const storageStatus = getStorageStatus(storageInfo);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Almacenamiento del Álbum
        </CardTitle>
        <CardDescription>
          Gestión del almacenamiento de fotos del concurso "{contestTitle}"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Storage Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Estado del almacenamiento</Label>
            <div className="flex items-center gap-2">
              <Badge variant={storageStatus.variant}>
                {storageStatus.message}
              </Badge>
              {storageStatus.status === 'expired' && (
                <Clock className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Plan Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Plan del organizador</Label>
            <p className="text-sm text-muted-foreground capitalize">
              {storageInfo.organizer_plan}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">Precio de renovación</Label>
            <p className="text-sm font-semibold">
              {formatPrice(storageInfo.renewal_price_cents)}/año
            </p>
          </div>
        </div>

        <Separator />

        {/* Auto-renewal Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-renewal" className="text-sm font-medium">
                Renovación automática
              </Label>
              <p className="text-xs text-muted-foreground">
                Renovar automáticamente antes del vencimiento
              </p>
            </div>
            <Switch
              id="auto-renewal"
              checked={storageInfo.auto_renewal_enabled}
              onCheckedChange={handleAutoRenewalToggle}
              disabled={isUpdating}
            />
          </div>

          {storageInfo.auto_renewal_enabled && (
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Se cobrará automáticamente {formatPrice(storageInfo.renewal_price_cents)} 
                7 días antes del vencimiento.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Descargar álbum
          </Button>
          <Button size="sm" className="flex-1">
            <CreditCard className="h-4 w-4 mr-2" />
            Extender almacenamiento
          </Button>
        </div>

        {/* Information Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Recordatorio:</strong> Se enviará un aviso por email 30 días antes del vencimiento 
            y un recordatorio final 7 días antes. El álbum se puede descargar en cualquier momento.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AlbumStorageInfo;
