
import { createRoot } from 'react-dom/client'
import { shouldShowMobileVersion } from './utils/platformDetection'
import './index.css'

// Lazy load both app versions
const loadApp = async () => {
  if (shouldShowMobileVersion()) {
    console.log('Loading mobile version');
    const { default: AppMobile } = await import('./App.mobile');
    return AppMobile;
  } else {
    console.log('Loading web version');
    const { default: App } = await import('./App');
    return App;
  }
};

// Initialize the app
loadApp().then(App => {
  createRoot(document.getElementById("root")!).render(<App />);
});
