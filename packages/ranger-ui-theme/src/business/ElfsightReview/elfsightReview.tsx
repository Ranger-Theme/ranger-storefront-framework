import { memo } from 'react'
import type { HTMLAttributes } from 'react'

import { useLoadPlatform } from './useLoadPlatform'

export type NamedLazyMode = 'default' | 'first-activity' | 'in-viewport' | 'disabled'

export interface BaseElfsightWidgetProps extends HTMLAttributes<HTMLDivElement> {
  lazy?: boolean | NamedLazyMode
  modern?: boolean
}

export interface ElfsightWidgetProps extends BaseElfsightWidgetProps {
  widgetId: string
}

const ElfsightWidget = memo(
  ({ widgetId, lazy, modern = false, className, ...forwardedProps }: ElfsightWidgetProps) => {
    useLoadPlatform(modern)

    let effectiveClassName = `elfsight-app-${widgetId}`
    if (className) {
      effectiveClassName += ` ${className}`
    }

    let effectiveLazy: string | undefined
    if (typeof lazy === 'boolean') {
      effectiveLazy = lazy ? 'default' : undefined
    } else {
      effectiveLazy = lazy
    }

    return (
      <div
        className={effectiveClassName}
        data-elfsight-app-lazy={effectiveLazy}
        {...forwardedProps}
      />
    )
  }
)

export default ElfsightWidget
