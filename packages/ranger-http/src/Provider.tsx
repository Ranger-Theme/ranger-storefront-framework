import { ReactElement, useMemo } from 'react'

import FetchContext from './FetchContext'
import { FetchContextTypes, FetchProviderProps } from './types'
import { useSSR } from './useSSR'

export const Provider = ({
  url,
  options,
  graphql = false,
  children
}: FetchProviderProps): ReactElement => {
  const { isBrowser } = useSSR()

  const defaults = useMemo(
    (): FetchContextTypes => ({
      url: url || (isBrowser ? window.location.origin : ''),
      options: options || {},
      graphql // TODO: this will make it so useFetch(QUERY || MUTATION) will work
    }),
    [options, graphql, isBrowser, url]
  )

  return <FetchContext.Provider value={defaults}>{children}</FetchContext.Provider>
}
