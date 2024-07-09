# @ranger-theme/pwa-config

## 🎉 Introduce

> pwa配置

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/pwa-config)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/pwa-config
# or
$ yarn add --save-dev @ranger-theme/pwa-config
# or
$ pnpm add --save-dev @ranger-theme/pwa-config
```

## 🔨 Usage

```js
const nextConfig = require('@ranger-theme/nextjs-config')
const pwaConfig = require('@ranger-theme/pwa-config')

const pkg = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'
const timestamp = new Date().getTime()

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  pkg,
  dirname: process.cwd(),
  timestamp,
  transpilePackages: [],
  compiler: {
    reactRemoveProperties: isProd,
    removeConsole: false
  },
  plugins: [...pwaConfig({ timestamp })]
})
```

