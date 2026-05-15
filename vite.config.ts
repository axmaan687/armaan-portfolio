import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/armaan-portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'node:async_hooks': '/src/empty-module.ts',
    },
  },
})