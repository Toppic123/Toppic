
import { Check, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
}

interface PricingPlansProps {
  plans: PricingPlan[];
  onSelectPlan?: (plan: PricingPlan) => void;
  onCustomPlanRequest?: () => void;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Básico",
    price: "89€",
    description: "Ideal para eventos pequeños y locales",
    features: [
      "Hasta 300 participantes",
      "1 concurso de fotos",
      "Publicidad básica en la app",
      "Derechos de 1 foto ganadora",
      "1 año de almacenamiento incluido",
      "Renovación: 10€/año"
    ],
    buttonText: "Comenzar",
    buttonVariant: "outline"
  },
  {
    name: "Profesional",
    price: "149€",
    description: "Perfecto para eventos medianos y empresas",
    features: [
      "Hasta 1000 participantes",
      "3 concursos de fotos",
      "Publicidad destacada en la app",
      "Derechos de 3 fotos ganadoras de cada concurso",
      "Banner promocional en la app",
      "1 año de almacenamiento incluido",
      "Renovación: 15€/año"
    ],
    recommended: true,
    buttonText: "Seleccionar Plan",
    buttonVariant: "default"
  },
  {
    name: "Premium",
    price: "199€",
    description: "Para eventos grandes y marcas reconocidas",
    features: [
      "Participantes ilimitados",
      "5 concursos de fotos",
      "Publicidad premium en toda la app",
      "Derechos de las 9 mejores fotos",
      "Banner destacado en página principal",
      "Notificaciones push personalizadas",
      "1 año de almacenamiento incluido",
      "Renovación: 20€/año"
    ],
    buttonText: "Contactanos",
    buttonVariant: "secondary"
  }
];

const PricingPlans = ({ plans = defaultPlans, onSelectPlan, onCustomPlanRequest }: PricingPlansProps) => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nuestros Planes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Elige el plan que mejor se adapte a tus necesidades.
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 max-w-4xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Almacenamiento incluido:</strong> Todos los planes incluyen 1 año de almacenamiento gratuito. 
            Después del primer año, puedes renovar por una tarifa anual reducida según tu plan.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col h-full ${plan.recommended ? 'border-primary shadow-md relative' : ''}`}
          >
            {plan.recommended && (
              <Badge className="absolute -top-2 right-4 bg-primary">
                Recomendado
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1 text-lg">/ evento</span>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant={plan.buttonVariant || "default"} 
                className="w-full text-lg py-6"
                onClick={() => onSelectPlan && onSelectPlan(plan)}
              >
                {plan.buttonText || "Seleccionar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="link" 
                className="text-base text-muted-foreground"
                onClick={onCustomPlanRequest}
              >
                <Info className="h-4 w-4 mr-1" />
                ¿Necesitas un plan personalizado?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Contáctanos para crear un plan personalizado para tus necesidades específicas.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PricingPlans;
