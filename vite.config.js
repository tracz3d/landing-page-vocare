import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true, // escuta em todas as interfaces (necessário para Docker)
    port: 5173,
    watch: {
      usePolling: true, // garante que o Vite detecte mudanças em volumes do Windows
    },
  },
  build: {
    assetsDir: '', // Coloca tudo na raiz para evitar erro de pasta
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  }
})
