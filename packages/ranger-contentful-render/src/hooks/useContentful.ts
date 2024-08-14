import type { CreateClientParams } from 'contentful'
import { createClient } from 'contentful'

export const useContentful = (options: CreateClientParams) => {
  const params: CreateClientParams = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string
  }
  const client = createClient({
    ...params,
    ...options
  })

  return {
    client
  }
}
