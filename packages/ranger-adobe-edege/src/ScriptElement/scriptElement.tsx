import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'
import Head from 'next/head'

export interface ScriptElementProps {
  html: string
  url: string
}

declare const window: any

const options: HTMLReactParserOptions = {
  replace: (node: any) => {
    if (node.type === 'script') {
      const elType: string = node?.attribs?.type ?? ''
      if (!['module', 'javascript'].includes(elType)) {
        return <></>
      }
    }
  }
}

const ScriptElement: FC<ScriptElementProps> = ({ html, url }) => {
  const [isRender, setIsRender] = useState<boolean>(false)
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/g)
  const scriptEle = (head?.[0] ?? '').match(/<script[^>]*>([\s\S]*?)<\/script>/g) || []
  const titleEle = title?.[0] ?? ''

  useEffect(() => {
    window.edegeURL = url
    setIsRender(true)
  }, [])

  return <Head>{isRender && <>{parse(`${scriptEle.join('')}${titleEle}`, options)}</>}</Head>
}

export default ScriptElement
