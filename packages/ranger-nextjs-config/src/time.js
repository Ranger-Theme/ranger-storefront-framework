const chalk = require('chalk')

class BuildTimePlugin {
  constructor(options) {
    this.runtime = options.runtime || 'client'
  }

  apply(compiler) {
    let startTime
    let endTime

    compiler.hooks.compile.tap('BuildTimePlugin', () => {
      startTime = Date.now()
      console.info(
        chalk.yellowBright(
          `[${this.runtime} state]: build started at`,
          new Date(startTime).toLocaleTimeString()
        )
      )
    })

    compiler.hooks.done.tap('BuildTimePlugin', () => {
      endTime = Date.now()
      const buildTime = (endTime - startTime) / 1000
      console.info(
        chalk.cyanBright(
          `[${this.runtime} state]: build finished at`,
          new Date(endTime).toLocaleTimeString()
        )
      )
      console.info(chalk.greenBright(`[${this.runtime} state]: build time ${buildTime} seconds`))
    })
  }
}

module.exports = BuildTimePlugin
