
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
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Básico",
    price: "29€",
    description: "Ideal para eventos pequeños y locales",
    features: [
      "Hasta 300 participantes",
      "1 concurso fotográfico",
      "Publicidad básica en la app",
      "Derechos sobre 1 foto ganadora"
    ],
    buttonText: "Empezar",
    buttonVariant: "outline"
  },
  {
    name: "Profesional",
    price: "79€",
    description: "Perfecto para eventos medianos y empresas",
    features: [
      "Hasta 1000 participantes",
      "3 concursos fotográficos",
      "Publicidad destacada en la app",
      "Derechos sobre 3 fotos ganadoras de cada concurso",
      "Banner promocional en la app"
    ],
    recommended: true,
    buttonText: "Seleccionar plan",
    buttonVariant: "default"
  },
  {
    name: "Premium",
    price: "149€",
    description: "Para grandes eventos y marcas reconocidas",
    features: [
      "Participantes ilimitados",
      "5 concursos fotográficos",
      "Publicidad premium en toda la app",
      "Derechos sobre las 9 mejores fotos",
      "Banner destacado en página principal",
      "Notificaciones push personalizadas"
    ],
    buttonText: "Contactar",
    buttonVariant: "secondary"
  }
];

const PricingPlans = ({ plans = defaultPlans, onSelectPlan }: PricingPlansProps) => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nuestros planes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades. Todos incluyen acceso a nuestro sistema de votación con IA.
        </p>
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
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/ evento</span>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant={plan.buttonVariant || "default"} 
                className="w-full"
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
              <Button variant="link" className="text-sm text-muted-foreground">
                <Info className="h-4 w-4 mr-1" />
                ¿Necesitas un plan personalizado?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Contacta con nosotros para crear un plan personalizado para tus necesidades específicas.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PricingPlans;
