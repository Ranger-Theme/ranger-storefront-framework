#!/usr/bin/env node
import { LintError } from './errors'
import { getBranchName } from './get-branch-name'
import { getConfig } from './get-config'
import { lintBranchName } from './lint-branch-name'
import { printError } from './print-error'
import { printHint } from './print-hint'

const RC_FILE_NAME = 'branchnamelint'

const main = async () => {
  const [config, branchName] = await Promise.all([getConfig(RC_FILE_NAME), getBranchName()])

  try {
    lintBranchName(branchName, config)
  } catch (error: unknown) {
    if (!(error instanceof LintError)) throw error

    printError(error.message)
    printHint(error, config)
    process.exit(1)
  }
}

main().catch((error) => {
  printError('[LintBranchName] Unhandled error occurred')
  throw error
})
