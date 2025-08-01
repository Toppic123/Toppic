import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPoints } from '@/hooks/useUserPoints';

export const usePremiumUser = () => {
  const { user } = useAuth();
  const { points } = useUserPoints();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // A user is considered premium if they have enough points to add one more photo (5 points)
    // This means users can see the premium section when they have at least 5 points
    const premiumThreshold = 5;
    setIsPremium(points >= premiumThreshold);
  }, [points]);

  return {
    isPremium,
    points,
    premiumThreshold: 5
  };
};