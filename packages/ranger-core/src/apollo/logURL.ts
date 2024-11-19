import { ApolloLink } from '@apollo/client'
import { shrinkQuery } from '@ranger-theme/apollo'

const green = '\x1b[32m'
const magenta = '\x1b[35m'
const reset = '\x1b[0m'

export const logURLLink = (uri: string) => {
  const terminalLink = new ApolloLink((operation, forward) => {
    const { variables, operationName } = operation
    const query = operation.query.loc?.source.body || ''

    // Manually build the GET URL for logging
    const params = new URLSearchParams({
      query,
      variables: JSON.stringify(variables)
    }).toString()

    // Assuming GET requests, you can log the full URL length before the request is sent
    const fullUrl = shrinkQuery(`${uri}?${params}`)
    console.info(
      `${green}[${operationName}]: ${reset}GraphQL GET URL length: ${
        fullUrl.length > 2000 ? magenta : green
      }${fullUrl.length}${reset}`
    )

    return forward(operation)
  })

  return terminalLink
}
