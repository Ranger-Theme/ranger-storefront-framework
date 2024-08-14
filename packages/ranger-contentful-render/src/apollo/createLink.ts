import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { shrinkFetchQuery } from '@ranger-theme/apollo'

declare global {
  interface Window {
    notification: any
  }
}

export type ContentfulType = {
  accessToken: string
  api: string
  environment: string
  space: string
}

export const createContentfulLink = ({
  accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
  api = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL as string,
  environment = process.env.CONTENTFUL_ENVIRONMENT as string,
  space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
}: ContentfulType) => {
  const httpLink = new HttpLink({
    uri: `${api}/content/v1/spaces/${space}/environments/${environment}`,
    credentials: 'same-origin',
    fetch: shrinkFetchQuery as any,
    useGETForQueries: true
  })

  const middlewareLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext()
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...context?.headers
      }
    })

    return forward(operation)
  })

  const errorLink = onError(({ graphQLErrors, networkError }: any) => {
    const isServer: boolean = typeof window === 'undefined'

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }: any, index: number) => {
        const msg: string = message.replace('GraphQL error: ', '')
        graphQLErrors[index].message = msg

        if (!isServer) {
          window.notification.warning({
            message: graphQLErrors[index].message
          })
        } else {
          console.error(graphQLErrors[index].message)
        }
      })
    }

    if (networkError) {
      if (!isServer) {
        window.notification.warning({
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
