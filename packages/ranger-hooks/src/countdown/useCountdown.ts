import { useRef, useState } from 'react'

export const useCountdown = (delay: number = 1000) => {
  const callbackRef = useRef<any>(null)
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<any>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  if (count === 0) {
    if (timer) clearInterval(timer)
    if (timer) setDisabled(false)
    if (timer) setTimer(null)
  }

  callbackRef.current = () => {
    setCount((prev: number) => prev - 1)
  }

  const handleCountdown = (value: number) => {
    const time: any = setInterval(() => {
      callbackRef.current()
    }, delay)

    setCount(value)
    setDisabled(true)
    setTimer(time)
  }

  return {
    disabled,
    count,
    handleCountdown
  }
}
