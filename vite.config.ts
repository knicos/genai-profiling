/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

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
        server: {
            deps: {
                inline: ['@knicos/genai-base'],
            },
        },
    },
    resolve: {
        alias: {
            '@genaipg': path.resolve(__dirname, './src'),
        },
    },
});
