
import { motion } from "framer-motion";
import { Check, Zap, Award, Building, Camera, Crown, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Plan feature component
const PlanFeature = ({ included, text }: { included: boolean; text: string }) => (
  <div className="flex items-start gap-2">
    {included ? (
      <Check className="h-4 w-4 text-green-500 mt-0.5" />
    ) : (
      <div className="h-4 w-4" />
    )}
    <span className={included ? "text-foreground" : "text-muted-foreground line-through"}>
      {text}
    </span>
  </div>
);

const Organizers = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-7xl mx-auto py-24 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Crea concursos fotográficos increíbles
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Organiza concursos para cualquier tipo de evento o lugar de interés. Obtén 
          fotografías de calidad y aumenta la visibilidad de tu negocio.
        </p>
      </div>

      <Tabs defaultValue="organizers" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="organizers" className="px-8">Organizadores</TabsTrigger>
            <TabsTrigger value="sponsors" className="px-8">Colaboradores</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="organizers">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Básico</CardTitle>
                    <CardDescription>Para eventos pequeños</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€29</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Hasta 3 concursos simultáneos" />
                <PlanFeature included={true} text="Hasta 100 participantes por concurso" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={false} text="Derechos sobre las 5 mejores fotos" />
                <PlanFeature included={false} text="Promoción destacada en el mapa" />
                <PlanFeature included={false} text="Analytics avanzados" />
                <PlanFeature included={false} text="Soporte prioritario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=organizer&plan=basic">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-md">
                POPULAR
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Profesional</CardTitle>
                    <CardDescription>Para eventos medianos</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€79</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Hasta 10 concursos simultáneos" />
                <PlanFeature included={true} text="Hasta 500 participantes por concurso" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={true} text="Derechos sobre las 5 mejores fotos" />
                <PlanFeature included={true} text="Promoción destacada en el mapa" />
                <PlanFeature included={false} text="Analytics avanzados" />
                <PlanFeature included={false} text="Soporte prioritario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=organizer&plan=pro">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Enterprise</CardTitle>
                    <CardDescription>Para grandes eventos</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€199</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Concursos ilimitados" />
                <PlanFeature included={true} text="Participantes ilimitados" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={true} text="Derechos sobre las 5 mejores fotos" />
                <PlanFeature included={true} text="Promoción destacada en el mapa" />
                <PlanFeature included={true} text="Analytics avanzados" />
                <PlanFeature included={true} text="Soporte prioritario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=organizer&plan=enterprise">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sponsors">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Sponsor Plan */}
            <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Patrocinador Local</CardTitle>
                    <CardDescription>Promoción en eventos locales</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€19</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Logo en hasta 3 concursos" />
                <PlanFeature included={true} text="Menciones en notificaciones" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={false} text="Derechos sobre mejores fotos" />
                <PlanFeature included={false} text="Destacado en mapa de eventos" />
                <PlanFeature included={false} text="Promoción en perfil de usuario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=sponsor&plan=local">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Sponsor Plan */}
            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-md">
                POPULAR
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Patrocinador Regional</CardTitle>
                    <CardDescription>Mayor alcance y visibilidad</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€49</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Logo en hasta 10 concursos" />
                <PlanFeature included={true} text="Menciones en notificaciones" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={true} text="Derechos sobre 3 mejores fotos" />
                <PlanFeature included={true} text="Destacado en mapa de eventos" />
                <PlanFeature included={false} text="Promoción en perfil de usuario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=sponsor&plan=regional">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Elite Sponsor Plan */}
            <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Patrocinador Nacional</CardTitle>
                    <CardDescription>Máxima exposición de marca</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€129</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanFeature included={true} text="Logo en concursos ilimitados" />
                <PlanFeature included={true} text="Menciones destacadas" />
                <PlanFeature included={true} text="Derechos sobre la foto ganadora" />
                <PlanFeature included={true} text="Derechos sobre 10 mejores fotos" />
                <PlanFeature included={true} text="Destacado en mapa de eventos" />
                <PlanFeature included={true} text="Promoción en perfil de usuario" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/register?type=sponsor&plan=national">
                    Comenzar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Preguntas frecuentes</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">¿Qué tipos de eventos puedo organizar?</h3>
            <p className="text-muted-foreground">
              Puedes organizar concursos fotográficos para cualquier tipo de evento (conciertos, competiciones deportivas, 
              festivales) o lugares de interés turístico (monumentos, plazas, parques).
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">¿Cómo funciona la geolocalización?</h3>
            <p className="text-muted-foreground">
              Los participantes solo pueden subir fotos si están dentro del radio geográfico definido para el 
              evento (normalmente 1km). Esto garantiza que las fotos sean auténticas y tomadas durante el evento.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">¿Qué derechos tengo sobre las fotografías?</h3>
            <p className="text-muted-foreground">
              Dependiendo de tu plan, obtendrás los derechos sobre la foto ganadora o sobre las mejores fotos 
              del concurso. Podrás utilizarlas en tu web, redes sociales y material promocional.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">¿Puedo ofrecer premios personalizados?</h3>
            <p className="text-muted-foreground">
              Sí, puedes definir tus propios premios para los ganadores. Estos premios aparecerán en la 
              descripción del concurso y atraerán a más participantes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Crea tu primer concurso fotográfico hoy mismo y descubre el poder de las fotografías auténticas
          generadas por los asistentes a tus eventos.
        </p>
        <Button size="lg" asChild>
          <Link to="/register?type=organizer">Registrarse como organizador</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default Organizers;
