
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Users, Shield, AlertTriangle } from "lucide-react";

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
      consents.imageRightsOwnership,
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
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Formularios de Consentimiento</h2>
        <p className="text-muted-foreground">
          Complete todos los consentimientos requeridos antes de participar en el concurso
        </p>
      </div>

      {/* Consentimiento del Fotógrafo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Consentimiento del Fotógrafo
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
              <label htmlFor="photographer-consent" className="text-sm font-medium leading-none">
                Soy el autor original de esta fotografía
              </label>
              <p className="text-sm text-muted-foreground">
                Confirmo que he tomado esta fotografía personalmente y poseo todos los derechos sobre la misma.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="image-rights"
              checked={consents.imageRightsOwnership}
              onCheckedChange={(checked) => 
                handleConsentChange('imageRightsOwnership', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="image-rights" className="text-sm font-medium leading-none">
                Derechos de propiedad intelectual
              </label>
              <p className="text-sm text-muted-foreground">
                Confirmo que la imagen no infringe derechos de terceros y otorgo licencia para su uso según las condiciones del concurso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consentimiento de Personas Fotografiadas */}
      {contestType === "people" && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Consentimiento de Personas Fotografiadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Esta sección es obligatoria cuando la fotografía incluye personas identificables.
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
                <label htmlFor="people-consent" className="text-sm font-medium leading-none">
                  Consentimiento de las personas fotografiadas
                </label>
                <p className="text-sm text-muted-foreground">
                  Confirmo que he obtenido el consentimiento explícito de todas las personas identificables en la fotografía para su uso en este concurso.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="minor-consent"
                checked={consents.minorConsent}
                onCheckedChange={(checked) => 
                  handleConsentChange('minorConsent', checked as boolean)
                }
              />
              <div className="space-y-1">
                <label htmlFor="minor-consent" className="text-sm font-medium leading-none">
                  Consentimiento de menores (si aplica)
                </label>
                <p className="text-sm text-muted-foreground">
                  Si la fotografía incluye menores de edad, confirmo que he obtenido el consentimiento de sus padres o tutores legales.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consentimiento de Uso Comercial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Consentimiento de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tipos de Uso Permitidos:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>Promoción de marca:</strong> Uso en redes sociales, sitio web de la empresa, material corporativo</li>
              <li>• <strong>Publicidad comercial:</strong> Campañas publicitarias pagadas, material promocional masivo, vallas publicitarias</li>
            </ul>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="brand-promotion"
              checked={consents.brandPromotionConsent}
              onCheckedChange={(checked) => 
                handleConsentChange('brandPromotionConsent', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="brand-promotion" className="text-sm font-medium leading-none">
                Promoción de marca
              </label>
              <p className="text-sm text-muted-foreground">
                Acepto que mi fotografía sea utilizada para promoción de la marca organizadora en redes sociales, sitio web y material corporativo.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="commercial-use"
              checked={consents.commercialUseConsent}
              onCheckedChange={(checked) => 
                handleConsentChange('commercialUseConsent', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="commercial-use" className="text-sm font-medium leading-none">
                Uso comercial ampliado
              </label>
              <p className="text-sm text-muted-foreground">
                Acepto que mi fotografía sea utilizada para publicidad comercial, incluyendo campañas pagadas y material promocional masivo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cumplimiento GDPR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Protección de Datos (GDPR)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="gdpr-compliance"
              checked={consents.gdprCompliance}
              onCheckedChange={(checked) => 
                handleConsentChange('gdprCompliance', checked as boolean)
              }
            />
            <div className="space-y-1">
              <label htmlFor="gdpr-compliance" className="text-sm font-medium leading-none">
                Consentimiento para el tratamiento de datos personales
              </label>
              <p className="text-sm text-muted-foreground">
                Acepto el tratamiento de mis datos personales según la Política de Privacidad y el cumplimiento del GDPR. 
                Entiendo mis derechos de acceso, rectificación, cancelación y oposición.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid()}
          className="w-full"
        >
          Confirmar Consentimientos y Continuar
        </Button>
        
        {!isFormValid() && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Debe completar todos los consentimientos obligatorios para continuar.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ConsentForms;
