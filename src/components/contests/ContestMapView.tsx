
import Map from "@/components/Map";

const ContestMapView = () => {
  return (
    <div className="mt-6">
      <Map />
      <div className="mt-4 p-4 border rounded-md bg-muted/50">
        <h3 className="text-sm font-medium mb-2">Restricciones de ubicación:</h3>
        <p className="text-sm text-muted-foreground">
          Los participantes solo pueden subir fotos si están dentro de la distancia máxima especificada por cada concurso (indicada en la ficha del concurso).
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Nota:</strong> Solo se muestran concursos activos en el mapa.
        </p>
      </div>
    </div>
  );
};

export default ContestMapView;
