#!/usr/bin/env node
const spawn = require('cross-spawn')
const fs = require('fs')
const path = require('path')

// Path to the @commitlint/cli
const binPath = path.resolve(__dirname)

// Package name
const excutePath = path.resolve(process.cwd())

// check pnpm-lock.yaml exist
const isUsingPnpm = fs.existsSync(path.join(excutePath, 'pnpm-lock.yaml'))

// check yarn.lock exist
const isUsingYarn = fs.existsSync(path.join(excutePath, 'yarn.lock'))

// Command and arguments
const origin = isUsingYarn ? 'yarn' : 'npm'
const command = isUsingPnpm ? 'pnpm' : origin
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
