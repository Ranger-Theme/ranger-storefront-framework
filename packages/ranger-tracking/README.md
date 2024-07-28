# @ranger-theme/tracking

<p>
  <a href='https://www.npmjs.com/package/@ranger-theme/tracking'><img src='https://img.shields.io/npm/v/@ranger-theme/tracking.svg' alt='Latest npm version'></a>
</p>

## 🎉 Introduce

> tracking工具

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/tracking)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/tracking
# or
$ yarn add --save-dev @ranger-theme/tracking
# or
$ pnpm add --save-dev @ranger-theme/tracking
```

## 🔨 Usage

```js
import { BaiduAnalytics, GoogleTagManager } from '@ranger-theme/tracking'
```

### Baidu Tracking Router Events
```tsx
import { Router } from 'next/router'
import { useEffect } from 'react'

useEffect(() => {
  const routeChangeComplete = (url) => {
    try {
      window._hmt.push(['_trackPageview', url]);
    } catch (e) {
      console.info(e)
    }
  }

  Router.events.on('routeChangeComplete', routeChangeComplete)

  return () => {
    Router.events.off('routeChangeComplete', routeChangeComplete)
  }
}, [])

```
