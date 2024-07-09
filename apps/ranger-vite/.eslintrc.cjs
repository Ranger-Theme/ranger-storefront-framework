module.exports = {
  root: true,
  extends: [require.resolve('@ranger-theme/eslint-config')],
  rules: {
    'no-shadow': 0,
    'no-template-curly-in-string': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
