import { useEffect, useState } from 'react'
import { fetchEdege } from '@ranger-theme/adobe-edege'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'
import Head from 'next/head'
import type { NextPageContext } from 'next/types'

declare const window: any

// const url: string = 'https://main--storefront--andyyu1980.hlx.page'
const url: string = 'https://main--aem-block-collection--adobe.hlx.live'
const options: HTMLReactParserOptions = {
  replace: (node: any) => {
    if (node.type === 'script') return <></>

    if (node.name === 'link') {
      const rel: string = node?.attribs?.rel ?? ''
      if (['preconnect', 'modulepreload'].includes(rel)) {
        return <></>
      }
    }
  }
}

const scriptOptions: HTMLReactParserOptions = {
  replace: (node: any) => {
    if (node.type === 'script') {
      const elType: string = node?.attribs?.type ?? ''
      if (!['module', 'javascript'].includes(elType)) {
        return <></>
      }
    }
  }
}

const Home = ({ html }: { html: string }) => {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const content = html.match(/<main[^>]*>([\s\S]*?)<\/main>/g)
  const cms = content?.[0] ?? ''
  const headHtml = (head?.[0] ?? '').replace('<head>', '').replace('</head>', '')
  const scriptEles = (head?.[0] ?? '').match(/<script[^>]*>([\s\S]*?)<\/script>/g)
  const [isRender, setIsRender] = useState<boolean>(false)

  useEffect(() => {
    window.edegeURL = url
    setIsRender(true)
  }, [])

  return (
    <div>
      <Head>
        {parse(headHtml, options)}
        {isRender && <>{parse(scriptEles.join(''), scriptOptions)}</>}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: cms }} />
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  console.info('pathname:', pathname)
  const resource = await fetchEdege(url + '/block-collection/video')
  const html = resource
    .replace('<header></header>', '')
    .replace('<footer></footer>', '')
    .replaceAll('./media_', `${url}/media_`)

  return {
    html
  }
}

export default Home
