import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // La API solo permite CORS desde http://localhost:3000
    port: 3000,
    strictPort: true,
  },
});
