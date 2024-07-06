import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, },
  server: {
   proxy: {
    '/api': {
      target: 'http://localhost:5555',
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
    },
   },
  }
})
