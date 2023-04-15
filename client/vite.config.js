import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: true,
    proxy: {
      '/api': 'http://localhost:8080',
      '/server': 'http://localhost:8080',
    }
  }
})
