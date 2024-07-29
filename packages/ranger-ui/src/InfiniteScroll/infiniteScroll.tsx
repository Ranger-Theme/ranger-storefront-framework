import type { FC } from 'react'
import ReactInfiniteScroll from 'react-infinite-scroller'

export interface InfiniteScrollProps extends React.HTMLProps<any> {
  loadMore(page: number): void
  element?: React.ReactNode | string | undefined
  hasMore?: boolean | undefined
  initialLoad?: boolean | undefined
  isReverse?: boolean | undefined
  pageStart?: number | undefined
  threshold?: number | undefined
  useCapture?: boolean | undefined
  useWindow?: boolean | undefined
  loader?: React.ReactElement | undefined
  getScrollParent?(): HTMLElement | null
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  loadMore = () => {},
  element = 'div',
  pageStart = 0,
  threshold = 300,
  hasMore = false,
  initialLoad = true,
  isReverse = false,
  useCapture = false,
  useWindow = true,
  ...props
}) => {
  return (
    <ReactInfiniteScroll
      element={element}
      pageStart={pageStart}
      threshold={threshold}
      hasMore={hasMore}
      initialLoad={initialLoad}
      isReverse={isReverse}
      useCapture={useCapture}
      useWindow={useWindow}
      loadMore={loadMore}
      {...props}
    >
      {children}
    </ReactInfiniteScroll>
  )
}

export default InfiniteScroll
