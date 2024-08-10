import type { FC, ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import type { ErrorBoundaryProps as ReactErrorBoundaryProps } from 'react-error-boundary/dist/declarations/src/types'

export type ErrorBoundaryProps = ReactErrorBoundaryProps & {
  children: ReactNode
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children, ...props }) => {
  return <ReactErrorBoundary {...props}>{children}</ReactErrorBoundary>
}

export default ErrorBoundary
