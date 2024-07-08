#!/usr/bin/env node
const spawn = require('cross-spawn')
// const fs = require('fs')
const path = require('path')

// Path to the stylelint
const binPath = path.resolve(__dirname)

// // Package name
// const excutePath = path.resolve(process.cwd())

// // check pnpm-lock.yaml exist
// const isUsingPnpm = fs.existsSync(path.join(excutePath, 'pnpm-lock.yaml'))

// // check yarn.lock exist
// const isUsingYarn = fs.existsSync(path.join(excutePath, 'yarn.lock'))

// // Command and arguments
// const origin = isUsingYarn ? 'yarn' : 'npm'
// const command = isUsingPnpm ? 'pnpm' : origin
// console.info(command)
// const args = ['']

// Execute the command
spawn.sync('stylelint --fix')

// if (result.error) {
//   console.error(`Error executing command: ${result.error.message}`)
//   process.exit(1)
// }

// console.info(result.status)
// process.exit(result.status)
// process.exit(1)
