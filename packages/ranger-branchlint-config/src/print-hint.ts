import chalk from 'chalk'

import * as errors from './errors'
import { Config } from './get-config'

const gray = (message: string) => chalk.gray.bold(message)
const white = (message: string) => chalk.white(message)
const green = (message: string) => chalk.greenBright(message)

export const printHint = (error: errors.LintError, config: Config) => {
  const { pattern, params, prohibited } = config
  const paramKeys = Object.keys(params)
  switch (true) {
    case error === errors.branchProtectedError:
      console.info(white('Prohibited branch names:'))
      console.info(green(`  ${prohibited.join(', ')}`))
      break
    case error === errors.branchNamePatternError:
      console.info(gray('Branch name'))
      console.info(white('  pattern:'), green(`${pattern}`))
      if (paramKeys.length) {
        console.info(gray('Name params'))
        paramKeys.forEach((key) => {
          console.info(white(`  ${key}:`), green(`${params[key]?.join(', ')}`))
        })
      }
      break
    default:
      break
  }
}
