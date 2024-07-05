import { match } from 'path-to-regexp'
import chalk from 'chalk'

import { Config } from './get-config'
import { branchProtectedError, branchNamePatternError } from './errors'

export const lintBranchName = (branchName: string, config: Config): boolean => {
  let { pattern } = config
  const { params, prohibited, whiteList = [] } = config

  // Branch name lint whitelist
  if (whiteList.includes(branchName)) return true

  if (prohibited.includes(branchName)) throw branchProtectedError
  if (!pattern) return true

  if (params) {
    Object.keys(params).forEach((key: string) => {
      let values = params[key]

      if (!values) return
      if (typeof values === 'string') values = [values]

      pattern = pattern.replace(`:${key}`, `:${key}(${values.join('|')})`)
    })
  }

  const branch = match(pattern, { decode: decodeURIComponent })(branchName)

  if (!branch) {
    throw branchNamePatternError
  } else {
    console.info(
      `result: the branch ${chalk.green(branchName)} name valid success, welcome lint again!`
    )
  }

  return true
}
