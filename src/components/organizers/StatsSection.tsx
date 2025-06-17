
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-3xl p-12 text-center"
    >
      <h2 className="text-3xl font-bold mb-8">La plataforma líder en concursos fotográficos</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-4xl font-bold text-primary mb-2">50+</div>
          <div className="text-muted-foreground">Organizadores activos</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary mb-2">200+</div>
          <div className="text-muted-foreground">Concursos creados</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary mb-2">10K+</div>
          <div className="text-muted-foreground">Participantes registrados</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary mb-2">€500K+</div>
          <div className="text-muted-foreground">En premios otorgados</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;
