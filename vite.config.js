import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base works for GitHub project Pages and local preview
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
