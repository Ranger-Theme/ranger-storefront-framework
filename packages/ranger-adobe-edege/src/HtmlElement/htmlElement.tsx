import type { FC } from 'react'
import type { HTMLReactParserOptions } from 'html-react-parser'
import parse from 'html-react-parser'

export interface HtmlELementProps {
  html: string
  url: string
}

const HtmlELement: FC<HtmlELementProps> = ({ html, url }) => {
  const content = html.match(/<main[^>]*>([\s\S]*?)<\/main>/g)
  const htmlEle = content?.[0] ?? ''

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

  return <>{parse(htmlEle, options)}</>
}

export default HtmlELement
