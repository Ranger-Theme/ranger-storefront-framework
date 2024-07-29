import { destroyCookie, parseCookies, setCookie } from 'nookies'

export interface Options {
  domain?: string
  encode?: string
  expires?: string
  httpOnly?: boolean
  maxAge?: number
  path?: string
  sameSite?: boolean | string
  secure?: boolean
}

const defaultOptions: Options = {
  maxAge: 60 * 60 * 24 * 1,
  path: '/',
  sameSite: 'lax',
  secure: true
}
export const setItem = (ctx: any = null, name: string, value: string, options?: Options) => {
  const mergeOptions: any = options || defaultOptions
  setCookie(ctx, name, value, mergeOptions)
}

export const getItem = (ctx: any = null, name: string) => {
  const cookies = parseCookies(ctx)
  return cookies[name]
}

export const removeItem = (ctx: any = null, name: string, options?: Options) => {
  const mergeOptions: any = options || defaultOptions
  destroyCookie(ctx, name, mergeOptions)
}

export { destroyCookie, parseCookies }
