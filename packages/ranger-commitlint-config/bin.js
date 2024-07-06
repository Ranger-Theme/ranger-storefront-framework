#!/usr/bin/env node
// const spawn = require('cross-spawn')
const { spawnSync } = require('child_process')
const path = require('path')

// Path to the @commitlint/cli binary
// const binPath = path.resolve(__dirname, 'node_modules', '.bin', 'commitlint')
const binPath = path.resolve(__dirname)

// // Command and arguments
// const command = process.platform === 'win32' ? 'cmd' : binPath
// const args = process.platform === 'win32' ? ['/c', binPath, '--edit'] : ['--edit']

// Execute the command
// const result = spawn.sync(command, args, { stdio: 'inherit', encoding: 'utf-8', shell: true })
const result = spawnSync('pnpm', ['commitlint', '--edit'], {
  cwd: binPath,
  stdio: 'inherit'
})

if (result.error) {
  console.error(`Error executing command: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status)
