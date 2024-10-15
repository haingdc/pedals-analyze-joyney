import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let url =  "http://localhost:8000"
const isDev = false

if (!isDev) {
  url = "https://pedals-analyze-server.deno.dev"
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: url,
        changeOrigin: true,
      },
    },
  },
})
