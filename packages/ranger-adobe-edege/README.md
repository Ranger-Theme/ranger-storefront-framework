# @ranger-theme/adobe-edege

## 🎉 Introduce

> Adobe Edege Delivery

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/adobe-edege)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/adobe-edege
# or
$ yarn add --save-dev @ranger-theme/adobe-edege
# or
$ pnpm add --save-dev @ranger-theme/adobe-edege
```

## 🔨 Usage

```js
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import type { NextPageContext } from 'next/types'

const url: string = 'https://main--aem-block-collection--adobe.hlx.live'

const Home = ({ html }: { html: string }) => {
  return (
    <div>
      <HeadElement html={html} />
      <ScriptElement html={html} url={url} />
      <div>
        <HtmlELement html={html} url={url} />
      </div>
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  const html = await fetchEdege({
    url
  })

  return {
    html
  }
}

export default Home
```


```js
import { fetchEdege, EdegeElement } from '@ranger-theme/adobe-edege'
import type { NextPageContext } from 'next/types'

const url: string = 'https://main--aem-block-collection--adobe.hlx.live'

const Home = ({ html }: { html: string }) => {
  return (
    <div>
      <EdegeElement html={html} url={url} />
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  const html = await fetchEdege({
    url
  })

  return {
    html
  }
}

export default Home
```
