import chalk from 'chalk'

export const printError = (message: string) =>
  console.info(chalk.whiteBright.bgRedBright.bold(`\n${message}\n`))
