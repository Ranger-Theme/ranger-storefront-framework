import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const apiProxy: any = createProxyMiddleware({
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/api/edege': ''
    },
    router: async () => {
      return process.env.NEXT_PUBLIC_EDEGE_URL
    }
  })

  apiProxy(request, response, (result) => {
    if (result instanceof Error) {
      throw result
    }

    throw new Error(`Request '${request.url}' is not proxied! We should never reach here!`)
  })
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  }
}

export default handler
