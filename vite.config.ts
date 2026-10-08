import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // three + r3f + drei are only pulled in by the lazy 3D chunks.
          if (/[\\/](three|@react-three)[\\/]/.test(id)) return "three";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("prismjs")) return "prism";
          if (/[\\/](react|react-dom|react-router|react-router-dom|@tanstack|@radix-ui)[\\/]/.test(id))
            return "react-vendor";
        },
      },
    },
  },
}));
