import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  outDir: 'dist',
  clean: true,
  dts: true,
  splitting: false,
  sourcemap: false,
  shims: true,
  format: ['esm', 'cjs'],
  external: []
})
