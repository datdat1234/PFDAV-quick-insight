import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/PFDAV-quick-insight/' : '/', 
  
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0', // Listens on all interfaces
    allowedHosts: ['quickinsight.bkhcm.cloud'] // Prevents "Blocked Host" errors
  }
})