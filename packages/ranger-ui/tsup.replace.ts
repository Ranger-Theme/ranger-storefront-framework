import { Plugin } from 'tsup'

interface ReplaceOptions {
  values: Record<string, string>
}

export const replacePlugin = (options: ReplaceOptions): Plugin => {
  const { values } = options
  console.info('options:', values)

  return {
    name: 'tsup-plugin-replace',
    setup(build: any) {
      build.onEnd(() => {
        console.info('Custom plugin is running!')
        console.info('Build completed successfully.')
      })
    }
  }
}
