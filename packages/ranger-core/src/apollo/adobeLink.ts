import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { shrinkFetchQuery } from '@ranger-theme/apollo'
import { events, parseCookies, removeItem } from '@ranger-theme/utils'
import { isEmpty } from 'lodash-es'

import { logURLLink } from './logURL'
import { validApiMessage } from './validApi'

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
  const uri: string = `${typeof window === 'undefined' ? `${apiURL}` : `${window.location.origin}/`}${suffix}`
  const httpLink = new HttpLink({
    uri,
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
        const msg: string = message.replace('GraphQL error: ', '')
        graphQLErrors[index].message = msg

        if (typeof window !== 'undefined') {
          const validFlag: boolean = validApiMessage(msg)

          if (validFlag) {
            removeItem(null, 'access_token')
            removeItem(null, 'cart_id')
            removeItem(null, 'compare_uid')
            events.emit('handleLogout')
          } else {
            window.notification.warning({
              message: graphQLErrors[index].message
            })
          }
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
