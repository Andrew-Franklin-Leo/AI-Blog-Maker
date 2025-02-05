import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base URL for GitHub Pages
  base: process.env.GITHUB_ACTIONS ? '/li-xia-blog/' : '/',
  build: {
    outDir: 'dist',
    // Generate a 404 page for SPA routing
    rollupOptions: {
      input: {
        main: 'index.html',
        '404': '404.html'
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  }
})
