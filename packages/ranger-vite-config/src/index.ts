import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import type { BuildOptions, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import banner from 'vite-plugin-banner'
import compression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

import type { HttpsOptions, Options } from './plugin'
import {
  autoComplete,
  completePlugin,
  httpProxy,
  importCDNPlugin,
  qiankunTransform,
  reporterPlugin,
  secureHttpsPlugin,
  svgBuilder,
  versionPlugin
} from './plugin'

export type BaseConfigType = {
  entry: string
  mode: string
  https?: boolean
  port?: number
  outDir?: string
  htmlId?: string
  isMicroApp?: boolean
  isSecureHttps?: boolean
  svgDirPath?: string
  pkg?: any
  reactOptions?: any
  buildOptions?: BuildOptions
  proxyOptions?: Parameters<typeof httpProxy>[0]
  httpsOptions?: Partial<HttpsOptions>
  cdnOptions?: Options
}

export const baseConfig = ({
  entry = '/bootstrap/main.tsx',
  mode,
  https = false,
  port = 3000,
  outDir = 'dist',
  htmlId = 'root',
  isMicroApp = false,
  svgDirPath = 'svgs',
  pkg = {},
  reactOptions = {
    jsxImportSource: '@emotion/react',
    plugins: [
      [
        '@swc/plugin-emotion',
        {
          sourceMap: true,
          autoLabel: 'dev-only',
          labelFormat: '[local]'
        }
      ]
    ]
  },
  buildOptions = {},
  proxyOptions = {},
  httpsOptions = {},
  cdnOptions = {
    modules: []
  }
}: BaseConfigType) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'REACT_') }

  const timestamp = new Date().getTime()
  const isProd: boolean = mode === 'production'
  const API: string | undefined = process.env.REACT_APP_API_URL

  const config: UserConfigExport = {
    envPrefix: 'REACT_',
    build: {
      outDir,
      cssMinify: isProd,
      sourcemap: !isProd,
      reportCompressedSize: !isProd,
      ...buildOptions,
      rollupOptions: {
        ...(buildOptions?.rollupOptions ?? {}),
        output: {
          chunkFileNames: `assets/js/[name]-[hash]-${timestamp}.js`,
          entryFileNames: `assets/js/[name]-[hash]-${timestamp}.js`,
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return `assets/images/[name]-[hash]-${timestamp}[extname]`
            }

            if (/\.css$/.test(name ?? '')) {
              return `assets/css/[name]-[hash]-${timestamp}[extname]`
            }

            return `assets/[name]-[hash]-${timestamp}[extname]`
          }
        }
      }
    },
    esbuild: isProd
      ? {
          exclude: ['console.info', 'console.warn', 'console.dir', 'debugger']
        }
      : {},
    server: {
      cors: true,
      host: '127.0.0.1',
      port,
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
      cdnOptions.modules.length > 0 && importCDNPlugin(cdnOptions),
      pkg &&
        banner(
          `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n * version: ${pkg.version}\n * copyright: ${pkg.copyright}\n */`
        ),
      legacy({
        targets: ['defaults', 'not IE 11'],
        polyfills: true,
        renderLegacyChunks: true
      }),
      isProd && versionPlugin({ version: timestamp }),
      ...(isMicroApp ? [] : [react({ ...reactOptions })]),
      !isProd &&
        httpProxy({
          ...proxyOptions,
          '/api/': proxyOptions?.['/api/'] ?? {
            target: API,
            changeOrigin: true,
            secure: false,
            rewrite: (url: string) => url.replace(/^\/api/, '/')
          }
        }),
      https && secureHttpsPlugin(httpsOptions),
      svgBuilder(svgDirPath),
      completePlugin(),
      reporterPlugin(),
      qiankunTransform(isMicroApp),
      process.env.REACT_APP_ENABLE_COMPRESS === '1' &&
        compression({
          verbose: true,
          disable: false,
          deleteOriginFile: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
        }),
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

export { autoComplete }
