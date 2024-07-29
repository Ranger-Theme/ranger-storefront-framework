import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  clean: true,
  dts: true,
  splitting: false,
  shims: true,
  watch: options.watch,
  sourcemap: !!options.watch,
  minify: !options.watch,
  format: ['esm', 'cjs'],
  external: ['react'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`
    }
  }
}))
