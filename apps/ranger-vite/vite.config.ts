import { baseConfig } from '@ranger-theme/vite-config'
import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'

import pkg from './package.json'

const viteConfig: any = ({ mode }: ConfigEnv) => {
  const defaultConfig: any = baseConfig({
    mode,
    pkg,
    https: true,
    entry: path.resolve(__dirname, 'bootstrap/main.tsx'),
    outDir: 'build'
  })

  return defineConfig({
    ...defaultConfig,
    // SSL certificate config
    // https: {
    //   key: fs.readFileSync('keys/ssl-key.pem'),
    //   cert: fs.readFileSync('keys/ssl-cert.pem')
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '~': path.resolve(__dirname, './')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 3000
    }
  })
}

export default viteConfig
