import type { FC, ReactNode, ReactPortal } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: ReactNode
  selector: string
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const portalRef = useRef<HTMLElement | null>(null)
  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    const portalComponent = () => {
      portalRef.current = document.querySelector(selector)
      if (portalRef.current != null) return createPortal(children, portalRef.current)
      return null
    }

    setPortal(portalComponent)
  }, [children, selector])

  return portal
}

export default Portal
