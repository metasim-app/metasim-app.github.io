import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// metasim-app.github.io is an organization/user page, so root path is `/`.
// If you fork this to a project page (e.g. <user>.github.io/metasim-app),
// change `base` to '/metasim-app/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5173,
    open: true,
  },
})
