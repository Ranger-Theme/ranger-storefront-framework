import fs from 'fs'
import chalk from 'chalk'
import type { Plugin, PluginBuild } from 'esbuild'

export const replacePlugin = (): Plugin => {
  return {
    name: 'tsup-plugin-replace',
    setup(build: PluginBuild) {
      build.onLoad({ filter: /\.ts$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, 'utf8')
        // Remove line breaks and spaces from template strings
        const transformedContents = contents.replace(/`([^`]+)`/g, (match, p1) => {
          const cleanedTemplate = p1.replace(/\s{2,}/g, '')
          const formatTemplate = cleanedTemplate.replace(/\r|\n/g, '')
          return `\`${formatTemplate}\``
        })

        return { contents: transformedContents, loader: 'ts' }
      })

      build.onEnd(() => {
        console.info(`${chalk.greenBright('ESBUILD')} Build completed successfully.`)
      })
    }
  }
}
