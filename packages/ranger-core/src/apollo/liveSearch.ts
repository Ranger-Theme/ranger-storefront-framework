import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { shrinkFetchQuery } from '@ranger-theme/apollo'

import { logURLLink } from './logURL'

export type LiveSearchType = {
  end_point: string
  magento_environment_id: string
  store_code: string
  store_view_code: string
  website_code: string
  x_api_key: string
  domain: string
}

export const createLiveSearch = (config: LiveSearchType) => {
  let apiURL: string = `${process.env.NEXT_PUBLIC_HOST_URL}`
  const isAdobeDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'adobe'
  const isVercelDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'vercel'

  if (isAdobeDeploy) apiURL = `${config.domain}/`
  if (isVercelDeploy) apiURL = `${config.domain}/`

  const suffix: string = 'api/livesearch'
  const uri: string = `${typeof window === 'undefined' ? `${apiURL}` : `${window.location.origin}/`}${suffix}`
  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin',
    fetch: shrinkFetchQuery as any,
    useGETForQueries: true
  })

  const middlewareLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext()
    operation.setContext({
      headers: {
        'Magento-Environment-Id': config.magento_environment_id,
        'Magento-Store-Code': config.store_code,
        'Magento-Store-View-Code': config.store_view_code,
        'Magento-Website-Code': config.website_code,
        'X-Api-Key': config.x_api_key,
        ...context?.headers
      }
    })

    return forward(operation)
  })

  const errorLink = onError(({ graphQLErrors, networkError }: any) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }: any, index: number) => {
        graphQLErrors[index].message = message.replace('GraphQL error: ', '')

        if (typeof window !== 'undefined') {
          window.notification.warning({
            message: graphQLErrors[index].message
          })
        } else {
          console.error(graphQLErrors[index].message)
        }
      })
    }

    if (networkError) {
      if (typeof window !== 'undefined') {
        window.notification.error({
          message: networkError
        })
      } else {
        console.error(`[Network error]: ${networkError}`)
      }
    }
  })

  const apolloLink = middlewareLink.concat(httpLink)
  const finalLink = errorLink.concat(apolloLink)
  return ApolloLink.from([logURLLink(uri), finalLink])
}
