import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { shrinkFetchQuery } from '@ranger-theme/apollo'
import { parseCookies } from '@ranger-theme/utils'
import { isEmpty } from 'lodash-es'

export type AdobeLinkType = {
  cookies: any
  domain: string
  reduxState: any
}

export const createAdobeLink = (config: AdobeLinkType) => {
  let apiURL: string = `${process.env.NEXT_PUBLIC_HOST_URL}`
  const isAdobeDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'adobe'
  const isVercelDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'vercel'

  if (isAdobeDeploy) apiURL = `${config.domain}/`
  if (isVercelDeploy) apiURL = `${config.domain}/`

  const suffix: string = isAdobeDeploy ? 'graphql' : 'api/graphql'
  const httpLink = new HttpLink({
    uri: `${typeof window === 'undefined' ? `${apiURL}` : `${window.location.origin}/`}${suffix}`,
    credentials: 'same-origin',
    fetch: shrinkFetchQuery as any,
    useGETForQueries: true
  })

  const middlewareLink = new ApolloLink((operation, forward) => {
    const exsistCookies = typeof window === 'undefined' ? config.cookies : parseCookies()
    const storeCode = !isEmpty(config.reduxState) ? config.reduxState.app.storeConfig.code : ''
    const currencyCode = !isEmpty(config.reduxState) ? config.reduxState.app.currency.code : ''

    const context = operation.getContext()
    operation.setContext({
      headers: {
        Store: exsistCookies?.store_code ?? storeCode,
        'Content-Currency': exsistCookies?.currency_code ?? currencyCode,
        'x-platform': 'headless',
        ...context?.headers,
        Authorization: exsistCookies.access_token ? `Bearer ${exsistCookies.access_token}` : null
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
