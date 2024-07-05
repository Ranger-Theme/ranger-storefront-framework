#!/usr/bin/env node
const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')

// Path to the @commitlint/cli binary
const binPath = path.resolve(__dirname, 'node_modules', '.bin', 'commitlint')

// Create a temporary commit message file
const commitMsgFilePath = path.resolve(process.cwd(), '.git', 'COMMIT_EDITMSG')
const exsit = fs.existsSync(commitMsgFilePath)
const message = 'chore: correct minor typos in code'

// Command and arguments
const command = process.platform === 'win32' ? 'cmd' : binPath
const format = exsit ? ['--edit'] : ['--edit', message]
const args = process.platform === 'win32' ? ['/c', binPath, ...format] : ['--edit']

// Execute the command
const result = spawn.sync(command, args, { stdio: 'inherit', encoding: 'utf-8', shell: true })

if (result.error) {
  console.error(`Error executing command: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status)
