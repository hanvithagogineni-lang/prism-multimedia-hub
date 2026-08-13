import { defineConfig } from 'vite';

export default defineConfig({
  // Required for https://hanvithagogineni-lang.github.io/prism-multimedia-hub/
  base: '/prism-multimedia-hub/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
