
import { Camera, Check, Edit, FileWarning, Image, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PhotoRequirementsProps {
  compact?: boolean;
}

const PhotoRequirements = ({ compact = false }: PhotoRequirementsProps) => {
  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Camera className="h-4 w-4 mr-2 text-primary" />
            Requisitos de fotografías
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Las fotos deben ser tomadas por el usuario que las sube.</p>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Se admiten fotos tomadas con móviles o cámaras fotográficas.</p>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Máximo 1 foto por participante.</p>
          </div>
          <div className="flex items-start gap-2">
            <FileWarning className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
            <p>No se aceptan imágenes creadas por inteligencia artificial.</p>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
            <p>Consentimiento obligatorio para fotos con personas identificables.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Camera className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold">Requisitos para las fotografías</h3>
      </div>
      
      <Alert className="border-orange-200 bg-orange-50">
        <Users className="h-4 w-4" />
        <AlertDescription>
          <strong>Nuevo:</strong> Formularios de consentimiento obligatorios para fotografías con personas identificables. 
          Ambos usos (promoción de marca y publicidad comercial) requieren consentimiento explícito.
        </AlertDescription>
      </Alert>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="ownership" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Image className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Propiedad de las imágenes</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <p className="text-muted-foreground">
              Las fotografías subidas a la aplicación deben ser de propiedad del usuario que las sube.
            </p>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="font-medium">Importante:</p>
              <p className="text-sm">
                Al subir fotografías, el usuario reconoce ser el propietario de los derechos de dicha imagen
                y concede a los organizadores del concurso los derechos de uso especificados en las bases del concurso.
                Solo se permite 1 foto por participante por concurso.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consent" className="border rounded-lg px-4 border-orange-200">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-orange-500" />
              <span className="font-medium">Consentimiento de personas fotografiadas</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <p className="text-muted-foreground">
              <strong>Obligatorio para fotografías con personas identificables.</strong> El participante debe obtener 
              consentimiento explícito de todas las personas que aparezcan en la fotografía.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Tipos de consentimiento requerido:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• <strong>Promoción de marca:</strong> Uso en redes sociales, sitio web corporativo</li>
                <li>• <strong>Publicidad comercial:</strong> Campañas pagadas, material promocional masivo</li>
                <li>• <strong>Menores de edad:</strong> Consentimiento de padres o tutores legales</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="font-medium text-orange-800">Responsabilidad del participante:</p>
              <p className="text-sm text-orange-700">
                Debe poder demostrar que posee estos consentimientos y conservar evidencia durante al menos 3 años.
                El incumplimiento puede resultar en descalificación y responsabilidad legal.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="devices" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Dispositivos permitidos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <p className="text-muted-foreground">
              Las fotografías pueden ser tomadas con teléfonos móviles o cámaras fotográficas.
              No hay restricciones en cuanto al tipo de dispositivo utilizado para capturar la imagen,
              siempre y cuando la fotografía cumpla con los demás requisitos especificados.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="editing" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Edit className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Edición de fotografías</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <p className="text-muted-foreground">
              Los organizadores de los concursos indican en las bases de cada concurso si las fotografías
              pueden haber sido editadas y qué tipo de ediciones están permitidas. Es responsabilidad
              del participante cumplir con estos requisitos específicos.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="ai" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <FileWarning className="h-5 w-5 mr-2 text-destructive" />
              <span className="font-medium">Inteligencia artificial</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <p className="text-muted-foreground">
              <strong>No se aceptan imágenes creadas por la inteligencia artificial.</strong> Todas las fotografías
              deben ser capturas reales tomadas por el participante. El uso de herramientas de IA para generar
              o modificar sustancialmente las imágenes está prohibido y puede resultar en la descalificación.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gdpr" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">Cumplimiento GDPR y protección de datos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <p className="text-muted-foreground">
              La plataforma cumple con el Reglamento General de Protección de Datos (GDPR).
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Sus derechos:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Acceso a sus datos personales</li>
                <li>• Rectificación de datos incorrectos</li>
                <li>• Cancelación de sus datos</li>
                <li>• Oposición al tratamiento</li>
                <li>• Portabilidad de datos</li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">
                Para ejercer sus derechos GDPR, contacte: <strong>privacy@toppic.com</strong>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PhotoRequirements;
