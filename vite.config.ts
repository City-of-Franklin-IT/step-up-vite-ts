import { defineConfig } from 'vite'
import { APP_BASE } from './src/config'
import react from '@vitejs/plugin-react'
import { UserConfig } from 'vitest/config'

/// <reference types="vitest" />
/// <reference types="vite/client" />

const config: UserConfig = {
  plugins: [
    react(),
  ],
  base: APP_BASE,
  resolve: {
    alias: {
    },
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    setupFiles: "./src/test/setup.ts"
  }
}

export default defineConfig(config)