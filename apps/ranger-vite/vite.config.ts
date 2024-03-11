import { defineConfig } from 'vite'
import fs from 'node:fs'
import react from '@vitejs/plugin-react-swc'

import { httpProxy } from './plugin/proxy'

const enbaleProxy = process.env.REACT_APP_API_URL !== undefined

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    port: 3000,
    host: 'localhost',
    hmr: true,
    https: {
      // SSL certificate config
      key: fs.readFileSync('keys/ssl-key.pem'),
      cert: fs.readFileSync('keys/ssl-cert.pem')
    }
  },
  plugins: [
    react(),
    enbaleProxy &&
      httpProxy({
        '/api': {
          target: process.env.REACT_APP_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (url: string) => url.replace(/^\/api/, '')
        }
      })
  ]
})
