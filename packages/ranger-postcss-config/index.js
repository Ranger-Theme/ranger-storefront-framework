module.exports = ({ px2vwOptions = {}, ...options }) => {
  return {
    ...options,
    plugins: {
      ...(options?.plugins ?? {}),
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 750, // UI设计稿的宽度
        unitPrecision: 4, // 转换后的精度，即小数点位数
        viewportUnit: 'vw',
        propList: ['*', '!border'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        selectorBlackList: ['.ignore', '.hairlines', 'node_modules'], // 指定不转换为视窗单位的类名
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [], // 设置忽略文件，用正则做目录名匹配
        landscape: true, // 是否处理横屏情况,
        ...px2vwOptions
      }
    }
  }
}
