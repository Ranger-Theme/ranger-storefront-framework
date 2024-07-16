export const qiankunTransform = (isMicroApp: boolean) => {
  return {
    name: 'qiankun-transform',
    transformIndexHtml: {
      order: 'post',
      handler: (html: string) => {
        return isMicroApp ? html.replace('import.meta.url;', '') : html
      }
    }
  }
}
