import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { shrinkFetchQuery } from '@ranger-theme/apollo'

export type LiveSearchType = {
  end_point: string
  magento_environment_id: string
  store_code: string
  store_view_code: string
  website_code: string
  x_api_key: string
}

export const createLiveSearch = (config: LiveSearchType) => {
  let apiURL: string = `${process.env.NEXT_PUBLIC_HOST_URL}`
  const isAdobeDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'adobe'
  const isVercelDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'vercel'

  if (isAdobeDeploy) apiURL = `${config.end_point}/`
  if (isVercelDeploy) apiURL = `${config.end_point}/`

  const suffix: string = isAdobeDeploy ? 'api/livesearch' : 'api/livesearch'
  const httpLink = new HttpLink({
    uri: isAdobeDeploy
      ? `${apiURL}${suffix}`
      : `${typeof window === 'undefined' ? `${apiURL}` : `${window.location.origin}/`}${suffix}`,
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
  return errorLink.concat(apolloLink)
}
