import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import banner from 'vite-plugin-banner'
import { createHtmlPlugin } from 'vite-plugin-html'
import { loadEnv } from 'vite'
import type { UserConfigExport } from 'vite'

import { httpProxy, svgBuilder } from './plugin'

export type BaseConfigType = {
  entry: string
  mode: string
  outDir?: string
  htmlId?: string
  pkg?: any
  reactOptions?: any
}

export const baseConfig = ({
  entry,
  mode,
  outDir = 'dist',
  htmlId = 'root',
  pkg = {},
  reactOptions = {}
}: BaseConfigType) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'REACT_') }

  const isProd: boolean = mode === 'production'
  const API: string | undefined = process.env.REACT_APP_API_URL

  const config: UserConfigExport = {
    envPrefix: 'REACT_',
    build: {
      outDir,
      cssMinify: isProd,
      sourcemap: !isProd,
      reportCompressedSize: !isProd
    },
    esbuild: isProd
      ? {
          exclude: ['console.info', 'console.warn', 'console.dir', 'debugger']
        }
      : {},
    server: {
      cors: true,
      host: '127.0.0.1',
      port: 3000,
      hmr: true
    },
    plugins: [
      createHtmlPlugin({
        minify: false,
        entry,
        inject: {
          data: {
            cdnPath: process.env.REACT_CDN_PATH,
            apiPath: process.env.REACT_APP_API_URL
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: htmlId
              }
            }
          ]
        }
      }),
      pkg &&
        banner(
          `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n * version: ${pkg.version}\n * copyright: ${pkg.copyright}\n */`
        ),
      legacy({
        targets: ['defaults', 'not IE 11'],
        polyfills: true,
        renderLegacyChunks: true
      }),
      react({ ...reactOptions }),
      !isProd &&
        httpProxy({
          '/api/': {
            target: API,
            changeOrigin: true,
            secure: false,
            rewrite: (url: string) => url.replace(/^\/api/, '/api')
          }
        }),
      svgBuilder('svgs/'),
      process.env.REACT_APP_BUNDLE_VISUALIZE === '1' &&
        require('rollup-plugin-visualizer').visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ]
  }

  return config
}
