import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPoints } from '@/hooks/useUserPoints';

export const usePremiumUser = () => {
  const { user } = useAuth();
  const { points } = useUserPoints();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // A user is considered premium if they have 50 or more points
    // This threshold can be adjusted based on business requirements
    const premiumThreshold = 50;
    setIsPremium(points >= premiumThreshold);
  }, [points]);

  return {
    isPremium,
    points,
    premiumThreshold: 50
  };
};