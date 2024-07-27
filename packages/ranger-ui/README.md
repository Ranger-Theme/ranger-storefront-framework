# @ranger-theme/ui

<p>
  <a href='https://www.npmjs.com/package/@ranger-theme/ui'><img src='https://img.shields.io/npm/v/@ranger-theme/ui.svg' alt='Latest npm version'></a>
</p>

## 🎉 Introduce

> ui工具

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/ui)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/ui
# or
$ yarn add --save-dev @ranger-theme/ui
# or
$ pnpm add --save-dev @ranger-theme/ui
```

## 🔨 Usage

```js
import { CopyBoard, CountDown, CsvLink, HeadRoom, InfiniteScroll, Player, Portal, PrintScreen } from '@ranger-theme/ui'
```

### nextjs dynimac import
```tsx
import dynamic from 'next/dynamic'

const CsvLink = dynamic(
  import('@ranger-theme/ui').then((module) => module.CsvLink),
  {
    ssr: false
  }
)

const MediaQuery = dynamic(
  import('@ranger-theme/ui').then((module) => module.MediaQuery),
  {
    ssr: false
  }
)
```

