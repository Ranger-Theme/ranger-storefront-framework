import { useRef, useState } from 'react'

export const useTimedown = (delay: number = 1000) => {
  const callbackRef = useRef<any>(null)
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<any>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  callbackRef.current = () => {
    if (count > 0) setCount((prev: number) => prev - 1)
  }

  const handleTimedown = (value: number) => {
    if (timer) clearInterval(timer)

    const time: any = setInterval(() => {
      callbackRef.current()
    }, delay)

    setCount(value)
    setDisabled(true)
    setTimer(time)
  }

  if (count === 0) {
    if (timer) clearInterval(timer)
    if (timer) setDisabled(false)
    if (timer) setTimer(null)
  }

  return {
    disabled,
    count,
    handleTimedown
  }
}
