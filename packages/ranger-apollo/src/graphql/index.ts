import { stripIgnoredCharacters } from 'graphql/utilities/stripIgnoredCharacters'

export const shrinkQuery = (url: string) => {
  const values = new URL(url)

  const query = values.searchParams.get('query')

  if (!query) return url

  const strippedQuery = stripIgnoredCharacters(query)
  values.searchParams.set('query', strippedQuery)
  return values.toString()
}

export const shrinkFetchQuery = (uri: string, options: any) => {
  let url = uri
  if (options.method === 'GET') {
    url = shrinkQuery(uri)
  }
  return fetch(url, options)
}
