import { defineConfig } from 'vite'

export default defineConfig({
  base: '/sunset/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        music: './src/pages/music/index.html',
        steam: './src/pages/steam/index.html',
        weather: './src/pages/weather/index.html',
        books: './src/pages/books/index.html'
      }
    }
  },
  server: {
    port: 3000
  }
})