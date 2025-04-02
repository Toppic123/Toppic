
import { AlertTriangle, Check, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prohibitedConductRules = [
  "No uploading, copying or stealing any other Users' or individuals' work and/or Content.",
  "Using the Services solely for personal, non-commercial purposes.",
  "No reverse engineering, data-mining, scraping, exploiting or overloading our systems or software.",
  "No replicating or copying any portion of our Services.",
  "No using bots to use or access the Services.",
  "Using the Services for lawful purposes only, and not breaking any local laws or regulations.",
  "No using the Services to harm others, including but not limited to prohibited activities like spreading hate, engaging in any form of harassment or submitting harmful or inappropriate Content.",
  "No using the Services to discriminate, incite or promote discrimination or violence based on sex, sexual orientation, age, race, religion, disability, nationality or ancestry or any other personal characteristic.",
  "No promoting any other website, service or business via the Services.",
  "Abiding by and adhering to any and all rules or policies.",
  "No uploading or submitting content containing nudity or sexual activity, including photos, videos, and digitally-created content that show genitals, sexual intercourse, close-ups of fully-nude buttocks, or sexually explicit/suggestive material."
];

interface ProhibitedConductProps {
  compact?: boolean;
}

const ProhibitedConduct = ({ compact = false }: ProhibitedConductProps) => {
  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Shield className="h-4 w-4 mr-2 text-destructive" />
            Prohibited conduct
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            All users must comply with our prohibited conduct rules.
            This includes not sharing inappropriate content, respecting the work of other users, 
            and using the platform only for permitted purposes.
          </p>
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failing to comply with these rules may result in account suspension or termination.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-destructive" />
        <h3 className="text-xl font-bold">Prohibited Conduct</h3>
      </div>
      
      <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          By using the Services, you are solely responsible for all of your Account's activities 
          and agree to not engage in the following prohibited user conduct ("Prohibited Conduct"):
        </AlertDescription>
      </Alert>
      
      <ul className="space-y-3">
        {prohibitedConductRules.map((rule, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p>{rule}</p>
          </li>
        ))}
      </ul>
      
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          If you fail to adhere to any of the provisions in our Prohibited Conduct policy, 
          we may, in our sole discretion and without notice, delete any violating Content 
          or suspend or terminate any violating User's Account.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProhibitedConduct;
