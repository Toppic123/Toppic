
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Users, Shield, AlertTriangle, ExternalLink } from "lucide-react";

interface ConsentFormProps {
  contestType: "landscape" | "people" | "public_event";
  onConsentGiven: (consents: ConsentData) => void;
}

interface ConsentData {
  photographerConsent: boolean;
  imageRightsOwnership: boolean;
  peopleConsent: boolean;
  brandPromotionConsent: boolean;
  commercialUseConsent: boolean;
  gdprCompliance: boolean;
  minorConsent?: boolean;
}

const ConsentForms = ({ contestType, onConsentGiven }: ConsentFormProps) => {
  const [consents, setConsents] = useState<ConsentData>({
    photographerConsent: false,
    imageRightsOwnership: false,
    peopleConsent: false,
    brandPromotionConsent: false,
    commercialUseConsent: false,
    gdprCompliance: false,
    minorConsent: false
  });

  const handleConsentChange = (key: keyof ConsentData, value: boolean) => {
    const newConsents = { ...consents, [key]: value };
    setConsents(newConsents);
  };

  const isFormValid = () => {
    const requiredConsents = [
      consents.photographerConsent,
      consents.gdprCompliance
    ];

    if (contestType === "people") {
      requiredConsents.push(consents.peopleConsent);
    }

    return requiredConsents.every(consent => consent);
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onConsentGiven(consents);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Consentimientos</h2>
        <p className="text-muted-foreground text-sm">
          Complete los consentimientos requeridos para participar
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Camera className="h-5 w-5" />
            Derechos de la fotografía
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="photographer-consent"
              checked={consents.photographerConsent}
              onCheckedChange={(checked) => 
                handleConsentChange('photographerConsent', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="photographer-consent" className="text-sm font-medium leading-none cursor-pointer">
                Soy el autor original de esta fotografía y acepto los términos de uso
              </label>
              <p className="text-xs text-muted-foreground">
                Confirmo que he tomado esta fotografía y otorgo licencia según las condiciones del concurso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {contestType === "people" && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-orange-500" />
              Personas fotografiadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Obligatorio:</strong> Su fotografía incluye personas identificables.
              </AlertDescription>
            </Alert>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="people-consent"
                checked={consents.peopleConsent}
                onCheckedChange={(checked) => 
                  handleConsentChange('peopleConsent', checked as boolean)
                }
              />
              <div className="space-y-1">
                <label htmlFor="people-consent" className="text-sm font-medium leading-none cursor-pointer">
                  He obtenido consentimiento de todas las personas fotografiadas
                </label>
                <p className="text-xs text-muted-foreground">
                  Incluye consentimiento para uso promocional y comercial. Para menores, consentimiento de padres/tutores.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-green-600" />
            Uso y protección de datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-medium mb-1">Su fotografía podrá ser utilizada para:</p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Promoción en redes sociales y sitio web</li>
              <li>• Material corporativo y campañas publicitarias</li>
            </ul>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="gdpr-compliance"
              checked={consents.gdprCompliance}
              onCheckedChange={(checked) => 
                handleConsentChange('gdprCompliance', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="gdpr-compliance" className="text-sm font-medium leading-none cursor-pointer">
                Acepto el tratamiento de datos y uso de mi fotografía
              </label>
              <p className="text-xs text-muted-foreground">
                Según Política de Privacidad y GDPR. Conservo mis derechos de acceso, rectificación y cancelación.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid()}
          className="w-full"
          size="lg"
        >
          Confirmar y Continuar
        </Button>
        
        {!isFormValid() && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Complete todos los consentimientos obligatorios para continuar.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Para información detallada sobre derechos de imagen y condiciones, consulte nuestros{" "}
            <a 
              href="/terms" 
              target="_blank" 
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Términos y Condiciones
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsentForms;
