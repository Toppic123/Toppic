
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
    name: "Basic",
    price: "29€",
    description: "Ideal for small and local events",
    features: [
      "Up to 300 participants",
      "1 photo contest",
      "Basic advertising in the app",
      "Rights to 1 winning photo"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    name: "Professional",
    price: "79€",
    description: "Perfect for medium events and companies",
    features: [
      "Up to 1000 participants",
      "3 photo contests",
      "Featured advertising in the app",
      "Rights to 3 winning photos from each contest",
      "Promotional banner in the app"
    ],
    recommended: true,
    buttonText: "Select Plan",
    buttonVariant: "default"
  },
  {
    name: "Premium",
    price: "149€",
    description: "For large events and recognized brands",
    features: [
      "Unlimited participants",
      "5 photo contests",
      "Premium advertising throughout the app",
      "Rights to the 9 best photos",
      "Featured banner on main page",
      "Custom push notifications"
    ],
    buttonText: "Contact Us",
    buttonVariant: "secondary"
  }
];

const PricingPlans = ({ plans = defaultPlans, onSelectPlan }: PricingPlansProps) => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Plans</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All include access to our AI-powered voting system.
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
                Recommended
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/ event</span>
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
                {plan.buttonText || "Select"}
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
                Need a custom plan?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Contact us to create a customized plan for your specific needs.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PricingPlans;
