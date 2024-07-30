import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

export const isObject = (obj: any): obj is object =>
  Object.prototype.toString.call(obj) === '[object Object]'

const useMounted = () => {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}

export const useRefState = <S>(
  initialState: S | (() => S),
  blockIfUnmounted: boolean = true
): [MutableRefObject<S>, Dispatch<SetStateAction<S>>] => {
  const mounted = useMounted()
  const [reactState, setReactState] = useState(initialState)
  const state = useRef(reactState)

  const setState = useCallback((arg: any) => {
    if (!mounted.current && blockIfUnmounted) return
    state.current = typeof arg === 'function' ? arg(state.current) : arg
    setReactState(state.current)
  }, [])

  return [state, setState]
}
