
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, Trophy, Calendar, Plus, Mail, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Organizers = () => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerCompany, setOrganizerCompany] = useState("");

  const handleOrganizerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    setTimeout(() => {
      toast({
        title: "Registro exitoso",
        description: "Tu solicitud como organizador ha sido enviada. Te contactaremos pronto.",
      });
      setIsRegistering(false);
      setOrganizerName("");
      setOrganizerEmail("");
      setOrganizerCompany("");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ORGANIZADORES
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Únete a nuestra plataforma como organizador profesional y crea experiencias fotográficas únicas
          </p>
        </div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 max-w-4xl mx-auto">
            <Building className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">¿Quieres organizar concursos?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conecta con miles de fotógrafos apasionados y crea concursos que inspiren
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-xl">
                  <Plus className="h-5 w-5 mr-2" />
                  Registrarse como Organizador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Registro de Organizador
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleOrganizerRegistration} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizer-name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre completo
                    </Label>
                    <Input
                      id="organizer-name"
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="organizer-email"
                      type="email"
                      value={organizerEmail}
                      onChange={(e) => setOrganizerEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer-company" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Empresa/Organización
                    </Label>
                    <Input
                      id="organizer-company"
                      value={organizerCompany}
                      onChange={(e) => setOrganizerCompany(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isRegistering}>
                    {isRegistering ? "Enviando solicitud..." : "Enviar Solicitud"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6">
              <Trophy className="h-12 w-12 text-amber-600 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Panel de Control Profesional</h3>
            <p className="text-muted-foreground">
              Herramientas avanzadas para gestionar tus concursos de manera eficiente
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 mb-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Comunidad Activa</h3>
            <p className="text-muted-foreground">
              Acceso a una red de fotógrafos profesionales y aficionados
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 mb-6">
              <Building className="h-12 w-12 text-green-600 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visibilidad Máxima</h3>
            <p className="text-muted-foreground">
              Promociona tu marca y eventos a nivel nacional e internacional
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">La plataforma líder en concursos fotográficos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Organizadores activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Concursos creados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Participantes registrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">€500K+</div>
              <div className="text-muted-foreground">En premios otorgados</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Organizers;
