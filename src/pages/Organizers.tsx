
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Camera, 
  Building, 
  Mail, 
  Phone, 
  User,
  FileText,
  Check,
  Tag,
  Info,
  Gift,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LocationCombobox from "@/components/admin/dashboard/contests/LocationCombobox";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  phone: z.string().min(9, {
    message: "Por favor, introduce un número de teléfono válido.",
  }),
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  eventDescription: z.string().min(20, {
    message: "La descripción debe tener al menos 20 caracteres.",
  }),
  photoType: z.string({
    required_error: "Por favor, selecciona el tipo de fotografía.",
  }),
  location: z.string().min(2, {
    message: "Por favor, introduce una ubicación válida.",
  }),
  eventStartDate: z.string({
    required_error: "Por favor, selecciona una fecha de inicio.",
  }),
  eventEndDate: z.string({
    required_error: "Por favor, selecciona una fecha de fin.",
  }),
  votingEndDate: z.string({
    required_error: "Por favor, selecciona una fecha de fin de votación.",
  }),
  planType: z.string({
    required_error: "Por favor, selecciona un plan.",
  }),
  maxDistance: z.string({
    required_error: "Por favor, selecciona una distancia máxima.",
  }),
  rewardVoters: z.boolean().default(false),
});

const Organizers = () => {
  const [selectedTab, setSelectedTab] = useState("info");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      eventDescription: "",
      photoType: "",
      location: "",
      eventStartDate: "",
      eventEndDate: "",
      votingEndDate: "",
      planType: "",
      maxDistance: "5",
      rewardVoters: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    if (!user) {
      // If not logged in, prompt user to log in before submitting
      toast({
        title: "Inicio de sesión requerido",
        description: "Por favor, inicia sesión para enviar tu solicitud.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Solicitud enviada",
      description: "Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.",
    });
    
    form.reset();
  }
  
  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "29€",
      description: "Ideal para eventos pequeños y locales",
      features: [
        "Hasta 300 participantes",
        "1 concurso fotográfico",
        "Publicidad básica en la app",
        "Derechos de 1 foto ganadora"
      ]
    },
    {
      id: "pro",
      name: "Profesional",
      price: "79€",
      description: "Perfecto para eventos medianos y empresas",
      features: [
        "Hasta 1000 participantes",
        "3 concursos fotográficos",
        "Publicidad destacada en la app",
        "Derechos de 3 fotos ganadoras de cada concurso",
        "Banner promocional en la app"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "149€",
      description: "Para grandes eventos y marcas reconocidas",
      features: [
        "Participantes ilimitados",
        "5 concursos fotográficos",
        "Publicidad premium en toda la app",
        "Derechos de las 9 mejores fotos",
        "Banner destacado en página principal",
        "Notificaciones push personalizadas"
      ]
    }
  ];
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    form.setValue("planType", planId);
    setSelectedTab("form");
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Organizadores
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Impulsa tu evento o empresa a través de nuestros concursos fotográficos. Conecta con tu audiencia de una forma única y visual.
          </motion.p>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="info">Planes y Beneficios</TabsTrigger>
            <TabsTrigger value="form">Solicitud de Evento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.id} className={`border-2 hover:shadow-lg transition-all ${selectedPlan === plan.id ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <p className="mt-2">{plan.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      Seleccionar Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                ¿Por qué organizar con nosotros?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Contenido generado por usuarios</h4>
                  <p className="text-muted-foreground text-sm">Recibe cientos de fotos únicas y auténticas de tu evento o ubicación.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Visibilidad de marca</h4>
                  <p className="text-muted-foreground text-sm">Promociona tu empresa o evento a miles de usuarios interesados en tu sector.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Engagement con usuarios</h4>
                  <p className="text-muted-foreground text-sm">Crea una conexión emocional con tus clientes a través de la participación activa.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">Contenido para marketing</h4>
                  <p className="text-muted-foreground text-sm">Obtén derechos sobre las mejores fotos para usar en tus futuras campañas.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="form" className="mt-8">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitud de creación de evento</CardTitle>
                  <CardDescription>
                    Completa el formulario para solicitar un concurso fotográfico para tu evento o negocio.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <User className="mr-2 h-5 w-5" />
                          Información personal
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Tu nombre completo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dirección de email</FormLabel>
                                <FormControl>
                                  <Input placeholder="tu@email.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono de contacto</FormLabel>
                              <FormControl>
                                <Input placeholder="+34 600 000 000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Building className="mr-2 h-5 w-5" />
                          Información de la empresa
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre de la empresa/organización</FormLabel>
                              <FormControl>
                                <Input placeholder="Nombre de tu empresa" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <FileText className="mr-2 h-5 w-5" />
                          Detalles del evento
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="eventDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descripción del evento</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe tu evento o lo que quieres promocionar..." 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Ubicación
                                <span className="text-xs font-normal text-muted-foreground">(requerido)</span>
                              </FormLabel>
                              <FormControl>
                                <LocationCombobox 
                                  value={field.value} 
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormDescription>
                                Especifica la ubicación exacta del evento o la zona para las fotografías
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="photoType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de fotos esperadas</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el tipo de fotografía" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="location">Lugares/Monumentos</SelectItem>
                                  <SelectItem value="people">Personas/Eventos</SelectItem>
                                  <SelectItem value="product">Productos/Servicios</SelectItem>
                                  <SelectItem value="activity">Actividades/Actuaciones</SelectItem>
                                  <SelectItem value="nature">Naturaleza/Paisajes</SelectItem>
                                  <SelectItem value="other">Otro tipo</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="maxDistance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Distancia máxima para subir fotos</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona la distancia máxima" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 km</SelectItem>
                                  <SelectItem value="5">5 km</SelectItem>
                                  <SelectItem value="10">10 km</SelectItem>
                                  <SelectItem value="25">25 km</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Los usuarios solo podrán subir fotos dentro de esta distancia desde la ubicación del evento
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="eventStartDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fecha de inicio</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="eventEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fecha de fin</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="votingEndDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fecha fin de votación</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Puede ser durante o después del evento
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Gift className="mr-2 h-5 w-5" />
                          Configuración de premios
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="rewardVoters"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Premiar a los votantes</FormLabel>
                                <FormDescription>
                                  Además de premiar a la mejor foto, se premiará a un votante aleatorio que haya participado en el concurso.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <Tag className="mr-2 h-5 w-5" />
                          Plan seleccionado
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="planType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plan</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || selectedPlan || ""}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un plan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="basic">Básico - 29€</SelectItem>
                                  <SelectItem value="pro">Profesional - 79€</SelectItem>
                                  <SelectItem value="premium">Premium - 149€</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Enviar solicitud</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Organizers;
