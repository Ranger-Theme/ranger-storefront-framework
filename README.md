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


# How to development localhost to Public IP access

## Ngroks (https://ngrok.com/)
