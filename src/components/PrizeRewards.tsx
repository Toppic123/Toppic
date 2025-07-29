import { Trophy, Star, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PrizeRewards = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#f46464] mb-4">
          🏆 SISTEMA DE PREMIOS TOPPIC
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Además de los premios del organizador, premiamos a los mejores fotógrafos con puntos Toppic
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Winner Prize */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-3 bg-yellow-100 rounded-full w-fit">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl text-yellow-700">
              1º Lugar - Foto Más Votada
            </CardTitle>
            <CardDescription>
              El usuario con la fotografía más votada
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">
              50 Puntos Toppic
            </Badge>
            <p className="text-sm text-yellow-700">
              + Correo de felicitación personalizado
            </p>
            <p className="text-xs text-muted-foreground">
              Aplicable en todos los tipos de concurso
            </p>
          </CardContent>
        </Card>

        {/* Runner-up Prize */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl text-orange-700">
              2º y 3º Lugar
            </CardTitle>
            <CardDescription>
              Solo en concursos Profesional y Premium
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <Badge className="bg-orange-500 text-white text-lg px-4 py-2">
              25 Puntos Toppic
            </Badge>
            <p className="text-sm text-orange-700">
              + Correo de felicitación personalizado
            </p>
            <div className="bg-orange-100 rounded-lg p-3">
              <p className="text-xs text-orange-800">
                <Star className="h-3 w-3 inline mr-1" />
                Sus fotos pasan a ser propiedad del organizador
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Información sobre Puntos Toppic</h4>
        <p className="text-sm text-blue-700">
          Los puntos Toppic se otorgan automáticamente al finalizar el concurso y pueden ser utilizados 
          para participar en concursos premium o canjeados por premios en nuestra plataforma.
        </p>
      </div>
    </div>
  );
};

export default PrizeRewards;