#!/usr/bin/env node
const spawn = require('cross-spawn')
const path = require('path')

// Path to the @commitlint/cli
const binPath = path.resolve(__dirname)

// Command and arguments
const command = 'pnpm'
const args = ['commitlint', '--edit']

// Execute the command
const result = spawn.sync(command, args, {
  cwd: binPath,
  encoding: 'utf-8',
  stdio: 'inherit',
  shell: true
})

if (result.error) {
  console.error(`Error executing command: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status)
