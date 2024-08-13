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

/pages/api/edege/[[...url]].ts
```js
import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const apiProxy: any = createProxyMiddleware({
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/api/edege': '/'
    },
    router: async () => {
      return process.env.NEXT_PUBLIC_EDEGE_URL
    }
  })

  apiProxy(request, response, (result) => {
    if (result instanceof Error) {
      throw result
    }

    throw new Error(`Request '${request.url}' is not proxied! We should never reach here!`)
  })
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  }
}

export default handler
```

```js
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import type { NextPageContext } from 'next/types'

const url: string = 'https://main--aem-block-collection--adobe.hlx.live'
const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Home = ({ html }: { html: string }) => {
  return (
    <div>
      <HeadElement host={host} html={html} url={url}  />
      <ScriptElement html={html} url={url} />
      <div>
        <HtmlELement html={html} url={url} />
      </div>
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  const html = await fetchEdege({
    api: `${process.env.NEXT_PUBLIC_HOST_URL}api/edege/${pathname}`,
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
const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Home = ({ html }: { html: string }) => {
  return (
    <div>
      <EdegeElement host={host} html={html} url={url} />
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  const html = await fetchEdege({
    api: `${process.env.NEXT_PUBLIC_HOST_URL}api/edege/${pathname}`,
    url
  })

  return {
    html
  }
}

export default Home
```

### when next router change page, it will fetch new html from edege server
```js
import { useEffect, useState } from 'react'
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import Router from 'next/router'

const Resolver = ({ edegeURL, html }: { edegeURL: string; html: string }) => {
  const [isRender, setIsRender] = useState<boolean>(true)

  useEffect(() => {
    const handleRouteStart = () => {
      setIsRender(false)
    }

    const handleRouteComplete = () => {
      setIsRender(true)
    }

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

return (
  <>
    <HeadElement host={host} html={html} url={edegeURL} />
    <ScriptElement html={html} url={edegeURL} />
    <div>{isRender && <HtmlELement html={html} url={edegeURL} />}</div>
  </>
)

Resolver.getInitialProps = async ({ asPath }: NextPageContext) => {
  const match: string[] = (asPath || '').split('/').slice(1)
  const pathname: string = match.join('/')
  const url: any = match?.pop()
  const urlKey: string = url.split('.')?.shift() || ''
  const edegeURL: string = process.env.NEXT_PUBLIC_EDEGE_URL
  const extname = path.extname(pathname)

  if (extname) return { edegeURL, html: '', urlKey }

  const html = await fetchEdege({
    api: `${process.env.NEXT_PUBLIC_HOST_URL}api/edege/${pathname}`,
    url: edegeURL
  })

  return {
    edegeURL,
    html,
    urlKey
  }
}

export default Resolver
```
