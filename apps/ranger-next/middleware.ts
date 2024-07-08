import { NextResponse, userAgent } from 'next/server'
import type { NextRequest, NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)

  try {
    const { isBot, device, ua } = userAgent(request)
    const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(ua)
    const deviceType: string = device.type === 'mobile' || device.type === 'tablet' ? 'H5' : 'PC'

    requestHeaders.set('x-is-bot', isBot ? 'BOT' : '')
    requestHeaders.set('x-device-type', deviceType)
    requestHeaders.set('x-is-safari', isSafari ? '1' : '0')
  } catch (error) {
    console.info('Middleware Error: ', error)
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  return response
}
