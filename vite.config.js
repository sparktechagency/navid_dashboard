import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '10.0.60.24',
    port: 5173,
  },
});
