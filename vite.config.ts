/// <reference lib="deno.ns" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from "@std/path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": join(Deno.cwd(), "src"),
      // "@/ui/": "./src/components/ui/",
      "@components": join(Deno.cwd(), "src/components"),
    },
  }
})
