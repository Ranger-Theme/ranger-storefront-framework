import type { RequestInit } from 'node-fetch'
import nodeFetch from 'node-fetch'

export const fetchEdege = async (url: string, init: RequestInit = {}) => {
  const response = await nodeFetch(url, {
    method: 'GET',
    redirect: 'manual',
    ...init
  })
  const text = await response.text()
  return text
}
