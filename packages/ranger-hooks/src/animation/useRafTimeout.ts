type RafCallback = (now: number) => void

const safeRequestAnimationFrame = (callback: RafCallback) => {
  if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(callback)
}

export const setRafTimeout = (callback: RafCallback, timeout: number = 0) => {
  let currTime = -1

  const shouldUpdate = (now: number) => {
    if (currTime < 0) {
      currTime = now
    }

    if (now - currTime > timeout) {
      callback(now)
      currTime = -1
    } else {
      safeRequestAnimationFrame(shouldUpdate)
    }
  }

  requestAnimationFrame(shouldUpdate)
}
