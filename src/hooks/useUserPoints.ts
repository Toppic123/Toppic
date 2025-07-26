import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserPoints {
  points: number;
  transactions: PointTransaction[];
  loading: boolean;
}

interface PointTransaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

export const useUserPoints = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState<UserPoints>({
    points: 0,
    transactions: [],
    loading: true
  });

  const fetchUserPoints = async () => {
    if (!user) {
      setUserPoints({ points: 0, transactions: [], loading: false });
      return;
    }

    try {
      // Fetch user points balance
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('points')
        .eq('user_id', user.id)
        .maybeSingle();

      if (pointsError && pointsError.code !== 'PGRST116') {
        throw pointsError;
      }

      // Fetch recent transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('point_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionsError) {
        throw transactionsError;
      }

      setUserPoints({
        points: pointsData?.points || 0,
        transactions: transactionsData || [],
        loading: false
      });
    } catch (error) {
      console.error('Error fetching user points:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los puntos",
        variant: "destructive"
      });
      setUserPoints({ points: 0, transactions: [], loading: false });
    }
  };

  const purchasePoints = async (pointsPackage: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para comprar puntos",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { pointsPackage }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        return true;
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: "No se pudo iniciar el pago",
        variant: "destructive"
      });
    }
    return false;
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) throw error;

      if (data?.verified) {
        toast({
          title: "¡Pago exitoso!",
          description: `Se agregaron ${data.pointsAwarded} puntos a tu cuenta`,
        });
        await fetchUserPoints();
        return true;
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Error",
        description: "No se pudo verificar el pago",
        variant: "destructive"
      });
    }
    return false;
  };

  const spendPoints = async (amount: number, contestId?: string, description?: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('spend_user_points', {
        p_user_id: user.id,
        p_amount: amount,
        p_transaction_type: 'contest_entry',
        p_description: description || `Entrada a concurso premium`,
        p_contest_id: contestId
      });

      if (error) throw error;

      if (data) {
        await fetchUserPoints();
        return true;
      }
    } catch (error) {
      console.error('Error spending points:', error);
      toast({
        title: "Error",
        description: "No se pudieron gastar los puntos",
        variant: "destructive"
      });
    }
    return false;
  };

  useEffect(() => {
    fetchUserPoints();
  }, [user]);

  // Set up real-time listener for points updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user-points-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_points',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchUserPoints();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'point_transactions',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchUserPoints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    points: userPoints.points,
    transactions: userPoints.transactions,
    loading: userPoints.loading,
    purchasePoints,
    verifyPayment,
    spendPoints,
    refreshPoints: fetchUserPoints
  };
};