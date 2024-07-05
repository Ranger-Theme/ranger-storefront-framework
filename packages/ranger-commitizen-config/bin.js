#!/usr/bin/env node
const { spawnSync } = require('child_process')
const path = require('path')

// Path to the cz-customizable binary
const binPath = path.resolve(__dirname, 'node_modules', '.bin', 'cz-customizable')

// Command and arguments
const command = process.platform === 'win32' ? 'cmd' : binPath
const args = process.platform === 'win32' ? ['/c', binPath] : []

// Execute the command
const result = spawnSync(command, args, { stdio: 'inherit', encoding: 'utf-8', shell: true })

if (result.error) {
  console.error(`Error executing command: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status)
