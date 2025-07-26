import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserPoints } from '@/hooks/useUserPoints';
import { useAuth } from '@/contexts/AuthContext';

interface PointsDisplayProps {
  variant?: 'compact' | 'full';
  onPurchaseClick?: () => void;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({ 
  variant = 'compact', 
  onPurchaseClick 
}) => {
  const { user } = useAuth();
  const { points, loading } = useUserPoints();

  if (!user) return null;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500" />
          {loading ? '...' : points}
        </Badge>
        {onPurchaseClick && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={onPurchaseClick}
            className="h-7"
          >
            <ShoppingCart className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Mis Puntos
        </CardTitle>
        <CardDescription>
          Usa puntos para participar en concursos premium exclusivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            ) : (
              `${points} puntos`
            )}
          </div>
          {onPurchaseClick && (
            <Button onClick={onPurchaseClick} className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Comprar Puntos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};