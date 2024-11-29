/// <reference lib="deno.ns" />
// import { defineConfig } from "vite"
import { defineConfig, type UserConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { join } from "@std/path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as UserConfig["plugins"], // workaround cho lỗi https://github.com/vitest-dev/vitest/issues/4048
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
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
})
