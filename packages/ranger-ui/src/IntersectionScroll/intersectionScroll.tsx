import type { FC, ReactNode } from 'react'
import type { IntersectionOptions } from 'react-intersection-observer'
import { useInView } from 'react-intersection-observer'

export interface IntersectionScrollProps {
  children?: ReactNode
  tag?: keyof JSX.IntrinsicElements
  options?: IntersectionOptions
}

const IntersectionScroll: FC<IntersectionScrollProps> = ({ children, tag = 'div', options }) => {
  const { ref, inView } = useInView({ triggerOnce: true, ...options })
  const Component: any = tag

  return <Component ref={ref}>{inView && children}</Component>
}

export default IntersectionScroll
