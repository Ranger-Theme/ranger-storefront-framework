import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

export default defineConfig((options: Options) => {
  return {
    entry: ['./index.ts'],
    outDir: 'dist',
    clean: true,
    dts: true,
    splitting: false,
    shims: true,
    watch: options.watch,
    sourcemap: !!options.watch,
    minify: !options.watch,
    format: ['esm', 'cjs'],
    external: []
  }
})
