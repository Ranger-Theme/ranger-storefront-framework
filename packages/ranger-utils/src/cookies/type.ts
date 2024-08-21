import type { IncomingMessage, ServerResponse } from 'http'

interface ParsedUrlQuery extends NodeJS.Dict<string | string[]> {}

type Send<T> = (body: T) => void

export interface NextPageContext {
  err?:
    | (Error & {
        statusCode?: number
      })
    | null
  req?: IncomingMessage
  res?: ServerResponse
  pathname: string
  query: ParsedUrlQuery
  asPath?: string
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export interface NextApiRequest extends IncomingMessage {
  query: Partial<{
    [key: string]: string | string[]
  }>
  cookies: Partial<{
    [key: string]: string
  }>
  body: any
  draftMode?: boolean
  preview?: boolean
}

export type NextApiResponse<Data = any> = ServerResponse & {
  send: Send<Data>
  json: Send<Data>
  status: (statusCode: number) => NextApiResponse<Data>
  redirect(url: string): NextApiResponse<Data>
  redirect(status: number, url: string): NextApiResponse<Data>
  setDraftMode: (options: { enable: boolean }) => NextApiResponse<Data>
  setPreviewData: (
    data: object | string,
    options?: {
      maxAge?: number
      path?: string
    }
  ) => NextApiResponse<Data>
  clearPreviewData: (options?: { path?: string }) => NextApiResponse<Data>
  revalidate: (
    urlPath: string,
    opts?: {
      unstable_onlyGenerated?: boolean
    }
  ) => Promise<void>
}
