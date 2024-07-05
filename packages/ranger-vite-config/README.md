# @ocloud/vite-config

## 🎉 Introduce

> vite配置项

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/vite-config)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/vite-config
# or
$ yarn add --save-dev @ranger-theme/vite-config
# or
$ pnpm add --save-dev @ranger-theme/vite-config
```

## 🔨 Usage

```ts
// vite.config.ts

import { defineConfig } from 'vite';
import { baseConfig } from '@ocloud/admin-vite-config';
import pkg from './package.json';

export default ({ mode }: ConfigEnv) => {
  const defaultConfig = baseConfig(mode, pkg)
  
  return {
    ...defaultConfig,
  }
}
```
