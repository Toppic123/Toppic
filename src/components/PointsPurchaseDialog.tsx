import React, { useState } from 'react';
import { ShoppingCart, Star, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserPoints } from '@/hooks/useUserPoints';

interface PointsPurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const pointsPackages = [
  {
    id: 'small',
    points: 100,
    price: 10,
    description: 'Perfecto para empezar',
    popular: false
  },
  {
    id: 'medium',
    points: 250,
    price: 20,
    description: 'El más popular',
    popular: true
  },
  {
    id: 'large',
    points: 500,
    price: 35,
    description: 'Mejor valor por punto',
    popular: false
  },
  {
    id: 'mega',
    points: 1000,
    price: 60,
    description: 'Para fotógrafos profesionales',
    popular: false
  }
];

export const PointsPurchaseDialog: React.FC<PointsPurchaseDialogProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { purchasePoints } = useUserPoints();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    try {
      const success = await purchasePoints(packageId);
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Comprar Puntos
          </DialogTitle>
          <DialogDescription>
            Selecciona un paquete de puntos para participar en concursos premium exclusivos.
            <br />
            <strong>1€ = 10 puntos</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {pointsPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {pkg.popular && (
                <Badge 
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  variant="default"
                >
                  Más Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  {pkg.points}
                </CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold">
                  €{pkg.price}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  €{(pkg.price / pkg.points * 10).toFixed(2)} por cada 10 puntos
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  {loading === pkg.id ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Comprar
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">¿Qué puedes hacer con los puntos?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Participar en concursos premium exclusivos</li>
            <li>• Acceder a concursos con premios más altos</li>
            <li>• Competir con menos participantes</li>
            <li>• Obtener feedback profesional de tus fotos</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};