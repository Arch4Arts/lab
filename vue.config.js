module.exports = {
  configureWebpack: config => {
    config.output.filename = 'js/[name].js';
  },
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: true
}