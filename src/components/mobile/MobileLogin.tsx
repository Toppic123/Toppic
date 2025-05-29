
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface MobileLoginProps {
  onNavigate: (screen: 'home' | 'register') => void;
  onLogin: () => void;
}

const MobileLogin = ({ onNavigate, onLogin }: MobileLoginProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
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
          <h1 className="text-lg font-semibold">Iniciar sesión</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h2>
          <p className="text-gray-600">Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
            Iniciar sesión
          </Button>
        </form>

        <div className="text-center mt-4">
          <Button variant="link" className="text-blue-600 text-sm">
            ¿Olvidaste tu contraseña?
          </Button>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">¿No tienes cuenta? </span>
          <Button
            variant="link"
            onClick={() => onNavigate('register')}
            className="text-blue-600 p-0 text-sm"
          >
            Regístrate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileLogin;
