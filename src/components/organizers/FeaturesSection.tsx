
import { motion } from "framer-motion";
import { Camera, Building, Album } from "lucide-react";

const FeaturesSection = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          ¿POR QUÉ USAR TOPPICS EN EVENTOS?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 mb-6">
            <Camera className="h-12 w-12 text-blue-600 mx-auto" />
          </div>
          <h3 className="text-xl font-bold mb-3">Ahorra dinero</h3>
          <p className="text-muted-foreground">
            No necesitas contratar fotógrafos, quédate con las mejores fotos de los asistentes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 mb-6">
            <Building className="h-12 w-12 text-green-600 mx-auto" />
          </div>
          <h3 className="text-xl font-bold mb-3">Visibilidad Máxima</h3>
          <p className="text-muted-foreground">
            Promociona tu marca y eventos a nivel nacional e internacional
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mb-6">
            <Album className="h-12 w-12 text-purple-600 mx-auto" />
          </div>
          <h3 className="text-xl font-bold mb-3">Álbumes de fotos</h3>
          <p className="text-muted-foreground">
            Las fotos de los eventos podrán consultarse en cualquier momento
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default FeaturesSection;
