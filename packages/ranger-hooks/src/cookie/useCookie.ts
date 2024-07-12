import { setItem, getItem, removeItem } from '@ranger-theme/utils'
import type { Options } from '@ranger-theme/utils'

interface Cookie {
  setItem: (name: string, value: string, options?: Options) => void
  getItem: (name: string) => string
  removeItem: (name: string, options?: Options) => void
}

export const useCookie = () => {
  const cookie: Cookie = {
    setItem: (name: string, value: string, options?: Options) => {
      setItem(null, name, value, options)
    },
    getItem: (name: string) => {
      return getItem(null, name)
    },
    removeItem: (name: string, options?: Options) => {
      removeItem(null, name, options)
    }
  }

  return {
    cookie
  }
}
