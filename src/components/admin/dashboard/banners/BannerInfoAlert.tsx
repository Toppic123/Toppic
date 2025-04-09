
import { Alert, AlertDescription } from "@/components/ui/alert";

const BannerInfoAlert = () => {
  return (
    <Alert>
      <AlertDescription>
        <p className="font-medium mb-1">Información sobre los banners:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Los banners deben estar en formato JPG o PNG.</li>
          <li>Respeta las dimensiones exactas para una visualización óptima.</li>
          <li>Evita textos pequeños que pueden resultar ilegibles.</li>
          <li>El contenido de los banners está sujeto a revisión según nuestras políticas.</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default BannerInfoAlert;
