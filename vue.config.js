const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SentryCliPlugin = require('@sentry/webpack-plugin');
var packageJson = require('D:/Dev/lab/package.json');
const webpack = require('webpack')

module.exports = {
  configureWebpack: config => {
    config.output.filename = 'js/[name].js';
  },
  configureWebpack: {
    plugins: 
    // Undefined - community версия, т.к в .env.production нет переменной VUE_APP_EDITION, но есть в .env.special
    (process.env.VUE_APP_EDITION === undefined && process.env.NODE_ENV !== 'development') ? // Production
      [
      new BundleAnalyzerPlugin({ // Генерация файла отчёта
          analyzerMode: 'static',
          openAnalyzer: false,
      }),
      new SentryCliPlugin({ // Обработчик ошибок
        release: packageJson.version, // извлечение версии игры из переменной
        include: `./dist/${packageJson.name} ${packageJson.version} community/js/`, // Загрузка js файлов на сервер
        // filenameTransform: filename => '~/js/' + filename,
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
      }),
      // Не включает файлы в сборку, попадаюшие под данное регулярное выражение
      // Таким образом все файлы Special Edtion должны оканчиваться на _special.vue
      new webpack.IgnorePlugin(/.*_special.vue/)
      ]
    : (process.env.VUE_APP_EDITION === 'special') ? // Special
        [
          new BundleAnalyzerPlugin({ // Генерация файла отчёта
              analyzerMode: 'static',
              openAnalyzer: false,
          }),
          new SentryCliPlugin({ // Обработчик ошибок
            release: packageJson.version, // извлечение версии игры из переменной
            include: `./dist/${packageJson.name} ${packageJson.version} special/js/`, // Загрузка js файлов на сервер
            // filenameTransform: filename => '~/js/' + filename,
            ignoreFile: '.sentrycliignore',
            ignore: ['node_modules', 'webpack.config.js'],
          }),
        ]
      : // Development
        [
          // new SentryCliPlugin({ // Обработчик ошибок
          //   release: packageJson.version, // извлечение версии игры из переменной
          //   include: 'D:/Dev/lab/dist/js/', // Загрузка js файлов на сервер
          //   // filenameTransform: filename => '~/js/' + filename,
          //   ignoreFile: '.sentrycliignore',
          //   ignore: ['node_modules', 'webpack.config.js'],
          // }),
        ]
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
  // Undefined - community версия, т.к в .env.production нет переменной VUE_APP_EDITION, но есть в .env.special
  outputDir: (process.env.VUE_APP_EDITION === undefined) ? 
    `./dist/${packageJson.name} ${packageJson.version} community` 
  : 
    `./dist/${packageJson.name} ${packageJson.version} special`,
  assetsDir: 'assets', // Каталог для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  filenameHashing: false,
  productionSourceMap: false, // чтобы ошибки в консоле указавали точно местоположение в js
}