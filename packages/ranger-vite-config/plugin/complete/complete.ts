import type { Plugin } from 'vite'

export const completePlugin = (): Plugin => {
  return {
    name: 'vite:complete',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      console.info('Vite build completed successfully...')
    }
  }
}
