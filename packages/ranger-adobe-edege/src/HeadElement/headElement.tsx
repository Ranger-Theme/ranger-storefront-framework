import type { FC } from 'react'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'
import Head from 'next/head'

export interface HeadElementProps {
  html: string
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

const HeadElement: FC<HeadElementProps> = ({ html }) => {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const headEle = (head?.[0] ?? '').replace('<head>', '').replace('</head>', '')

  return <Head>{parse(headEle, options)}</Head>
}

export default HeadElement
