import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

import { replacePlugin } from './tsup.replace'

export default defineConfig((options: Options) => {
  return {
    entry: ['./src/index.ts'],
    outDir: 'dist',
    clean: true,
    dts: true,
    splitting: true,
    shims: true,
    watch: options.watch,
    sourcemap: !!options.watch,
    format: ['esm', 'cjs'],
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
    minify: 'terser',
    cjsInterop: true,
    terserOptions: {
      compress: true
    },
    esbuildPlugins: [replacePlugin()],
    outExtension({ format }) {
      return {
        js: `.${format}.js`
      }
    }
  }
})
