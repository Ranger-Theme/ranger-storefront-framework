import type { FC } from 'react'
import React from 'react'

import { HeadElement } from '../HeadElement'
import { HtmlELement } from '../HtmlElement'
import { ScriptElement } from '../ScriptElement'

export interface EdegeElementProps extends React.DetailsHTMLAttributes<any> {
  host: string
  html: string
  url: string
  selector?: string
  tag?: keyof JSX.IntrinsicElements
}

const EdegeElement: FC<EdegeElementProps> = ({
  host,
  html,
  url,
  selector,
  tag = 'div',
  ...props
}) => {
  const Component = tag

  return (
    <>
      <HeadElement host={host} html={html} url={url} />
      <ScriptElement html={html} url={url} />
      <Component {...props}>
        <HtmlELement html={html} url={url} selector={selector} />
      </Component>
    </>
  )
}

export default EdegeElement
