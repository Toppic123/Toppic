
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Camera } from "lucide-react";

interface MobileRegisterProps {
  onNavigate: (screen: 'home' | 'login') => void;
}

const MobileRegister = ({ onNavigate }: MobileRegisterProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    onNavigate('login');
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-blue-700 mr-3 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Crear cuenta</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Avatar Upload */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
          <Button variant="outline" size="sm">
            Agregar foto
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <Input
              type="text"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
            Crear cuenta
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">¿Ya tienes cuenta? </span>
          <Button
            variant="link"
            onClick={() => onNavigate('login')}
            className="text-blue-600 p-0 text-sm"
          >
            Inicia sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileRegister;
