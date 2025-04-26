import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), "");
  // const BACKEND_URL = env.VITE_BACKEND_URL || "http://localhost:9000";

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
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: BACKEND_URL,
    //       changeOrigin: true,
    //       configure: (proxy, _options) => {
    //         proxy.on('proxyReq', (proxyReq, _req, _res) => {
    //           // Prevent caching
    //           proxyReq.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    //           proxyReq.setHeader('Pragma', 'no-cache');
    //           proxyReq.setHeader('Expires', '0');
    //         });
    //       }
    //     },
    //   },
    // },
  };
});
