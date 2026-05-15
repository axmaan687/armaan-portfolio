import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/armaan-portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      'node:async_hooks': '/src/empty-module.ts',
    },
  },
})