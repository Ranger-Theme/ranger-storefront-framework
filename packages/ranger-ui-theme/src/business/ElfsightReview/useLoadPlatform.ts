import { useEffect } from 'react'

const PLATFORM_URL: string = 'https://static.elfsight.com/platform/platform.js'

export const useLoadPlatform = (modern: boolean) => {
  useEffect(() => {
    const isPlatformLoaded: boolean =
      'eapps' in window || !!document.querySelector(`script[src="${PLATFORM_URL}"]`)

    if (isPlatformLoaded) return

    const platfromScript: HTMLScriptElement = document.createElement('script')
    platfromScript.src = PLATFORM_URL
    platfromScript.dataset.testid = 'platform-script'

    if (modern) platfromScript.dataset.useServiceCore = ''
    document.body.appendChild(platfromScript)
  }, [])
}
