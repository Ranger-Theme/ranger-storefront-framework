#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// ANSI escape codes for colors
const yellow = '\x1b[33m'
const green = '\x1b[32m'
const magenta = '\x1b[35m'
const reset = '\x1b[0m'

const findSvgFile = (dir) => {
  const exists = fs.existsSync(dir)
  if (!exists) return []
  const svgTitle = /<svg([^>+].*?)>/
  const clearHeightWidth = /(width|height)="([^>+].*?)"/g
  const clearReturn = /(\r)|(\n)/g
  const classReturn = /class/g
  const svgRes = []

  const dirents = fs.readdirSync(dir, {
    withFileTypes: true
  })

  for (const dirent of dirents) {
    const path = dir + dirent.name

    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(`${path}/`))
    } else {
      console.info(`${green}[Svg Builder]: ${reset}${green}scanned the file /${path}${reset}`)
      const svg = fs
        .readFileSync(path)
        .toString()
        .replace(clearReturn, '')
        .replace(classReturn, 'className')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/clip-path/g, 'clipPath=')
        .replace(svgTitle, (_$1, $2) => {
          let width = 0
          let height = 0
          let content = $2.replace(clearHeightWidth, (_s1, s2, s3) => {
            s3 = s3.replace('px', '')

            if (s2 === 'width') {
              width = s3
            } else if (s2 === 'height') {
              height = s3
            }
            return ''
          })

          if ($2.indexOf('viewBox=') < 0) {
            content += `viewBox="0 0 ${width} ${height}"`
          }

          return `<symbol id="icon-${dirent.name.replace('.svg', '')}" ${content}>`
        })
        .replace('</svg>', '</symbol>')

      svgRes.push(svg)
    }
  }

  return svgRes
}

const writeFileSyncRecursive = ({ filename, content = '', url }) => {
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, content)
  console.info(`${green}[Svg Builder]: ${reset}${green}generate file ${url}${reset}`)
}

const svgBuilder = ({
  dir = 'svgs',
  output = 'components',
  componentName = 'SvgComponent',
  extension = 'ts'
}) => {
  const url = /^.*\/$/.test(dir) ? dir : `${dir}/`
  const result = findSvgFile(url)
  const filename = `${componentName.charAt(0).toLowerCase()}${componentName.slice(1)}`

  const component = `const ${componentName} = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ position: 'absolute', width: 0, height: 0 }}>
      ${result.join('')}
    </svg>
  )
}

export default ${componentName}
`
  const exportFile = `export { default } from './${filename}'`
  const relativeDir = `./${output}/${componentName}`
  writeFileSyncRecursive({
    filename: path.resolve(process.cwd(), `${relativeDir}/${filename}.${extension}x`),
    content: component,
    url: `${relativeDir}/${filename}.${extension}x`
  })
  writeFileSyncRecursive({
    filename: path.resolve(process.cwd(), `${relativeDir}/index.ts`),
    content: exportFile,
    url: `${relativeDir}/${filename}.${extension}x`
  })
  console.info(`${green}[Svg Builder]: ${reset}${green}complete svg builder task.${reset}`)
}

const svgbuilder = async () => {
  const dir = path.resolve(process.cwd(), 'next.svg.js')

  if (fs.existsSync(dir)) {
    console.info(
      `${green}[Svg Builder]: ${reset}${magenta}there found a next.svg.config file.${reset}`
    )
    // eslint-disable-next-line import/no-dynamic-require
    const config = await require(dir)
    await svgBuilder(config)
  } else {
    console.info(
      `${green}[Svg Builder]: ${reset}${yellow}there need a next.svg.config file exists.${reset}`
    )
    await svgBuilder()
  }
}

svgbuilder()
