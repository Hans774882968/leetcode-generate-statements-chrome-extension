import { defineConfig } from 'vite'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import react from '@vitejs/plugin-react'
import transformManifestPlugin from './transformManifestPlugin'

const destName = 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    transformManifestPlugin(),
    copy({
      targets: [
        { src: 'src/images', dest: destName },
        { src: 'src/contentScript/contentScript.js', dest: destName },
      ],
      hook: 'writeBundle',
    }),
  ],
  build: {
    rollupOptions: {
      input: ['popup.html', 'src/contentScript/main.ts'],
      output: {
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        entryFileNames: '[name].js',
        dir: destName,
      },
    },
  },
})
