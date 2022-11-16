import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.join(__dirname, '../../node_modules', '/'),
      },
      {
        find: '.prisma/client/index-browser',
        replacement: '../../node_modules/.prisma/client/index-browser.js',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@padding-md': '18px',
          '@border-radius-base': '5px',
        },
      },
    },
  },
})
