import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

import { replacePlugin } from './tsup.replace'

export default defineConfig((options: Options) => {
  return {
    entry: ['./src/index.ts'],
    outDir: 'dist',
    clean: true,
    dts: true,
    splitting: false,
    shims: true,
    watch: options.watch,
    sourcemap: !!options.watch,
    format: ['esm', 'cjs'],
    external: ['react'],
    minify: 'terser',
    terserOptions: {
      compress: true
    },
    esbuildPlugins: [replacePlugin()]
  }
})
