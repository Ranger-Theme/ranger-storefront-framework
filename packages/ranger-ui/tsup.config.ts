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
    plugins: [
      replacePlugin({
        values: {
          // 使用正则表达式替换掉模板字符串中的换行符
          '\\n': '',
          // 如果需要移除所有空白符（包括空格），可以使用以下正则表达式
          '\\s+': ''
        }
      })
    ]
  }
})
