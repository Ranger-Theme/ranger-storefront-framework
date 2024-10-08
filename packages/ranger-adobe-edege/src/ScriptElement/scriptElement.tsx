import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'

export interface ScriptElementProps {
  html: string
  platform?: 'SSR' | 'CSR' | 'SSG'
  url: string
}

declare global {
  interface Window {
    edegePlatform: string
    edegeURL: string
  }
}

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

const ScriptElement: React.FC<ScriptElementProps> = ({ html, platform = 'SSR', url }) => {
  const [isRender, setIsRender] = useState<boolean>(false)
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/g)
  const scriptEle = (head?.[0] ?? '').match(/<script[^>]*>([\s\S]*?)<\/script>/g) || []
  const titleEle = title?.[0] ?? ''
  const components = parse(`${scriptEle.join('')}${titleEle}`, options) as any[]
  const isArray = Array.isArray(components)

  useEffect(() => {
    window.edegePlatform = platform
    window.edegeURL = url
    setIsRender(true)
  }, [])

  return isRender ? (
    <>
      {isArray ? (
        <Helmet>
          {components.map((component: any) => {
            if (!React.isValidElement(component)) return null
            if (component?.type === React.Fragment) return null
            return component
          })}
        </Helmet>
      ) : (
        <Helmet>{components}</Helmet>
      )}
    </>
  ) : null
}

export default ScriptElement
