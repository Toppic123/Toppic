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
  MapPin,
  ChartBar,
  Award,
  Users
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

  const benefitCards = [
    {
      icon: Camera,
      title: "Contenido auténtico",
      description: "Recibe fotos únicas y auténticas de tu evento o ubicación"
    },
    {
      icon: Building,
      title: "Visibilidad de marca",
      description: "Promociona tu empresa a miles de usuarios interesados"
    },
    {
      icon: Users,
      title: "Engagement efectivo",
      description: "Crea conexión emocional con tu audiencia"
    },
    {
      icon: Award,
      title: "Marketing content",
      description: "Obtén derechos sobre las mejores fotos para tus campañas"
    }
  ];
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Organizadores</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Impulsa tu evento o empresa a través de nuestros concursos fotográficos. Conecta con tu audiencia de una forma única y visual.
          </p>
        </motion.div>
        
        {/* ¿Por qué organizar con nosotros? - colocado antes y con mejor diseño */}
        <section className="py-16 mb-12 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">¿Por qué organizar con nosotros?</h2>
            <div className="h-1 bg-gradient-to-r from-primary to-blue-600 rounded w-24 mb-6 mx-auto"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre las ventajas de crear concursos fotográficos con nuestra plataforma
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                    <card.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Re-usando la misma sección de organizador de la homepage pero con diseño mejorado */}
        <section className="py-16 mb-12 border-t border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Personas disfrutando en un evento cultural" 
                  className="rounded-xl w-full object-cover shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 p-8 rounded-2xl text-white font-medium shadow-2xl border border-white/20 backdrop-blur-sm min-w-[240px]">
                  <p className="text-2xl font-bold mb-2">¡Impulsa tu marca!</p>
                  <span className="text-lg text-blue-100">Crece con nosotros</span>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">¿Eres organizador?</h2>
              <div className="h-1 bg-primary rounded w-24 mb-8 mx-auto lg:mx-0"></div>
              
              <div className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                <p className="text-2xl font-bold mb-2">¡Impulsa tu marca!</p>
                <span className="text-lg">Crece con nosotros</span>
              </div>
              
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg"
                onClick={() => setSelectedTab("form")}
              >
                Descubre nuestros planes
              </Button>
            </motion.div>
          </div>
        </section>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="info">Planes y Beneficios</TabsTrigger>
            <TabsTrigger value="form">Solicitud de Evento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-8">
            {/* Plans section - keep existing code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-2 hover:shadow-lg transition-all ${selectedPlan === plan.id ? 'border-primary' : 'border-border'} h-full`}>
                    <CardHeader>
                      <div className="text-center">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                        </div>
                      </div>
                      <CardDescription className="text-center">
                        <p className="mt-2">{plan.description}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <ul className="space-y-2 flex-grow mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-auto" 
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Seleccionar Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
