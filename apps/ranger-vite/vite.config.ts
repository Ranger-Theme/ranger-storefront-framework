import path from 'node:path'
import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'

import { baseConfig } from '@ranger-theme/vite-config'

import pkg from './package.json'

const viteConfig: any = ({ mode }: ConfigEnv) => {
  const defaultConfig: any = baseConfig({
    mode,
    pkg,
    https: false,
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
    }
  })
}

export default viteConfig
