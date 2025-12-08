import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true, type: "module" },
      strategies: "injectManifest",
      injectManifest: {
        injectionPoint: undefined
      },
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.js",
      manifest: {
        name: "스니피",
        short_name: "스니피",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        lang: "ko",
        icons: [
          {
            src: "/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
