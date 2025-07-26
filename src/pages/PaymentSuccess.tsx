import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserPoints } from '@/hooks/useUserPoints';
import Layout from '@/components/Layout';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, points } = useUserPoints();
  const [verifying, setVerifying] = useState(true);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      const verify = async () => {
        setVerifying(true);
        const result = await verifyPayment(sessionId);
        if (result) {
          // Slight delay to let the points update
          setTimeout(() => {
            setVerifying(false);
          }, 1000);
        } else {
          setVerifying(false);
        }
      };
      
      verify();
    } else {
      setVerifying(false);
    }
  }, [searchParams, verifyPayment]);

  const handleContinue = () => {
    navigate('/contests');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">¡Pago Exitoso!</CardTitle>
            <CardDescription>
              Tu compra de puntos se ha procesado correctamente
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {verifying ? (
              <div className="text-center py-8">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Verificando tu pago y agregando puntos...
                </p>
              </div>
            ) : (
              <>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Balance Actual</span>
                  </div>
                  <div className="text-2xl font-bold">{points} puntos</div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleContinue} 
                    className="w-full"
                    size="lg"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explorar Concursos Premium
                  </Button>
                  
                  <Button 
                    onClick={handleViewProfile} 
                    variant="outline" 
                    className="w-full"
                    size="lg"
                  >
                    Ver Mi Perfil
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Ahora puedes participar en concursos premium exclusivos con premios más altos
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};