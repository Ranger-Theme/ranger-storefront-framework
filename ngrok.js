const ngrok = require('ngrok')
const cp = require('child_process')

const bootstrap = async () => {
  const port = 3000
  const url = await ngrok.connect({
    proto: 'http', // http|tcp|tls, defaults to http
    addr: port, // port or network address, defaults to 80
    authtoken: '2ZqIexMonOQDvGAs3e1YgNiKggG_ZYCvseao9nJhWfgus76k' // your authtoken from ngrok.com
  })

  console.info(`🚀 Server ready at: ${url}`)

  switch (process.platform) {
    // macos
    case 'darwin':
      cp.exec(`open ${url}`)
      break
    // windows
    case 'win32':
      cp.exec(`start ${url}`)
      break
    default:
      cp.exec(`open ${url}`)
  }
}

bootstrap()
