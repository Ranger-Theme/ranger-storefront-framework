#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// ANSI escape codes for colors
const yellow = '\x1b[33m'
const green = '\x1b[32m'
const blue = '\x1b[34m'
const reset = '\x1b[0m'

const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

const bootstrap = async () => {
  const srcDir = path.resolve(__dirname, './static')
  const targetDir = path.resolve(process.cwd(), 'public')

  if (fs.existsSync(`${targetDir}/scripts`)) {
    console.info(
      `${green}[Adobe Edege]: ${reset}${yellow}The adobe edege resource already exists.${reset}`
    )
  } else {
    await copyDir(srcDir, targetDir)
    console.info(
      `${green}[Adobe Edege]: ${reset}${blue}The adobe edege resource has been copied to the public directory.${reset}`
    )
  }
}

bootstrap()
