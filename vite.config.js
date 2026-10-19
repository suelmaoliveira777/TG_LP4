import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      // Site principal + páginas legais, cada uma com o seu HTML e URL próprio
      input: {
        main: path.resolve(__dirname, 'index.html'),
        privacidade: path.resolve(__dirname, 'politica-de-privacidade/index.html'),
        termos: path.resolve(__dirname, 'termos-e-condicoes/index.html'),
        cookies: path.resolve(__dirname, 'politica-de-cookies/index.html'),
      },
    },
  },
})
