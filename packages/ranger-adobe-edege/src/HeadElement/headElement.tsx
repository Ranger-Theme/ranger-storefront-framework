import type { FC } from 'react'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'
import Head from 'next/head'

export interface HeadElementProps {
  host: string
  html: string
  url: string
}

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

const HeadElement: FC<HeadElementProps> = ({ host, html, url }) => {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const headEle = (head?.[0] ?? '').replace(/<head>/, '').replace(/<\/head>/, '')
  const secureHost = host.replace(/http/, 'https')
  const regxp = new RegExp(secureHost, 'g')
  const headHtml = headEle.replace(regxp, url)

  return <Head>{parse(headHtml, options)}</Head>
}

export default HeadElement
