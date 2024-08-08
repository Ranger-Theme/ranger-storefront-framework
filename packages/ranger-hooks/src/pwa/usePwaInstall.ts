import { useCallback, useEffect, useState } from 'react'

export const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

  useEffect(() => {
    const checkInstalledStatus = () => {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true)
      }
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsVisible(false)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // 阻止浏览器自动显示安装提示
      e.preventDefault()
      // 保存事件对象
      setDeferredPrompt(e)
      // 显示自定义安装按钮
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    checkInstalledStatus()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('handleAppInstalled', handleAppInstalled)
    }
  }, [])

  const handleOnClick = useCallback(async () => {
    if (deferredPrompt) {
      // 隐藏安装按钮
      setIsVisible(false)
      // 显示安装提示
      deferredPrompt.prompt()
      // 监控用户对安装提示的响应
      const choiceResult = await deferredPrompt.userChoice

      if (choiceResult.outcome === 'accepted') {
        console.info('User accepted the install prompt')
      } else {
        console.info('User dismissed the install prompt')
      }

      setDeferredPrompt(null)
    }
  }, [deferredPrompt])

  return {
    isVisible,
    isInstalled,
    handleOnClick
  }
}
