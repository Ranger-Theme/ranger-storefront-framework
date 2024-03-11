import fs from 'fs'
import next from 'next'
import express from 'express'
import { parse } from 'url'
import { createServer, ServerOptions } from 'spdy-fixes'

const hostname = process.env.HOSTNAME || '127.0.0.1'
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const options: ServerOptions = {
  key: fs.readFileSync('keys/ssl-key.pem'),
  cert: fs.readFileSync('keys/ssl-cert.pem'),
  spdy: {
    protocols: ['h2']
  }
}

app.prepare().then(() => {
  const server = express()

  server.all('*', async (req: any, res: any) => {
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  })

  // start the HTTP/2 server with express
  const httpServer: any = createServer(options, server)

  httpServer.listen(port, (error: any) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    return console.warn(
      `> Server listening at https://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})
