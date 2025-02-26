import type { CSSProperties, FC, ReactNode } from 'react'
import type { MediaQueryAllQueryable, MediaQueryMatchers } from 'react-responsive'
import ReactResponsive from 'react-responsive'

export interface MediaQueryProps extends MediaQueryAllQueryable {
  children?: ReactNode | ((matches: boolean) => ReactNode)
  query?: string
  style?: CSSProperties
  className?: string
  device?: MediaQueryMatchers
  values?: Partial<MediaQueryMatchers>
  onBeforeChange?: (_matches: boolean) => void
  onChange?: (_matches: boolean) => void
}

export const MediaQuery: FC<MediaQueryProps> = ({
  children,
  className = '',
  query,
  style,
  device,
  values,
  onBeforeChange,
  onChange,
  ...props
}) => {
  return (
    <ReactResponsive
      className={className}
      query={query}
      style={style}
      device={device}
      values={values}
      onBeforeChange={onBeforeChange}
      onChange={onChange}
      {...props}
    >
      {children}
    </ReactResponsive>
  )
}
