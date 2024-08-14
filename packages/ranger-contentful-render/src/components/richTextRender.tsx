import React from 'react'
import type { Options } from '@contentful/rich-text-react-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

export interface RichTextRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  richText: Document
  options?: Options
  tag?: keyof JSX.IntrinsicElements
}

const RichTextRender: React.FC<RichTextRenderProps> = ({
  richText,
  options,
  tag = 'div',
  ...props
}) => {
  const Component: any = tag
  return <Component {...props}>{documentToReactComponents(richText, options)}</Component>
}

export default RichTextRender
