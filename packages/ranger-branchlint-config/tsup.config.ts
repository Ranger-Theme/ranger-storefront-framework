import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  clean: true,
  dts: false,
  splitting: false,
  sourcemap: false,
  shims: true,
  format: ['cjs'],
  external: []
})
