import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: true,
    build: {
      chunkSizeWarningLimit: 5000, // Set the warning limit to 1000 KiB
    },
    proxy: {
      '/api': 'http://localhost:8080',
      '/server': 'http://localhost:8080',
    }
  }
})
