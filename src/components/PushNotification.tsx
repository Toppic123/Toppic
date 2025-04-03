
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle, Award, Camera, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type NotificationType = 
  | 'welcome' 
  | 'payment' 
  | 'contest-created' 
  | 'contest-won' 
  | 'reward-received';

interface PushNotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export const PushNotification = ({
  type,
  title,
  message,
  show,
  onClose
}: PushNotificationProps) => {
  const [isVisible, setIsVisible] = useState(show);
  
  useEffect(() => {
    setIsVisible(show);
    
    if (show) {
      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // After animation completes
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'welcome':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'contest-created':
        return <Camera className="h-5 w-5 text-purple-500" />;
      case 'contest-won':
        return <Award className="h-5 w-5 text-amber-500" />;
      case 'reward-received':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
        >
          <div className="bg-white rounded-lg shadow-lg border p-4 mx-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-1">{getIcon()}</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="flex-shrink-0 ml-4 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to manage notifications
export const usePushNotification = () => {
  const [notifications, setNotifications] = useState<{
    id: string;
    type: NotificationType;
    title: string;
    message: string;
  }[]>([]);

  const showNotification = (type: NotificationType, title: string, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    return id;
  };

  const closeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Predefined notification types
  const showWelcomeNotification = (username: string) => {
    return showNotification(
      'welcome',
      'Bienvenido a Pix On Air',
      `¡Hola ${username}! Gracias por unirte a nuestra comunidad de fotografía.`
    );
  };

  const showPaymentNotification = (plan: string) => {
    return showNotification(
      'payment',
      'Pago confirmado',
      `Tu suscripción al plan ${plan} ha sido activada. ¡Gracias por tu compra!`
    );
  };

  const showContestCreatedNotification = (contestName: string) => {
    return showNotification(
      'contest-created',
      'Concurso creado',
      `Tu concurso "${contestName}" ha sido creado exitosamente y ya está disponible.`
    );
  };

  const showContestWonNotification = (contestName: string) => {
    return showNotification(
      'contest-won',
      '¡Felicidades!',
      `Has ganado el concurso "${contestName}". Revisa tu perfil para más detalles.`
    );
  };

  const showRewardReceivedNotification = (contestName: string) => {
    return showNotification(
      'reward-received',
      'Recompensa recibida',
      `Has recibido una recompensa por participar en la votación del concurso "${contestName}".`
    );
  };

  // Component to render all active notifications
  const NotificationsRenderer = () => (
    <>
      {notifications.map(notif => (
        <PushNotification
          key={notif.id}
          type={notif.type}
          title={notif.title}
          message={notif.message}
          show={true}
          onClose={() => closeNotification(notif.id)}
        />
      ))}
    </>
  );

  return {
    NotificationsRenderer,
    showNotification,
    showWelcomeNotification,
    showPaymentNotification,
    showContestCreatedNotification,
    showContestWonNotification,
    showRewardReceivedNotification,
    closeNotification
  };
};
