import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    host: '0.0.0.0',   // Accept connections from any IP (needed for LAN access)
    port: 5173,        // Optional: specify port explicitly
    strictPort: true,  // Optional: prevent Vite from switching ports automatically
  }
})
