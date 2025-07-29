
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
    price: "69€",
    description: "Ideal para eventos pequeños",
    features: [
      "Hasta 100 participantes",
      "1 concurso fotográfico",
      "Derechos sobre la foto ganadora"
    ],
    buttonText: "SELECCIONAR PLAN",
    buttonVariant: "outline"
  },
  {
    name: "Profesional",
    price: "149€",
    description: "Perfecto para eventos medianos y empresas",
    features: [
      "Hasta 500 participantes",
      "1 concurso fotográfico",
      "Publicidad en la app (banners en el concurso)",
      "Derechos sobre las 3 mejores fotos"
    ],
    recommended: true,
    buttonText: "SELECCIONAR PLAN",
    buttonVariant: "default"
  },
  {
    name: "Premium",
    price: "299€",
    description: "Para grandes eventos y marcas reconocidas",
    features: [
      "Participantes ilimitados",
      "1 concurso fotográfico",
      "Publicidad en la app",
      "Derechos sobre las 5 mejores fotos"
    ],
    buttonText: "SELECCIONAR PLAN",
    buttonVariant: "secondary"
  }
];

const PricingPlans = ({ plans = defaultPlans, onSelectPlan, onCustomPlanRequest }: PricingPlansProps) => {
  return (
    <div className="container mx-auto py-12">      
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


      {/* Usage Rights Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          <strong>Derechos de uso:</strong> Las fotografías que recibirás serán de uso editorial si aparecen personas retratadas 
          y de uso comercial si no aparecen personas retratadas (debido a nuestra política de privacidad).
        </p>
      </div>

      <div className="mt-8 text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="link" 
                className="text-xl text-muted-foreground font-medium"
                onClick={onCustomPlanRequest}
              >
                <Info className="h-5 w-5 mr-2" />
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

      {/* Important notice for organizers */}
      <div className="mt-6 p-4 border border-[#f46464] rounded-lg" style={{ backgroundColor: '#f46464' }}>
        <p className="text-white text-center font-medium">
          <strong>Importante:</strong> Estas tarifas no incluyen la recompensa que debe ofrecer obligatoriamente el organizador
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
