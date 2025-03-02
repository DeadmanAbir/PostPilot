import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const BACKEND_URL = env.VITE_BACKEND_URL;

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      // ...,
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
