import { useCallback } from 'react'
import type { DocumentNode, QueryOptions } from '@apollo/client'
import { useApolloClient } from '@apollo/client'

export const useAwaitQuery = (query: DocumentNode) => {
  const apolloClient = useApolloClient()

  return useCallback(
    async (options: Partial<QueryOptions<any, any>>) => {
      const res = await apolloClient.query({
        ...options,
        query
      })

      return res
    },
    [apolloClient, query]
  )
}
