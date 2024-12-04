import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, 'src'), // Absolute path for source directory
    base: '/static/js/', // Base path for static assets
    plugins: [react()],
    build: {
        outDir: path.resolve(__dirname, 'build'), // Absolute path for output directory
        emptyOutDir: true, // Clean the output directory
        manifest: true, // Generate manifest.json
        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.jsx'), // Absolute path for entry point
        },
    },
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite'), // Cache directory
});



