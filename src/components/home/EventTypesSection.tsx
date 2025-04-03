
import { motion } from "framer-motion";
import { Music, Trophy, Landmark, Camera } from "lucide-react";

interface EventTypesSectionProps {
  texts: {
    eventTypes: string;
    eventTypesDesc: string;
    musicEvents: string;
    musicEventsDesc: string;
    sportsEvents: string;
    sportsEventsDesc: string;
    touristPlaces: string;
    touristPlacesDesc: string;
    thematicContests: string;
    thematicContestsDesc: string;
  };
}

const EventTypesSection = ({ texts }: EventTypesSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gray-300">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{texts.eventTypes}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {texts.eventTypesDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{texts.musicEvents}</h3>
            <p className="text-muted-foreground text-sm">{texts.musicEventsDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{texts.sportsEvents}</h3>
            <p className="text-muted-foreground text-sm">{texts.sportsEventsDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{texts.touristPlaces}</h3>
            <p className="text-muted-foreground text-sm">{texts.touristPlacesDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{texts.thematicContests}</h3>
            <p className="text-muted-foreground text-sm">{texts.thematicContestsDesc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventTypesSection;
