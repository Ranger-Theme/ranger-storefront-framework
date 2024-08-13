import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'

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

const ScriptElement: React.FC<ScriptElementProps> = ({ html, url }) => {
  const [isRender, setIsRender] = useState<boolean>(false)
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/g)
  const scriptEle = (head?.[0] ?? '').match(/<script[^>]*>([\s\S]*?)<\/script>/g) || []
  const titleEle = title?.[0] ?? ''
  const components = parse(`${scriptEle.join('')}${titleEle}`, options) as any[]

  useEffect(() => {
    window.edegeURL = url
    setIsRender(true)
  }, [])

  return isRender ? (
    <Helmet>
      {components.map((component: any) => {
        if (!React.isValidElement(component)) return null
        if (component?.type === React.Fragment) return null
        return component
      })}
    </Helmet>
  ) : null
}

export default ScriptElement
