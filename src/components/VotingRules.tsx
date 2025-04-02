
import { FolderCheck, Shuffle, Award, Users, ImageIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface VotingSystemProps {
  aiPreSelection: boolean;
  finalUserVoting: boolean;
  maxPhotos: number;
  voterReward?: {
    enabled: boolean;
    description: string;
  };
  condensed?: boolean;
}

const VotingRules = ({
  aiPreSelection = true,
  finalUserVoting = true,
  maxPhotos = 50,
  voterReward,
  condensed = false
}: VotingSystemProps) => {
  if (condensed) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Award className="h-4 w-4 mr-2 text-primary" />
            Sistema de votación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0 text-sm">
          <div className="flex items-start gap-2">
            <FolderCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p>La IA preselecciona las {maxPhotos} mejores fotos.</p>
          </div>
          
          {finalUserVoting && (
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p>Los usuarios votan por su foto favorita.</p>
            </div>
          )}
          
          {voterReward?.enabled && (
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p>¡Los votantes también pueden ganar premios!</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-xl space-y-6">
        <h3 className="text-xl font-bold flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Sistema de votación
        </h3>
        
        <div className="space-y-6">
          {aiPreSelection && (
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-lg mb-3 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                Fase 1: Preselección con IA
              </h4>
              
              <p className="text-muted-foreground mb-4">
                Antes de la votación, nuestro sistema de IA selecciona las mejores fotografías 
                basándose en diversos parámetros de calidad.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="detail-1">
                  <AccordionTrigger className="text-sm font-medium">
                    ¿Cómo funciona la preselección?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Análisis de calidad de imagen</p>
                          <p className="text-muted-foreground">
                            Detecta y descarta fotos borrosas, mal iluminadas o de baja resolución.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Algoritmo de ranking</p>
                          <p className="text-muted-foreground">
                            Usa técnicas como Elo Rating o TrueSkill para comparar y clasificar las fotografías.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Selección final</p>
                          <p className="text-muted-foreground">
                            Se obtienen las {maxPhotos} mejores fotografías para la fase de votación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          
          {finalUserVoting && (
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-lg mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Fase 2: Votación de los usuarios
              </h4>
              
              <p className="text-muted-foreground mb-2">
                Tras la preselección, comienza la fase de votación donde todos los usuarios registrados pueden participar.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <p className="text-sm">
                    Cada usuario puede votar por 1 sola foto. Los votos son finales, aunque pueden cambiarse durante el periodo de votación.
                  </p>
                </div>
                
                {voterReward?.enabled && (
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">¡Los votantes también pueden ganar!</p>
                      <p className="text-sm text-muted-foreground">{voterReward.description}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="detail-2">
                  <AccordionTrigger className="text-sm font-medium">
                    ¿Cómo funciona la votación?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Navegación por fotografías</p>
                          <p className="text-muted-foreground">
                            Los usuarios pueden explorar todas las fotografías preseleccionadas.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Votación simple</p>
                          <p className="text-muted-foreground">
                            Se puede votar haciendo clic en el botón de corazón o con doble tap en la foto.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Resultados</p>
                          <p className="text-muted-foreground">
                            La fotografía con más votos gana al finalizar el periodo de votación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingRules;
