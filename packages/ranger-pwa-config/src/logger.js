// ANSI escape codes for colors
const yellow = '\x1b[33m'
const green = '\x1b[32m'
const red = '\x1b[31m'
const reset = '\x1b[0m'

const logger = {
  error: (message) => {
    console.error(`${red}[PWA]: ${reset}${message}`)
  },
  info: (message) => {
    console.info(`${green}[PWA]: ${reset}${message}`)
  },
  warn: (message) => {
    console.warn(`${yellow}[PWA]: ${reset}${message}`)
  }
}

module.exports = logger
