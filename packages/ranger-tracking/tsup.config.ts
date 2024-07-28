import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

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
    external: ['react'],
    minify: !options.watch,
    outExtension({ format }) {
      return {
        js: `.${format}.js`
      }
    }
  }
})
