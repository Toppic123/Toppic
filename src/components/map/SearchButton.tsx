
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

interface SearchButtonProps {
  isLocating: boolean;
  isMapLoading: boolean;
  onLocateUser: () => void;
}

const SearchButton = ({ isLocating, isMapLoading, onLocateUser }: SearchButtonProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
      <motion.button 
        onClick={onLocateUser}
        disabled={isLocating || isMapLoading}
        className="flex items-center gap-2 bg-[#FFC72C] text-black font-medium px-6 py-4 rounded-full shadow-lg hover:bg-[#FFD54F] transition-all disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: ["0px 4px 12px rgba(0,0,0,0.1)", "0px 8px 24px rgba(0,0,0,0.15)", "0px 4px 12px rgba(0,0,0,0.1)"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        }}
      >
        {isLocating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Localizando...</span>
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>CONCURSOS CERCANOS</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default SearchButton;
