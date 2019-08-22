const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SentryCliPlugin = require('@sentry/webpack-plugin');
var pjson = require('D:/Dev/lab/package.json');

module.exports = {
  configureWebpack: config => {
    config.output.filename = 'js/[name].js';
  },
  configureWebpack: {
    plugins: (process.env.NODE_ENV === 'production') ? 
    [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
    }),
    new SentryCliPlugin({
      release: pjson.version,
      include: 'D:/Dev/lab/dist/js/',
      // filenameTransform: filename => '~/js/' + filename,
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
    }),
    ]
    : []
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
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import 'D:/Dev/lab/src/plugins/chatThemes.scss';`,
  //     },
  //   },
  // },
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: true,
}