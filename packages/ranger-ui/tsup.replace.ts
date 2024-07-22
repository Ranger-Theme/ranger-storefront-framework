import fs from 'fs'
import type { Plugin, PluginBuild } from 'esbuild'

interface ReplaceOptions {
  values: Record<string, string>
}

export const replacePlugin = (options: ReplaceOptions): Plugin => {
  const { values } = options
  console.info(values)
  return {
    name: 'tsup-plugin-replace',
    setup(build: PluginBuild) {
      build.onLoad({ filter: /\.ts$/ }, async (args) => {
        // 读取文件内容
        const contents = await fs.promises.readFile(args.path, 'utf8')
        // 替换模板字符串中的换行和空格
        const transformedContents = contents.replace(/`([^`]+)`/g, (match, p1) => {
          // 移除模板字符串中的换行和空格
          const cleanedTemplate = p1.replace(/\s+/g, '')
          return `\`${cleanedTemplate}\``
        })
        // 返回处理后的内容
        return { contents: transformedContents, loader: 'ts' }
      })

      build.onEnd(() => {
        console.info('Custom plugin is running!')
        console.info('Build completed successfully.')
      })
    }
  }
}
