import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite config - using port 8080 because 5173 was conflicting with another project
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
