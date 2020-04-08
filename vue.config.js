const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SentryCliPlugin = require('@sentry/webpack-plugin');
var packageJson = require('D:/Dev/lab/package.json');

module.exports = {
  configureWebpack: config => {
    config.output.filename = 'js/[name].js';
  },
  configureWebpack: {
    plugins: (process.env.NODE_ENV === 'production') ? 
    [
    new BundleAnalyzerPlugin({ // Генерация файла отчёта
        analyzerMode: 'static',
        openAnalyzer: false,
    }),
    new SentryCliPlugin({ // Обработчик ошибок
      release: packageJson.version, // извлечение версии игры из переменной
      include: 'D:/Dev/lab/dist/js/', // Загрузка js файлов на сервер
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
  //       data: `@import 'D:/Dev/lab/src/Styles/chatThemes.scss';`,
  //     },
  //   },
  // },
  publicPath: './',
  outputDir: `./dist/${packageJson.name} ${packageJson.version}`,
  assetsDir: 'assets', // Каталог для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  filenameHashing: false,
  productionSourceMap: true, // чтобы ошибки в консоле указавали точно местоположение в js
}