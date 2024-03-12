# How to development localhost http to https

## SSL Certificate

### 安装本地SSL证书, mkcert是其中一种

Linux
```bash
choco install mkcert
```

Mac OS
```bash
brew install mkcert
```

npm
```bash
npm install mkcert
```

### 本地信任localhost生成证书信息
在当前目录下生成证书，比如新建一个keys文件夹，然后生成证书
```bash
mkcert -install
mkcert -key-file key.pem -cert-file cert.pem localhost
```

### Nextjs https localhost
nextjs最新版本, 常见可以通过单独的一个node server启动https服务, 然后通过加载nextjs的内部服务, 达到本地开发环境的https服务. 
- important 这里会有一个问题, 如果只是简单的https方式，会与nextjs内部服务的协议冲突, 最后浏览器控制台看到的还是http1.1协议. 所以这里案例采用了第三方包spdy-fixes, 手动指定协议为h2的方式访问资源

以下以express举例说明:
```ts
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
```

- 安装依赖express开启node服务
- 安装ts-node, 配置tsconfig.server.json打包server.ts
- 安装nodemon, 配置其配置文件nodemon.json, 用于监听server.ts文件变化, 自动重启服务和nextjs的热更新
```json
{
  "watch": ["server.ts"],
  "env": {
    "NODE_ENV": "development"
  },
  "exec": "ts-node --project tsconfig.server.json server.ts",
  "ext": "js ts"
}
```
- 配置package.json的scripts
```json
"scripts": {
  "ssl:dev": "nodemon",
  "ssl:build": "next build && tsc --project tsconfig.server.json",
  "ssl:start": "cross-env NODE_ENV=production node dist/server.js"
}
```


### Vite https localhost
vite框架支持本地https, 可以配置vite.config.ts文件, 通过https方式启动服务

以下以vite.config.ts举例说明:
```ts
import { defineConfig } from 'vite'
import fs from 'node:fs'
import react from '@vitejs/plugin-react-swc'

import { httpProxy } from './plugin/proxy'

const enbaleProxy = process.env.REACT_APP_API_URL !== undefined

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    port: 3000,
    host: 'localhost',
    hmr: true,
    https: {
      // SSL certificate config
      key: fs.readFileSync('keys/ssl-key.pem'),
      cert: fs.readFileSync('keys/ssl-cert.pem')
    }
  },
  plugins: [
    react(),
    enbaleProxy &&
      httpProxy({
        '/api': {
          target: process.env.REACT_APP_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (url: string) => url.replace(/^\/api/, '')
        }
      })
  ]
})
```

- 有些类似的第三方包@vitejs/plugin-basic-ssl, 可以实现自动的https服务
https://www.npmjs.com/package/node-forge


# How to development localhost to Public IP access

## Ngroks (https://ngrok.com/)
ngrok 是一个免费的代理服务, 用于将本地服务映射到公网, 通过ngrok可以将本地服务映射到公网, 然后通过ngrok提供的url访问到本地服务
https://dashboard.ngrok.com/get-started/setup/nodejs

以下以nodejs举例说明:
```js
const ngrok = require('ngrok')

const bootstrap = async () => {
  const url = await ngrok.connect({
    proto: 'http', // http|tcp|tls, defaults to http
    addr: 8000, // port or network address, defaults to 80
    authtoken: '2ZqIexMonOQDvGAs3e1YgNiKggG_ZYCvseao9nJhWfgus76k' // your authtoken from ngrok.com
  })
  console.info(`🚀 Server ready at: ${url}`)
}

bootstrap()
```

- 安装ngrok
```bash
pnpm add ngrok -w
```

- 创建ngrok.js, 用于代理本地http服务, 需要去官网单独申请一个账户, 配置authtoken

- 配置package.json的scripts
```json
{
  "scripts": {
    "ngrok": "node ./ngrok.js"
  }
}
```

- 启动ngrok
```
pnpm run ngrok
```
