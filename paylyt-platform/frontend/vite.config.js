import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   esbuild: {
     loader: "jsx",
     include: /src\/.*\.(js|jsx)$/,
   },

  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/jobs': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/payments': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/webhooks': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})