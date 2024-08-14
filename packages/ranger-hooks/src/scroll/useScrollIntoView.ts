import React, { useEffect } from 'react'

export type ScrollViewType = {
  ref: React.RefObject<HTMLElement>
  shouldScroll?: boolean
  options?: ScrollIntoViewOptions
}

export const useScrollIntoView = ({
  ref,
  shouldScroll,
  options = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  }
}: ScrollViewType) => {
  useEffect(() => {
    if (ref.current && ref.current instanceof HTMLElement && shouldScroll) {
      ref.current.scrollIntoView(options)
    }
  }, [options, ref, shouldScroll])
}
