import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  shims: true,
  format: ['esm', 'cjs'],
  external: []
})
