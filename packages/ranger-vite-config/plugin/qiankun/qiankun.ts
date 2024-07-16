export const qiankunTransform = (isMicroApp: boolean) => {
  return {
    name: 'qiankun-transform',
    transformIndexHtml: (html: string) => {
      return isMicroApp ? html.replace('import.meta.url;', '') : html
    }
  }
}
