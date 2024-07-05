/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@ranger-theme/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  }
}
