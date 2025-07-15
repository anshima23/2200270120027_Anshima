// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@logger': path.resolve(__dirname, '../logger'),
    },
  },
  server: {
    port: 3000,         // ✅ Set desired port here
    fs: {
      allow: ['..'],    // ✅ Allow reading from parent directories (like logger)
    },
  },
});
