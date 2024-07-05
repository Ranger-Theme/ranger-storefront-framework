# @ranger-theme/prettier-config

## 🎉 Introduce

> prettier配置

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/prettier-config)
- [CHANGELOG](CHANGELOG.md)

## ✨ Features

```js
module.exports = {
  printWidth: 100, // 单行长度
  tabWidth: 2, // 缩进长度
  useTabs: false, // 使用空格代替tab缩进
  semi: false, // 句末使用分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 仅在必需时为对象的key添加引号
  jsxSingleQuote: false, // jsx中使用单引号
  trailingComma: 'none', // 多行时尽可能打印尾随逗号
  bracketSpacing: true, // 在对象前后添加空格
  jsxBracketSameLine: true, // 多属性html标签的‘>’折行放置
  arrowParens: 'always', // 单参数箭头函数参数周围使用圆括号
  requirePragma: false, // 无需顶部注释即可格式化
  insertPragma: false, // 在已被preitter格式化的文件顶部加上标注
  htmlWhitespaceSensitivity: 'ignore', // 对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, // 不对vue中的script及style标签缩进
  endOfLine: 'lf', // 结束行形式
  embeddedLanguageFormatting: 'auto' // 对引用代码进行格式化
}
```

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/prettier-config
# or
$ yarn add --save-dev @ranger-theme/prettier-config
# or
$ pnpm add --save-dev @ranger-theme/prettier-config
```

## 🔨 Usage

```ts
const prettierConfig = require('@ranger-theme/prettier-config')

module.exports = {
  ...prettierConfig
}
```
