import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,         // Force default port
    strictPort: true,   // If 5173 is busy, fail instead of changing to 5174
  }
})
