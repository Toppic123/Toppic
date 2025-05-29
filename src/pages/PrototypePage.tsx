
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Camera, Trophy, Users, Building, Map, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Importar secciones del prototipo
import PrototypeHome from "@/components/prototype/PrototypeHome";
import PrototypeContests from "@/components/prototype/PrototypeContests";
import PrototypeGallery from "@/components/prototype/PrototypeGallery";
import PrototypeProfile from "@/components/prototype/PrototypeProfile";
import PrototypeOrganizers from "@/components/prototype/PrototypeOrganizers";
import PrototypeMap from "@/components/prototype/PrototypeMap";

const sections = [
  { id: "home", title: "Inicio", icon: Home, component: PrototypeHome },
  { id: "contests", title: "Concursos", icon: Camera, component: PrototypeContests },
  { id: "gallery", title: "Galería", icon: Trophy, component: PrototypeGallery },
  { id: "profile", title: "Perfil", icon: Users, component: PrototypeProfile },
  { id: "organizers", title: "Organizadores", icon: Building, component: PrototypeOrganizers },
  { id: "map", title: "Mapa", icon: Map, component: PrototypeMap },
];

const PrototypePage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Header con navegación */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#4891AA]">TOPPICS</h1>
            <span className="text-sm bg-[#4891AA]/10 text-[#4891AA] px-3 py-1 rounded-full font-medium">
              Prototipo Interactivo
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-[#4891AA]/30 text-[#4891AA] hover:bg-[#4891AA]/10"
          >
            <Settings className="h-4 w-4 mr-2" />
            Navegación
          </Button>
        </div>
      </header>

      {/* Menú lateral deslizable */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6"
            >
              <h3 className="text-lg font-bold mb-6 text-gray-900">Secciones del Prototipo</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSection(index);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                      currentSection === index
                        ? "bg-[#4891AA] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <main className="pt-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Controles de navegación */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSection}
            className="rounded-full h-10 w-10 p-0 border-[#4891AA]/30 text-[#4891AA] hover:bg-[#4891AA]/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentSection === index ? "bg-[#4891AA]" : "bg-gray-300"
                )}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSection}
            className="rounded-full h-10 w-10 p-0 border-[#4891AA]/30 text-[#4891AA] hover:bg-[#4891AA]/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Indicador de sección actual */}
      <div className="fixed top-20 left-6 z-30">
        <div className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-2 text-[#4891AA]">
            {React.createElement(sections[currentSection].icon, { className: "h-5 w-5" })}
            <span className="font-medium">{sections[currentSection].title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypePage;
