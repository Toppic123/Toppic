
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Trophy, Calendar, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Organizers = () => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerCompany, setOrganizerCompany] = useState("");

  // Mock data for organizers
  const organizers = [
    {
      id: 1,
      name: "PhotoEvents Madrid",
      company: "Eventos Fotográficos S.L.",
      activeContests: 3,
      totalContests: 15,
      participants: 1250,
      since: "2022"
    },
    {
      id: 2,
      name: "Barcelona Photo Club",
      company: "Club Fotográfico BCN",
      activeContests: 2,
      totalContests: 8,
      participants: 890,
      since: "2023"
    },
    {
      id: 3,
      name: "Natura Shots",
      company: "Fotografía Natural",
      activeContests: 1,
      totalContests: 12,
      participants: 650,
      since: "2021"
    }
  ];

  const handleOrganizerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate registration process
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
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Organizadores de Concursos</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conecta con los mejores organizadores de concursos fotográficos o únete como organizador profesional
          </p>
        </div>

        {/* Registration CTA */}
        <div className="mb-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Building className="h-6 w-6" />
                ¿Quieres organizar concursos?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Únete a nuestra plataforma como organizador y crea concursos fotográficos profesionales
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Registrarse como Organizador
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Registro de Organizador</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleOrganizerRegistration} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizer-name">Nombre completo</Label>
                      <Input
                        id="organizer-name"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizer-email">Email</Label>
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
                      <Label htmlFor="organizer-company">Empresa/Organización</Label>
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
            </CardContent>
          </Card>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizers.map((organizer) => (
            <motion.div
              key={organizer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: organizer.id * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{organizer.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{organizer.company}</p>
                    </div>
                    <Badge variant="secondary">
                      Desde {organizer.since}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="font-medium">{organizer.activeContests}</p>
                        <p className="text-muted-foreground">Activos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium">{organizer.totalContests}</p>
                        <p className="text-muted-foreground">Total</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">{organizer.participants.toLocaleString()}</p>
                        <p className="text-muted-foreground">Participantes totales</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Beneficios de ser Organizador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <Trophy className="h-8 w-8 text-amber-500 mx-auto md:mx-0" />
                  <h3 className="font-semibold">Panel de Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Accede a herramientas profesionales para gestionar tus concursos
                  </p>
                </div>
                <div className="space-y-2">
                  <Users className="h-8 w-8 text-blue-500 mx-auto md:mx-0" />
                  <h3 className="font-semibold">Comunidad Activa</h3>
                  <p className="text-sm text-muted-foreground">
                    Conecta con miles de fotógrafos apasionados
                  </p>
                </div>
                <div className="space-y-2">
                  <Building className="h-8 w-8 text-green-500 mx-auto md:mx-0" />
                  <h3 className="font-semibold">Visibilidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Promociona tu marca y eventos a nivel nacional
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Organizers;
