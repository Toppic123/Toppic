
import { useState, useEffect } from "react";
import { Eye, CheckCircle, Bell, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Definición del tipo para los mensajes de soporte
interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
  status: "pending" | "resolved";
}

const SupportMessagesManagement = () => {
  const { toast } = useToast();
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<SupportMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewMessageDialogOpen, setIsViewMessageDialogOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  
  // Cargar mensajes de soporte de la base de datos
  useEffect(() => {
    const fetchSupportMessages = async () => {
      setIsLoading(true);
      try {
        // Using the any type to bypass TypeScript checking for now
        const { data, error } = await (supabase as any)
          .from('support_messages')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const formattedData = data.map((msg: any) => ({
            id: msg.id,
            name: msg.name,
            email: msg.email,
            subject: msg.subject,
            message: msg.message,
            date: new Date(msg.created_at),
            status: msg.status as "pending" | "resolved"
          }));
          
          setSupportMessages(formattedData);
          setFilteredMessages(formattedData);
          
          // Verificar si hay mensajes pendientes
          const pendingMessages = formattedData.filter(msg => msg.status === 'pending');
          setHasNewMessages(pendingMessages.length > 0);
          
          if (pendingMessages.length > 0) {
            toast({
              title: `${pendingMessages.length} mensajes pendientes`,
              description: "Tienes mensajes de soporte sin resolver.",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching support messages:", error);
        toast({
          title: "Error al cargar mensajes",
          description: "No se pudieron cargar los mensajes de soporte.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupportMessages();
    
    // Configurar suscripción a cambios en tiempo real
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'support_messages' 
      }, (payload: any) => {
        console.log('Nuevo mensaje recibido:', payload);
        
        const newMessage = {
          id: payload.new.id,
          name: payload.new.name,
          email: payload.new.email,
          subject: payload.new.subject,
          message: payload.new.message,
          date: new Date(payload.new.created_at),
          status: payload.new.status as "pending" | "resolved"
        };
        
        setSupportMessages(prev => [newMessage, ...prev]);
        setFilteredMessages(prev => [newMessage, ...prev]);
        setHasNewMessages(true);
        
        toast({
          title: "Nuevo mensaje de soporte",
          description: `De: ${payload.new.name}`,
        });
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [toast]);
  
  // Format date function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Handle support message search
  const handleMessageSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredMessages(supportMessages);
      return;
    }
    const filtered = supportMessages.filter(message => 
      message.name.toLowerCase().includes(query.toLowerCase()) ||
      message.email.toLowerCase().includes(query.toLowerCase()) ||
      message.subject.toLowerCase().includes(query.toLowerCase()) ||
      message.message.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  // Handle view support message
  const handleViewMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsViewMessageDialogOpen(true);
  };

  // Handle mark support message as resolved
  const handleMarkAsResolved = async (messageId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('support_messages')
        .update({ status: 'resolved' })
        .eq('id', messageId);
        
      if (error) throw error;
      
      // Update local state immediately with resolved status
      const updateMessages = (messages: SupportMessage[]) => 
        messages.map(m => m.id === messageId ? { ...m, status: "resolved" as const } : m);
      
      setSupportMessages(updateMessages);
      setFilteredMessages(updateMessages);
      
      // Check if there are still pending messages after this update
      const updatedMessages = supportMessages.map(m => m.id === messageId ? { ...m, status: "resolved" as const } : m);
      const stillHasPending = updatedMessages.some(m => m.status === 'pending');
      setHasNewMessages(stillHasPending);
      
      toast({
        title: "Mensaje marcado como resuelto",
        description: "El mensaje de soporte ha sido marcado como resuelto.",
      });
      
      setIsViewMessageDialogOpen(false);
    } catch (error) {
      console.error("Error updating message status:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del mensaje.",
        variant: "destructive"
      });
    }
  };
  
  // Get selected message details
  const selectedMessage = supportMessages.find(m => m.id === selectedMessageId);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Mensajes de Soporte</h2>
        {hasNewMessages && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            <span>Mensajes pendientes</span>
          </Badge>
        )}
      </div>
      
      <div className="relative w-full mb-4">
        <Input 
          placeholder="Buscar mensajes..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => handleMessageSearch(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <Alert>
          <AlertDescription>
            {searchQuery ? 
              "No se encontraron mensajes que coincidan con tu búsqueda." : 
              "No hay mensajes de soporte. Cuando los usuarios envíen consultas, aparecerán aquí."}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left">Remitente</th>
                <th className="p-3 text-left">Asunto</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map(message => (
                <tr key={message.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-xs text-muted-foreground">{message.email}</p>
                    </div>
                  </td>
                  <td className="p-3">{message.subject}</td>
                  <td className="p-3">{formatDate(message.date)}</td>
                  <td className="p-3">
                    <Badge variant={message.status === "pending" ? "outline" : "secondary"}>
                      {message.status === "pending" ? "Pendiente" : "Resuelto"}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleViewMessage(message.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Support Message Dialog */}
      <Dialog open={isViewMessageDialogOpen} onOpenChange={setIsViewMessageDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mensaje de Soporte</DialogTitle>
            <DialogDescription>
              Detalles del mensaje seleccionado.
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Remitente</Label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Fecha</Label>
                <p className="font-medium">{formatDate(selectedMessage.date)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Asunto</Label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Mensaje</Label>
                <div className="mt-1 p-3 bg-muted/30 rounded-md">
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Label className="text-sm text-muted-foreground mr-2">Estado:</Label>
                <Badge variant={selectedMessage.status === "pending" ? "outline" : "secondary"}>
                  {selectedMessage.status === "pending" ? "Pendiente" : "Resuelto"}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewMessageDialogOpen(false)}>Cerrar</Button>
            {selectedMessage && selectedMessage.status === "pending" && (
              <Button onClick={() => handleMarkAsResolved(selectedMessage.id)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como resuelto
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportMessagesManagement;
