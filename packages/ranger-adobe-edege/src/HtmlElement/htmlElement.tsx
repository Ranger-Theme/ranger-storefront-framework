import React, { useEffect } from 'react'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'

export interface HtmlELementProps {
  html: string
  url: string
  selector?: string
}

declare global {
  interface Window {
    edegeLoadPage: () => void
  }
}

const HtmlELement: React.FC<HtmlELementProps> = ({ html, url, selector = '' }) => {
  const content = html.match(/<main[^>]*>([\s\S]*?)<\/main>/g)
  const htmlDom = content?.[0] ?? ''
  const htmlEle = htmlDom.replace(/<main>/g, '').replace(/<\/main>/g, '')
  const hasHeader = html.indexOf('<header></header>') > -1
  const hasFooter = html.indexOf('<footer></footer>') > -1

  const options: HTMLReactParserOptions = {
    replace: (node: any) => {
      const href: string = node?.attribs?.href ?? ''

      if (node.name === 'a' && !['http', 'https'].includes(href)) {
        if (node?.attribs?.href?.includes('.mp4')) {
          node.attribs.href = `${url}${node.attribs.href}`
        }

        if (node?.attribs?.href?.includes('.json')) {
          node.attribs.href = `${url}${node.attribs.href}`
        }
      }
    }
  }
  const components = parse(htmlEle, options)
  const isArray = Array.isArray(components)

  useEffect(() => {
    if (window.edegeLoadPage) window.edegeLoadPage()
  }, [])

  return (
    <main className={`adobe-edege ${selector}`}>
      {hasHeader && <header className="header"></header>}
      {isArray ? (
        <>
          {components.map((component: any) => {
            if (!React.isValidElement(component)) return null
            if (component?.type === React.Fragment) return null
            return component
          })}
        </>
      ) : (
        <>{components}</>
      )}
      {hasFooter && <footer className="footer"></footer>}
    </main>
  )
}

export default HtmlELement
