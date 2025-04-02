
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
            Voting System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0 text-sm">
          <div className="flex items-start gap-2">
            <FolderCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p>AI preselects the best {maxPhotos} photos.</p>
          </div>
          
          {finalUserVoting && (
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p>Users vote for their favorite photo.</p>
            </div>
          )}
          
          {voterReward?.enabled && (
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p>Voters can also win prizes!</p>
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
          Voting System
        </h3>
        
        <div className="space-y-6">
          {aiPreSelection && (
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-lg mb-3 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                Phase 1: AI Preselection
              </h4>
              
              <p className="text-muted-foreground mb-4">
                Before voting begins, our AI system selects the best photographs 
                based on various quality parameters.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="detail-1">
                  <AccordionTrigger className="text-sm font-medium">
                    How does preselection work?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Image Quality Analysis</p>
                          <p className="text-muted-foreground">
                            Detects and discards blurry, poorly lit, or low-resolution photos.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Ranking Algorithm</p>
                          <p className="text-muted-foreground">
                            Uses techniques like Elo Rating or TrueSkill to compare and rank photographs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Final Selection</p>
                          <p className="text-muted-foreground">
                            Obtains the top {maxPhotos} photographs for the voting phase.
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
                Phase 2: User Voting
              </h4>
              
              <p className="text-muted-foreground mb-2">
                After preselection, the voting phase begins where all registered users can participate.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <p className="text-sm">
                    Each user can vote for only 1 photo. Votes are final, but can be changed during the voting period.
                  </p>
                </div>
                
                {voterReward?.enabled && (
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Voters can also win!</p>
                      <p className="text-sm text-muted-foreground">{voterReward.description}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="detail-2">
                  <AccordionTrigger className="text-sm font-medium">
                    How does voting work?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Browse photographs</p>
                          <p className="text-muted-foreground">
                            Users can explore all preselected photographs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Simple voting</p>
                          <p className="text-muted-foreground">
                            Vote by clicking the heart button or double-tapping the photo.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Results</p>
                          <p className="text-muted-foreground">
                            The photo with the most votes wins when the voting period ends.
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
