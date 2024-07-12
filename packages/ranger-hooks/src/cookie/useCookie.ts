import { setItem, getItem, removeItem } from '@ranger-theme/utils'

interface Cookie {
  setItem: typeof setItem
  getItem: typeof getItem
  removeItem: typeof removeItem
}

export const useCookie = () => {
  const cookie: Cookie = {
    setItem,
    getItem,
    removeItem
  }

  return {
    cookie
  }
}

type UseCookie = typeof useCookie
export type UseCookieReturn = ReturnType<UseCookie>
