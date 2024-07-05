# @ranger-theme/eslint-config

## 🎉 Introduce

> eslint配置

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/eslint-config)
- [CHANGELOG](CHANGELOG.md)

## ✨ Features

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    camelcase: 0,
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'arrow-body-style': 0,
    'consistent-return': 0,
    'global-require': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'lines-around-directive': ['error', { before: 'always', after: 'never' }],
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': ['error', { allow: ['error', 'debug', 'info', 'warn'] }],
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-restricted-exports': 0,
    'no-return-assign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': ['error', 'WithStatement'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true
        }
      }
    ],
    'react/prop-types': 0,
    'react/function-component-definition': 0,
    'react/no-danger': 0,
    'react/jsx-fragments': 0,
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.ts', '.tsx']
      }
    ],
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
```

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/eslint-config
# or
$ yarn add --save-dev @ranger-theme/eslint-config
# or
$ pnpm add --save-dev @ranger-theme/eslint-config
```

## 🔨 Usage

```ts
module.exports = {
  root: true,
  extends: [require.resolve('@ranger-theme/eslint-config')]
}
```
