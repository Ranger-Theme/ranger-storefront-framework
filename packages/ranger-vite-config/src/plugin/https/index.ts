import { promises as fsp } from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'

const defaultCacheDir: string = 'node_modules/.vite'

export interface HttpsOptions {
  certDir: string
  domains: string[]
  name: string
}

export const secureHttpsPlugin = (options?: Partial<HttpsOptions>): Plugin => {
  return {
    name: 'vite:secure-https',
    async configResolved(config: ResolvedConfig) {
      const certificate = await getCertificate(
        options?.certDir ?? (config.cacheDir ?? defaultCacheDir) + '/keys',
        options?.name,
        options?.domains
      )
      const https = () => ({ cert: certificate, key: certificate })

      if (config.server.https === undefined || !!config.server.https) {
        const httpsOpts: any = config.server.https
        config.server.https = { ...httpsOpts, ...https() }
      }

      if (config.preview.https === undefined || !!config.preview.https) {
        const httpsOpts: any = config.preview.https
        config.preview.https = { ...httpsOpts, ...https() }
      }
    }
  }
}

export const getCertificate = async (cacheDir: string, name?: string, domains?: string[]) => {
  const cachePath: string = path.join(cacheDir, '_cert.pem')

  try {
    const [stat, content] = await Promise.all([
      fsp.stat(cachePath),
      fsp.readFile(cachePath, 'utf8')
    ])

    if (Date.now() - stat.ctime.valueOf() > 30 * 24 * 60 * 60 * 1000) {
      throw new Error('cache is outdated.')
    }

    return content
  } catch {
    const content = (await import('./certificate')).createCertificate(name, domains)
    fsp
      .mkdir(cacheDir, { recursive: true })
      .then(() => fsp.writeFile(cachePath, content))
      .catch(() => {})
    return content
  }
}
