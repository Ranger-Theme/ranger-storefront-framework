import type { FC } from 'react'
import { Element, Link } from 'react-scroll'

export interface ScrollLinkProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref'> {
  to: string
  containerId?: string | undefined
  activeClass?: string | undefined
  activeStyle?: React.CSSProperties | undefined
  spy?: boolean | undefined
  hashSpy?: boolean | undefined
  horizontal?: boolean | undefined
  smooth?: boolean | string | undefined
  offset?: number | undefined
  delay?: number | undefined
  isDynamic?: boolean | undefined
  onClick?(): void
  duration?: number | string | ((distance: number) => number) | undefined
  absolute?: boolean | undefined
  onSetActive?(to: string, element: HTMLElement): void
  onSetInactive?(to: string, element: HTMLElement): void
  ignoreCancelEvents?: boolean | undefined
  saveHashHistory?: boolean | undefined
  spyThrottle?: number | undefined
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
