/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    clearMocks: true,
    coverage: {
        provider: 'v8',
        reporter: ['cobertura', 'html'],
    },
},
})
