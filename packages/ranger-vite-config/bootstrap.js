const fs = require('fs')
const path = require('path')

const sourceDir = './node_modules/rollup-plugin-visualizer/dist/lib'
const targetDir = './lib'

const copy = (sd, td) => {
  const sourceFile = fs.readdirSync(sd, { withFileTypes: true })

  for (const file of sourceFile) {
    const srcFile = path.resolve(sd, file.name)
    const tagFile = path.resolve(td, file.name)

    if (file.isDirectory() && !fs.existsSync(tagFile)) {
      fs.mkdirSync(tagFile, (err) => console.error(err))
      copy(srcFile, tagFile)
    } else if (file.isDirectory() && fs.existsSync(tagFile)) {
      copy(srcFile, tagFile)
    }

    if (!file.isDirectory()) fs.copyFileSync(srcFile, tagFile, fs.constants.COPYFILE_FICLONE)
  }
}

const bootstrap = async () => {
  const startTime = await new Date().getTime()

  if (!fs.existsSync(sourceDir)) {
    throw console.error('no such file or directory')
  } else if (!fs.existsSync(targetDir)) {
    await fs.mkdirSync(targetDir, (err) => console.info(err))
    await copy(sourceDir, targetDir)
  } else {
    await copy(sourceDir, targetDir)
  }

  const endTime = await new Date().getTime()
  console.info('time:', `${((endTime - startTime) / 1000).toFixed(2)}s`)
}

bootstrap()
