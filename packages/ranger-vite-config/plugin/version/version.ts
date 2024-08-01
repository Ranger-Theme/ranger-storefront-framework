import fs from 'fs'
import path from 'path'

const writeVersion = (versionFile: string, content: string) => {
  fs.writeFile(versionFile, content, (err: any) => {
    if (err) throw err
  })
}

interface VersionOptions {
  version: string | number
}

export const versionPlugin = (options: VersionOptions) => {
  let config: any

  return {
    name: 'version-update',

    configResolved(resolvedConfig: any) {
      config = resolvedConfig
    },

    buildStart() {
      const file = `${config.publicDir + path.sep}version.json`
      const content = JSON.stringify({ version: options?.version })

      if (fs.existsSync(config?.publicDir)) {
        writeVersion(file, content)
      } else {
        fs.mkdir(config?.publicDir, (err: any) => {
          if (err) throw err
          writeVersion(file, content)
        })
      }
    }
  }
}
