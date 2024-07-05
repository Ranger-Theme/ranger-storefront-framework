# @ranger-theme/commitlint-config

## 🎉 Introduce

> git commit message 规范

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/commitlint-config)
- [CHANGELOG](CHANGELOG.md)

## ✨ Features

```js
module.exports = {
  extends: [require.resolve('@commitlint/config-conventional')],
  rules: {
    'body-max-line-length': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests
        'chore', // Changes to the build process or auxiliary tools and libraries such as documentation generation
        'revert', // revert to a commit
        'build', // pack
      ],
    ],
    'subject-case': [0],
  },
}
```

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/commitlint-config
# or
$ yarn add --save-dev @ranger-theme/commitlint-config
# or
$ pnpm add --save-dev @ranger-theme/commitlint-config
```

## 🔨 Usage

```js
// .commitlintrc.js
const commitlintConfig = require('@ranger-theme/admin-commitlint-config')

module.exports = {
  ...commitlintConfig
}
```
