
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Comprobar que todos los campos están completos
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
        throw new Error("Por favor, completa todos los campos.");
      }
      
      // Guardar el mensaje en la base de datos
      const { error } = await supabase
        .from('support_messages')
        .insert([
          { 
            name: `${firstName} ${lastName}`,
            email,
            subject: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
            message,
            status: 'pending'
          }
        ]);
        
      if (error) throw error;
      
      // Llamar a la función edge para enviar la notificación por email usando el cliente Supabase
      const { error: notificationError } = await supabase.functions.invoke(
        'send-support-notification',
        {
          body: {
            name: `${firstName} ${lastName}`,
            email,
            subject: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
            message
          }
        }
      );
      
      if (notificationError) {
        console.warn("No se pudo enviar la notificación al administrador, pero el mensaje se guardó correctamente.", notificationError);
      }
      
      toast({
        title: "Mensaje Enviado",
        description: "Hemos recibido tu mensaje. Te responderemos pronto.",
      });
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting support request:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-lg mx-auto py-12 px-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Soporte</CardTitle>
          <CardDescription>
            Estamos aquí para ayudarte. Envíanos tu consulta y responderemos lo antes posible.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Los mensajes de soporte se envían directamente al administrador del sistema. 
              Los administradores recibirán una notificación inmediata y podrán responder a tu consulta.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input 
                  id="firstName" 
                  placeholder="Tu nombre" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input 
                  id="lastName" 
                  placeholder="Tu apellido" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="tu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tu consulta</Label>
              <Textarea 
                id="message" 
                placeholder="Describe tu problema o pregunta..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Support;
