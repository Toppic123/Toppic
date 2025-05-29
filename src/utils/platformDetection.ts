
import { Capacitor } from '@capacitor/core';

export const isMobile = () => {
  return Capacitor.isNativePlatform();
};

export const isWeb = () => {
  return !Capacitor.isNativePlatform();
};

export const getPlatform = () => {
  return Capacitor.getPlatform();
};

export const isCapacitor = () => {
  return Capacitor.isNativePlatform();
};

// También detectar por user agent como fallback
export const isMobileUserAgent = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

// Función principal para determinar si mostrar versión móvil
export const shouldShowMobileVersion = () => {
  return isMobile() || isMobileUserAgent();
};
