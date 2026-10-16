import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The base path is configurable so the same project works locally ("/")
// and on GitHub Pages ("/<repository-name>/").
// The GitHub Actions workflow sets VITE_BASE automatically from the repo name.
// To build manually for Pages:  VITE_BASE=/your-repo-name/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
});
