import { defineConfig } from 'vite'

export default defineConfig({
  base: '/sunset/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        music: './src/pages/music/index.html',
        books: './src/pages/books/index.html',
        currency: './src/pages/currency/index.html',
      }
    }
  },
  server: {
    port: 3000
  }
})