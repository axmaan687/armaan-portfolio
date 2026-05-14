import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/armaan-portfolio/',  // ← must match your repo name exactly
  plugins: [react()],
  resolve: {
    alias: {
      'node:async_hooks': '/src/empty-async-hooks.js',
    },
  },
})