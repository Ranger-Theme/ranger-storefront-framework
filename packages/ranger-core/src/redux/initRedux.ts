import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

type StoreType = {
  reduxState?: any
  reducer: any
}

const __REACT_REDUX_STORE__: any = '__REACT_REDUX_STORE__'
const isLogger: boolean = process.env.NEXT_PUBLIC_REDUX_LOGGER === 'true'
const isProd: boolean = process.env.NODE_ENV === 'production'

const initializeStore = ({ reduxState, reducer }: StoreType) => {
  const middleware: any = []
  const logger = createLogger({
    collapsed: false
  })

  if (isLogger) middleware.push(logger)

  return configureStore({
    reducer: combineReducers(reducer),
    devTools: !isProd,
    preloadedState: reduxState,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware]
  })
}

export const initRedux = ({ reduxState, reducer }: StoreType) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore({ reduxState, reducer })
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__REACT_REDUX_STORE__]) {
    window[__REACT_REDUX_STORE__] = initializeStore({ reduxState, reducer })
  }

  return window[__REACT_REDUX_STORE__]
}
