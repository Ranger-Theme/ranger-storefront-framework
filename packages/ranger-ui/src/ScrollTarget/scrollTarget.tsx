import type { FC } from 'react'
import type { LinkProps } from 'react-scroll'
import { Element, Link } from 'react-scroll'

export interface ScrollLinkProps extends Omit<LinkProps, 'ref'> {
  to: string
  children?: React.ReactNode
}

export const ScrollLink: FC<ScrollLinkProps> = ({ to = '', children, ...props }) => {
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
