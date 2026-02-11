import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/routeam-demos/comment-statistics-ui/',
    plugins: [react()],
});
