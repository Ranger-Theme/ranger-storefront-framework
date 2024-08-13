import React from 'react'
import { Helmet } from 'react-helmet'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'

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

const HeadElement: React.FC<HeadElementProps> = ({ host, html, url }) => {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/g)
  const headEle = (head?.[0] ?? '').replace(/<head>/, '').replace(/<\/head>/, '')
  const secureHost = host.replace(/http/, 'https')
  const regxp = new RegExp(secureHost, 'g')
  const headHtml = headEle.replace(regxp, url)
  const components = parse(headHtml, options)
  const isArray = Array.isArray(components)

  return isArray ? (
    <Helmet>
      {components.map((component: any) => {
        if (!React.isValidElement(component)) return null
        if (component?.type === React.Fragment) return null
        return component
      })}
    </Helmet>
  ) : (
    <Helmet>{components}</Helmet>
  )
}

export default HeadElement
