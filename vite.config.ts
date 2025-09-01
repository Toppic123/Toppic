import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  let tagger: any;
  try {
    // lovable-tagger solo existe en desarrollo del editor
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    tagger = require('lovable-tagger');
  } catch {
    tagger = null;
  }
  if (mode === 'development' && tagger && typeof tagger.componentTagger === 'function') {
    plugins.push(tagger.componentTagger());
  }

  return {
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            supabase: ['@supabase/supabase-js'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['lovable-tagger'],
      include: ['react', 'react-dom', '@supabase/supabase-js'],
    },
  };
});
