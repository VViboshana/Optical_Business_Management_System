import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Backend API server
        changeOrigin: true, // Ensures the origin header is rewritten to the target
        secure: false, // Disable SSL verification if needed
      },
      "/uploads": {
  target: "http://localhost:4000",
  changeOrigin: true,
  secure: false,
}

    },
  },
})
