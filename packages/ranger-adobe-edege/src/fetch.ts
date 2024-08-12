import type { RequestInit } from 'node-fetch'
import nodeFetch from 'node-fetch'

type Edege = {
  api: string
  url: string
  init?: RequestInit
  removeHeader?: boolean
  removeFooter?: boolean
  replaceMedia?: boolean
}

export const fetchEdege = async ({
  api,
  url,
  init = {},
  removeHeader = true,
  removeFooter = true,
  replaceMedia = true
}: Edege): Promise<string> => {
  let html: string = ''

  const response = await nodeFetch(api, {
    method: 'GET',
    redirect: 'manual',
    ...init
  })

  html = await response.text()
  if (removeHeader) html = html.replace(/<header><\/header>/g, '')
  if (removeFooter) html = html.replace(/<footer><\/footer>/g, '')
  if (replaceMedia) html = html.replace(/\.\/media_/g, `${url}/media_`)

  return html
}
