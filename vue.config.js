const SentryCliPlugin = require('@sentry/webpack-plugin');
const packageJson = require('D:/Dev/lab/package.json');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

const FILE_LIST = require('./src/js/genFileListToCopy')

const getOutputDir = function () {
  // Если Undefined - community версия 
  // так как в .env.production нет переменной VUE_APP_EDITION, но она есть в .env.special
  if (process.env.VUE_APP_EDITION === undefined) {
    return `./dist/${packageJson.name} ${packageJson.version} community`
  } else {
    return `./dist/${packageJson.name} ${packageJson.version} special`
  }
}

module.exports = {
  chainWebpack: config => {
    // поддержка yaml и json файлов
    config.module
      .rule('i18n-loader')
      .test(/.\.yaml$/)
      .use('json')
        .loader('json-loader')
      .end()
      .use('yaml')
        .loader('yaml-loader')
      .end();

      // Удаляет комментарии из chunk-vendors.js
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {
          ...args[0].terserOptions.output,
          comments: false
        }
        return args
      })
  },
  configureWebpack: {
    // Если Undefined - community версия 
    // так как в .env.production нет переменной VUE_APP_EDITION, но она есть в .env.special
    plugins: (process.env.VUE_APP_EDITION === undefined && process.env.NODE_ENV !== 'development') ? // Production
      [
        new CopyPlugin({
          patterns: FILE_LIST
        }),
        new SentryCliPlugin({ // Обработчик ошибок
          release: packageJson.version, // извлечение версии игры из переменной
          include: `./dist/${packageJson.name} ${packageJson.version} community/js/`, // Загрузка js файлов на сервер
          filenameTransform: filename => '~/js/' + filename,
          ignoreFile: '.sentrycliignore',
          ignore: ['node_modules', 'webpack.config.js'],
        }),
        // Не включает файлы в сборку, попадаюшие под данное регулярное выражение
        // Таким образом все файлы Special Edtion должны оканчиваться на _special.vue
        new webpack.IgnorePlugin(/.*_special.vue/)
      ]
      : (process.env.VUE_APP_EDITION === 'special') ? // Special
          [
            new CopyPlugin({
              patterns: FILE_LIST
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
            new CopyPlugin({
              patterns: FILE_LIST
            }),
          ]
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  publicPath: './',
  outputDir: getOutputDir(),
  assetsDir: 'assets',        // Каталог для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  filenameHashing: false,
  productionSourceMap: false,
}
