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
  //     less: {
  //       // modifyVars: {
  //       //   'primary-color': '#b30000',
  //       //   'link-color': '#ffffff',
  //       //   'layout-body-background': '#292929',
  //       //   'background-color-base': '#292929',
  //       //   'body-background': '#404041',
  //       //   'layout-sider-background': '#171F22',
  //       //   'component-background': '#171F22',
  //       //   'layout-header-background': '#171F22',
  //       //   'menu-dark-submenu-bg': '#171F22',
  //       //   'input-bg': '#313133',
  //       //   'btn-default-bg': '#262626',
  //       //   'border-color-base': 'rgba(255, 255, 255, 0.25)',
  //       //   'border-color-split': '#363636',
  //       //   'heading-color': '#E3E3E3',
  //       //   'text-color': '#E3E3E3',
  //       //   'text-color-secondary': 'fade(#fff, 65%)',
  //       //   'table-selected-row-bg': '#3a3a3a',
  //       //   'table-expanded-row-bg': '#3b3b3b',
  //       //   'table-header-bg': '#3a3a3b',
  //       //   'table-row-hover-bg': '#3a3a3b',
  //       //   'layout-trigger-color': 'fade(#fff, 80%)',
  //       //   'layout-trigger-background': '#313232',
  //       //   'alert-message-color': 'fade(#000, 67%)',
  //       //   'item-hover-bg': `fade(#1890ff, 20%)`,
  //       //   'item-active-bg': `fade(#1890ff, 40%)`,
  //       //   'disabled-color': 'rgba(255, 255, 255, 0.25)',
  //       //   'tag-default-bg': '#262628',
  //       //   'popover-bg': '#262629',
  //       //   'wait-icon-color': 'fade(#fff, 64%)',
  //       //   'background-color-light': `fade(#1890ff, 40%)`,
  //       //   'collapse-header-bg': '#262629',
  //       //   'info-color': '#313133',
  //       //   'primary-color': '#0A53B0',
  //       //   'highlight-color': '#cf1322',
  //       //   'warning-color': '#874d00',
  //       // },
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: true,
}