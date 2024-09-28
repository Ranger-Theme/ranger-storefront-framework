import type { FC } from 'react'
import { Element, Link } from 'react-scroll'
import type { ReactScrollLinkProps } from 'react-scroll/modules/components/Link'

export type ScrollLinkType = ReactScrollLinkProps & Omit<React.HTMLProps<HTMLButtonElement>, 'ref'>

export const ScrollLink: FC<ScrollLinkType> = ({ to = '', children, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

export interface ScrollElementProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  name: string
  children?: React.ReactNode
  id?: string | undefined
}

export const ScrollElement: FC<ScrollElementProps> = ({ name, children, ...props }) => {
  return (
    <Element name={name} {...props}>
      {children}
    </Element>
  )
}
