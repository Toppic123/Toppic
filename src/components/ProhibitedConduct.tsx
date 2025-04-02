
import { AlertTriangle, Check, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prohibitedConductRules = [
  "No subir, copiar o robar el trabajo y/o contenido de otros usuarios o individuos.",
  "Usar los servicios únicamente para fines personales, no comerciales.",
  "No realizar ingeniería inversa, minería de datos, scraping o sobrecarga de nuestros sistemas o software.",
  "No replicar ni copiar ninguna parte de nuestros servicios.",
  "No usar bots para utilizar o acceder a los servicios.",
  "Usar los servicios solo para fines legales, sin infringir leyes o regulaciones locales.",
  "No usar los servicios para dañar a otros, incluidas actividades como difundir odio, participar en cualquier forma de acoso o enviar contenido dañino o inapropiado.",
  "No usar los servicios para discriminar, incitar o promover discriminación o violencia basada en sexo, orientación sexual, edad, raza, religión, discapacidad, nacionalidad o ascendencia o cualquier otra característica personal.",
  "No promocionar ningún otro sitio web, servicio o negocio a través de los servicios.",
  "Cumplir y adherirse a todas las reglas o políticas.",
  "No subir o enviar contenido que contenga desnudos o actividad sexual, incluidas fotos, videos y contenido creado digitalmente que muestre genitales, actos sexuales, primeros planos de glúteos completamente desnudos o material sexualmente explícito/sugestivo."
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
            Conducta prohibida
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Todos los usuarios deben cumplir con nuestras reglas de conducta prohibida.
            Esto incluye no compartir contenido inapropiado, respetar el trabajo de otros usuarios, 
            y usar la plataforma solo para fines permitidos.
          </p>
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              El incumplimiento de estas reglas puede resultar en la suspensión o eliminación de la cuenta.
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
        <h3 className="text-xl font-bold">Conducta Prohibida</h3>
      </div>
      
      <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Al usar los Servicios, usted es el único responsable de todas las actividades de su Cuenta 
          y acepta no participar en la siguiente conducta prohibida ("Conducta Prohibida"):
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
          Si no cumple con cualquiera de las disposiciones de nuestra política de Conducta Prohibida, 
          podemos, a nuestra exclusiva discreción y sin previo aviso, eliminar cualquier Contenido 
          que infrinja o suspender o cancelar la Cuenta de cualquier Usuario que infrinja.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProhibitedConduct;
