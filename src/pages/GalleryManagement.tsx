
import { motion } from 'framer-motion';
import GalleryManager from '@/components/admin/GalleryManager';

const GalleryManagement = () => {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Gestión de Galería</h1>
        <p className="text-muted-foreground mb-8">
          Administra las fotos destacadas que aparecen en la página principal.
        </p>
        
        <GalleryManager />
      </motion.div>
    </div>
  );
};

export default GalleryManagement;
