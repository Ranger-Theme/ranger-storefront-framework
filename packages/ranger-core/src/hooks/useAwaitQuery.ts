import { useCallback } from 'react'
import { ApolloQueryResult, DocumentNode, QueryOptions, useApolloClient } from '@apollo/client'

interface AwaitQueryOptions extends Omit<QueryOptions, 'query'> {}

export const useAwaitQuery = (query: DocumentNode) => {
  const apolloClient = useApolloClient()

  return useCallback(
    async (options?: AwaitQueryOptions) => {
      const res: ApolloQueryResult<any> = await apolloClient.query({
        ...options,
        query
      })

      return res
    },
    [apolloClient, query]
  )
}
