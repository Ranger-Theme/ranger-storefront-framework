import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { merge } from 'lodash-es'

import { createAdobeLink } from './adobeLink'
import { createLiveSearch } from './liveSearch'
import { typePolicies } from './policies'

declare global {
  interface Window {
    notification: any
  }
}

type ApolloStruct = {
  cookies: any
  reduxState: any
  domain: string
}

let apolloClient: any = null

const createApolloClient = ({ cookies, reduxState, domain }: ApolloStruct) => {
  const isClient = typeof window !== 'undefined'
  const adobeLink = createAdobeLink({ cookies, domain, reduxState })
  const conifg = reduxState?.app?.livesearch ?? {}
  const liveLink = createLiveSearch(conifg)

  return new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'livesearch',
      liveLink,
      adobeLink
    ),
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies
    }).restore({}),
    connectToDevTools: isClient,
    ssrMode: !isClient,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first'
      }
    }
  })
}

export const initApollo = ({ apolloState = {}, cookies = {}, reduxState = {}, domain = '' }) => {
  const _apolloClient =
    apolloClient ??
    createApolloClient({
      cookies,
      reduxState,
      domain
    })

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  if (apolloState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(apolloState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
