import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { MediaQueryAllQueryable } from 'react-responsive'
import { useMediaQuery } from 'react-responsive'
import { isEmpty } from 'lodash-es'

const LayoutMap = new Map([
  ['default', { minWidth: 768 }],
  ['desktop', { minWidth: 992 }],
  ['mobile', { maxWidth: 767 }],
  ['tablet', { minWidth: 768, maxWidth: 991 }],
  ['custom', {}]
])

export interface MediaLayoutProps {
  children: ReactNode
  type?: string
  params?: Partial<MediaQueryAllQueryable>
}

export const MediaLayout: FC<MediaLayoutProps> = ({ children, type = 'default', params = {} }) => {
  const isPrams = LayoutMap.get(type)
  const [isClient, setIsClient] = useState(false)
  const realParams = isEmpty(isPrams) ? params : isPrams
  const isCondition = useMediaQuery(realParams)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])

  return isClient ? <>{isCondition ? children : null}</> : null
}
