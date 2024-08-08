import type { RequestInit } from 'node-fetch'
import nodeFetch from 'node-fetch'

type Edege = {
  url: string
  init?: RequestInit
  removeHeader?: boolean
  removeFooter?: boolean
}

export const fetchEdege = async ({
  url,
  init = {},
  removeHeader = true,
  removeFooter = true
}: Edege): Promise<string> => {
  const response = await nodeFetch(url, {
    method: 'GET',
    redirect: 'manual',
    ...init
  })

  const text = await response.text()
  let html: string = text

  if (!removeHeader) html.replace('<header></header>', '')
  if (!removeFooter) html.replace('<footer></footer>', '')
  html.replaceAll('./media_', `${url}/media_`)
  return html
}
