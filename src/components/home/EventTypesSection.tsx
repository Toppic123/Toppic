
import { motion } from "framer-motion";
import { Music, Trophy, Mountain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{texts.eventTypes}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {texts.eventTypesDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{texts.musicEvents}</h3>
                <p className="text-muted-foreground flex-grow">{texts.musicEventsDesc}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{texts.sportsEvents}</h3>
                <p className="text-muted-foreground flex-grow">{texts.sportsEventsDesc}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                  <Mountain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{texts.touristPlaces}</h3>
                <p className="text-muted-foreground flex-grow">{texts.touristPlacesDesc}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{texts.thematicContests}</h3>
                <p className="text-muted-foreground flex-grow">{texts.thematicContestsDesc}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventTypesSection;
