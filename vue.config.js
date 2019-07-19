module.exports = {
  configureWebpack: config => {
    config.output.filename = 'js/[name].js';
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = -1
        return options
      })
  },
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: true
}