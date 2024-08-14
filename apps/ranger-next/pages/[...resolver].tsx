import { useEffect, useState } from 'react'
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import Router from 'next/router'
import type { NextPageContext } from 'next/types'
import path from 'path'

const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Resolver = ({ edegeURL, html }: { edegeURL: string; html: string }) => {
  const [isRender, setIsRender] = useState<boolean>(true)

  useEffect(() => {
    const handleRouteStart = () => {
      setIsRender(false)
    }

    const handleRouteComplete = () => {
      setIsRender(true)
    }

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  return (
    <>
      <HeadElement host={host} html={html} url={edegeURL} />
      <ScriptElement html={html} url={edegeURL} />
      <div>{isRender && <HtmlELement html={html} url={edegeURL} />}</div>
    </>
  )
}

Resolver.getInitialProps = async ({ asPath }: NextPageContext) => {
  const match: string[] = (asPath || '').split('/').slice(1)
  const pathname: string = match.join('/')
  const url: any = match?.pop()
  const urlKey: string = url.split('.')?.shift() || ''
  const edegeURL: string = process.env.NEXT_PUBLIC_EDEGE_URL
  const extname: string = path.extname(pathname)
  const isServer: boolean = typeof window === 'undefined'
  const apiPath: string = isServer ? process.env.NEXT_PUBLIC_HOST_URL : `${window.location.origin}/`

  if (extname) return { edegeURL, html: '', urlKey }

  const html = await fetchEdege({
    api: `${apiPath}api/edege/${pathname}`,
    url: edegeURL
  })

  return {
    edegeURL,
    html,
    urlKey
  }
}

export default Resolver
