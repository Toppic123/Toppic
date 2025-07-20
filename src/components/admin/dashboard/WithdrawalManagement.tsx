import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock, Euro, User } from "lucide-react";

interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  payment_method: string;
  payment_details: any;
  admin_notes: string | null;
  requested_at: string;
  processed_at: string | null;
  profiles?: {
    name: string;
    email: string;
  } | null;
}

const WithdrawalManagement = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadWithdrawalRequests();
  }, []);

  const loadWithdrawalRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('withdrawal_requests')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests((data as any) || []);
    } catch (error) {
      console.error('Error loading withdrawal requests:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes de retiro",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest || !newStatus) return;

    setIsProcessing(true);

    try {
      // Update withdrawal request status
      const { error: updateError } = await supabase
        .from('withdrawal_requests')
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          processed_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.id);

      if (updateError) throw updateError;

      // If approved, process the withdrawal
      if (newStatus === 'approved') {
        const { error: processError } = await supabase.rpc('process_withdrawal', {
          p_request_id: selectedRequest.id,
          p_amount: selectedRequest.amount,
          p_user_id: selectedRequest.user_id
        });

        if (processError) {
          console.error('Error processing withdrawal:', processError);
          // Revert status if processing failed
          await supabase
            .from('withdrawal_requests')
            .update({ status: 'pending', processed_at: null })
            .eq('id', selectedRequest.id);
          
          throw new Error('Error procesando el retiro');
        }
      }

      toast({
        title: "Estado actualizado",
        description: `La solicitud ha sido ${newStatus === 'approved' ? 'aprobada y procesada' : newStatus === 'rejected' ? 'rechazada' : 'actualizada'}`
      });

      loadWithdrawalRequests();
      setSelectedRequest(null);
      setNewStatus("");
      setAdminNotes("");
    } catch (error) {
      console.error('Error updating withdrawal request:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la solicitud",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobado';
      case 'completed':
        return 'Completado';
      case 'rejected':
        return 'Rechazado';
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'approved':
      case 'completed':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <Card>
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Retiros</h2>
          <p className="text-muted-foreground">
            Administra las solicitudes de retiro de los usuarios
          </p>
        </div>
        <Badge variant="outline">
          {requests.filter(r => r.status === 'pending').length} pendientes
        </Badge>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No hay solicitudes de retiro</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(request.status)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {request.profiles?.name || 'Usuario'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({request.profiles?.email})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-bold">
                        <Euro className="h-5 w-5" />
                        {request.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Solicitado: {new Date(request.requested_at).toLocaleDateString()}
                        {request.processed_at && (
                          <span> • Procesado: {new Date(request.processed_at).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Método: {request.payment_method === 'bank_transfer' ? 'Transferencia bancaria' : 'PayPal'}
                      </div>
                      {request.admin_notes && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Notas: {request.admin_notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusVariant(request.status)}>
                      {getStatusText(request.status)}
                    </Badge>
                    {request.status === 'pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAdminNotes(request.admin_notes || "");
                            }}
                          >
                            Procesar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Procesar Solicitud de Retiro</DialogTitle>
                            <DialogDescription>
                              Usuario: {request.profiles?.name} - €{request.amount.toFixed(2)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Nuevo Estado</label>
                              <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approved">Aprobar</SelectItem>
                                  <SelectItem value="rejected">Rechazar</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Notas del administrador</label>
                              <Textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Notas opcionales sobre la decisión..."
                                rows={3}
                              />
                            </div>
                            {request.payment_details && (
                              <div>
                                <label className="text-sm font-medium">Detalles de pago</label>
                                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                  {typeof request.payment_details === 'object' 
                                    ? JSON.stringify(request.payment_details, null, 2)
                                    : request.payment_details
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button 
                              onClick={handleStatusUpdate}
                              disabled={!newStatus || isProcessing}
                            >
                              {isProcessing ? 'Procesando...' : 'Actualizar Estado'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WithdrawalManagement;