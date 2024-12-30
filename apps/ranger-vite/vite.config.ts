import { baseConfig } from '@ranger-theme/vite-config'
import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'

import pkg from './package.json'

const viteConfig: any = ({ mode }: ConfigEnv) => {
  const defaultConfig: any = baseConfig({
    mode,
    pkg,
    https: false,
    entry: '/bootstrap/main.tsx',
    outDir: 'build',
    cdnOptions: {
      enableInDevMode: false,
      modules: ['react', 'react-dom']
    },
    buildOptions: {
      rollupOptions: {
        external: [
          'tinymce/tinymce',
          'tinymce/icons/default',
          'tinymce/themes/silver',
          'tinymce/plugins/*'
        ]
      }
    }
  })

  return defineConfig({
    ...defaultConfig,
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
