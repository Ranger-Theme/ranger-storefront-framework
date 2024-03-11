const ngrok = require('ngrok')

const bootstrap = async () => {
  const url = await ngrok.connect({
    proto: 'http', // http|tcp|tls, defaults to http
    addr: 3000, // port or network address, defaults to 80
    authtoken: '2ZqIexMonOQDvGAs3e1YgNiKggG_ZYCvseao9nJhWfgus76k' // your authtoken from ngrok.com
  })
  console.info(`🚀 Server ready at: ${url}`)
}

bootstrap()
